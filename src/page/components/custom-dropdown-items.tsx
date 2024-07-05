import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import CustomReturn from '../../models/client-model/CustomReturn';
import { dropdownActions } from '../../state/reducers/dropdown-reducer';
import { DropdownItem } from './custom-dropdown';

export default function CustomDropdownItems({
  id,
  name,
  value,
  onChange,
  itemsList,
}: {
  id: string;
  name?: string;
  value?: any;
  onChange?: (data: CustomReturn) => void;
  itemsList: DropdownItem[];
}) {
  const [filter, setFilter] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const parentDefault = document
    .getElementById(id + '-input')
    ?.getBoundingClientRect() as DOMRect;
  useEffect(
    () => {
      var timer = setInterval(() => {
        setItemsLocation();
      }, 10);
      return () => {
        clearInterval(timer);
      };
    },
    //eslint-disable-next-line
    []
  );
  useLayoutEffect(
    () => {
      setItemsLocation();
    },
    //eslint-disable-next-line
    []
  );

  function setItemsLocation() {
    const div = divRef.current?.getBoundingClientRect() as DOMRect;
    const screenSize = window.screen.availHeight;
    const parent = document
      .getElementById(id + '-input')
      ?.getBoundingClientRect() as DOMRect;
    if (parentDefault.x !== parent.x || parentDefault.y !== parent.y) {
      dispatch(dropdownActions.setOpenDropdown(undefined));
    }
    if (divRef.current?.style) {
      divRef.current.style.top = `${parent.height + parent.y}px`;
      divRef.current.style.left = `${parent.left + 1}px`;
      divRef.current.style.width = `${parent.width - 2}px`;
      if (div.height + parent.y + parent.height + 100 > screenSize) {
        divRef.current.style.top = `${parent.y - div.height}px`;
      }
    }
  }
  return ReactDOM.createPortal(
    <div className='selection' ref={divRef} id={id}>
      <div>
        <input
          className='search-input'
          type='text'
          value={filter}
          placeholder='Search...'
          autoComplete='off'
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className='selection-list'>
        {itemsList
          .filter((x) => x.value?.toLowerCase()?.includes(filter.toLowerCase()))
          .map((item) => (
            <div
              className={
                'selection-item ' +
                (item.key?.toString() === value?.toString() ? 'selected' : '')
              }
              key={item.key}
              onClick={() => {
                dispatch(dropdownActions.setOpenDropdown(undefined));
                onChange?.({
                  elementName: name ?? 'def',
                  value: item.key,
                });
              }}>
              {item.value}
            </div>
          ))}
      </div>
    </div>,
    document.getElementById('select') as HTMLElement
  );
}
