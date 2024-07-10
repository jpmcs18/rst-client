import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import CustomDropdown from './custom-dropdown';

export default function Pagination({
  pages,
  itemCount,
  currentPageNumber,
  goInPage,
  onItemCountChange,
}: {
  pages: number;
  itemCount: number;
  currentPageNumber: number;
  goInPage: (page: number) => void;
  onItemCountChange: (itemCount: number) => void;
}) {
  const currentPage = useRef<number>(currentPageNumber);
  const pageList = useRef<number[]>([]);
  const itemCounts = [10, 20, 30, 40, 50];
  const [canGoFirst, setGoFirst] = useState<boolean>(false);
  const [canGoBefore, setGoBefore] = useState<boolean>(false);
  const [canGoAfter, setGoAfter] = useState<boolean>(false);
  const [canGoLast, setGoLast] = useState<boolean>(false);

  useEffect(() => {
    currentPage.current = currentPageNumber;
    let pl: number[] = [];
    for (let i = 1; i <= pages; i++) {
      pl.push(i);
    }
    pageList.current = pl;

    setGoAfter(false);
    setGoLast(false);
    setGoFirst(false);
    setGoBefore(false);

    if (pages > 1) {
      if (currentPageNumber !== pages) {
        setGoAfter(true);
        setGoLast(true);
      }
      if (currentPageNumber !== 1) {
        setGoFirst(true);
        setGoBefore(true);
      }
    }

    return () => {
      pl = [];
    };
  }, [pages, currentPageNumber]);

  function goToFirst() {
    if (!canGoFirst) return;

    goInPage(1);

    setGoFirst(false);
    setGoBefore(false);
    setGoAfter(true);
    setGoLast(true);
  }

  function goToBefore() {
    if (!canGoBefore) return;

    currentPage.current = currentPage.current - 1;
    if (currentPage.current === 1) {
      setGoFirst(false);
      setGoBefore(false);
    }

    goInPage(currentPage.current);

    setGoAfter(true);
    setGoLast(true);
  }

  function goToAfter() {
    if (!canGoAfter) return;

    currentPage.current = currentPage.current + 1;
    if (currentPage.current === pages) {
      setGoAfter(false);
      setGoLast(false);
    }

    goInPage(currentPage.current);

    setGoFirst(true);
    setGoBefore(true);
  }

  function goToLast() {
    if (!canGoLast) return;
    currentPage.current = pages;
    setGoAfter(false);
    setGoLast(false);

    setGoFirst(true);
    setGoBefore(true);

    goInPage(pages);
  }

  function goToPage(page: number) {
    currentPage.current = page;
    setGoFirst(true);
    setGoBefore(true);
    setGoAfter(true);
    setGoLast(true);

    if (page === 1) {
      setGoFirst(false);
      setGoBefore(false);
    }

    if (page === pages) {
      setGoAfter(false);
      setGoLast(false);
    }

    goInPage(page);
  }

  return (
    <div className='pagination-container'>
      <CustomDropdown
        removeFiltering
        selectorOnly
        value={itemCount}
        onChange={(ret) => onItemCountChange(+ret.value)}
        title={'Item Count'}
        itemsList={itemCounts.map((item) => {
          return { key: item.toString(), value: item.toString() };
        })}
      />
      <div className='pagination'>
        <FontAwesomeIcon
          icon={faAngleDoubleLeft as IconProp}
          className={!canGoFirst ? 'disabled' : ''}
          onClick={goToFirst}
        />
        <FontAwesomeIcon
          icon={faAngleLeft as IconProp}
          onClick={goToBefore}
          className={!canGoBefore ? 'disabled' : ''}
        />
        <div className='pages-container'>
          <button className='current-page'>{currentPage.current}</button>
          <div className='pages'>
            {pageList.current.map((pl) => (
              <div
                key={pl}
                className={pl === currentPage.current ? 'active' : ''}
                onClick={() => {
                  goToPage(pl);
                }}>
                {pl}
              </div>
            ))}
          </div>
        </div>
        <FontAwesomeIcon
          icon={faAngleRight as IconProp}
          onClick={goToAfter}
          className={!canGoAfter ? 'disabled' : ''}
        />
        <FontAwesomeIcon
          icon={faAngleDoubleRight as IconProp}
          onClick={goToLast}
          className={!canGoLast ? 'disabled' : ''}
        />
      </div>
    </div>
  );
}
