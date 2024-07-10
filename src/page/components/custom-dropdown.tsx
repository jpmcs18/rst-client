import {
  faAdd,
  faChevronDown,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Guid } from 'guid-typescript';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomReturn from '../../models/client-model/CustomReturn';
import { dropdownActions } from '../../state/reducers/dropdown-reducer';
import { RootState } from '../../state/store';
import CustomDropdownItems from './custom-dropdown-items';

export interface DropdownItem {
  key: string | undefined;
  value: string | undefined;
}
export default function CustomDropdown({
  title,
  subTitle,
  name,
  id,
  className,
  value,
  itemsList,
  readonly,
  onChange,
  selectorOnly,
  onAdd,
  required,
  removeFiltering,
}: {
  title?: string;
  subTitle?: string;
  name?: string;
  id?: string;
  className?: string;
  value?: any;
  itemsList: DropdownItem[];
  readonly?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  selectorOnly?: boolean | undefined;
  onAdd?: () => void;
  required?: boolean;
  removeFiltering?: boolean;
}) {
  const dropdownState = useSelector((state: RootState) => state.dropdown);
  const [isOpen, setIsOpen] = useState(false);
  const componentId = useRef(Guid.create().toString());
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (dropdownState.openDropdown === componentId.current) {
        setIsOpen(() => true);
      } else {
        setIsOpen(() => false);
      }
    },
    //eslint-disable-next-line
    [dropdownState.openDropdown]
  );

  function openSelection() {
    dispatch(dropdownActions.setOpenDropdown(componentId.current));
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log(event.key);
    if (event.key === 'ArrowUp') {
      const index1 = itemsList.indexOf(
        itemsList.filter((x) => x.key?.toString() === value?.toString())?.[0]
      );
      console.log(index1);
      if (index1 > 0) {
        onChange?.({
          elementName: name ?? 'def',
          value: itemsList[index1 - 1].key ?? '',
        });
      }
    }
    if (event.key === 'ArrowDown') {
      const index2 = itemsList.indexOf(
        itemsList.filter((x) => x.key?.toString() === value?.toString())?.[0]
      );
      if (index2 < itemsList.length - 1) {
        onChange?.({
          elementName: name ?? 'def',
          value: itemsList[index2 + 1].key ?? '',
        });
      }
    }
    if (event.key === 'Enter') {
      dispatch(dropdownActions.setOpenDropdown(undefined));
    }
    if (event.key === 'Tab') {
    } else {
      event.preventDefault();
    }
  }
  return (
    <div className={'custom-input ' + (required && !value && 'required ')}>
      {title && (
        <label className='input-title' htmlFor={name}>
          {title} {required && <span className='required'>REQUIRED</span>}
        </label>
      )}
      {subTitle && (
        <label className='input-subtitle' htmlFor={name}>
          {subTitle}
        </label>
      )}
      <div className='select-container' onClick={() => openSelection()}>
        <div className='select-input-container input-container'>
          <input
            id={componentId.current + '-input'}
            type='text'
            className={'selection-input ' + (selectorOnly ? 'selector' : '')}
            onFocus={() => openSelection()}
            onClick={() => openSelection()}
            readOnly={true}
            onKeyDown={handleKeyDown}
            value={
              itemsList.filter(
                (x) => x.key?.toString() === value?.toString()
              )?.[0]?.value ?? ''
            }
          />
          <div className='icon-container'>
            <FontAwesomeIcon
              onClick={() => openSelection()}
              icon={faChevronDown}
              className='dropdown-icon'
              id={componentId + '-icon'}
            />
            {!selectorOnly && (
              <FontAwesomeIcon
                icon={faClose}
                className='dropdown-icon'
                id={componentId + '-icon-remove'}
                onClick={() =>
                  onChange?.({
                    elementName: name ?? 'def',
                    value: undefined,
                  })
                }
              />
            )}
            {onAdd && (
              <FontAwesomeIcon
                icon={faAdd}
                className='dropdown-icon'
                id={componentId + '-icon-add'}
                onClick={() => onAdd?.()}
              />
            )}
          </div>
        </div>
        {!readonly && isOpen && (
          <CustomDropdownItems
            id={componentId.current}
            itemsList={itemsList}
            onChange={onChange}
            name={name}
            value={value}
            removeFiltering={removeFiltering}
          />
        )}
      </div>
    </div>
  );
}
