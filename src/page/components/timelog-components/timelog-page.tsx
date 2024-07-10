import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import TimeLogItems from './timelog-items';
import { searchEmployee } from '../../../repositories/employee-queries';
import SearchBar from '../searchbar';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';
import { getTimeLogs } from '../../../repositories/timelog-queries';
import ManageTimelog from '../../modals/manage-timelog';

export default function TimeLogPage() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const timelogModalState = useSelector(
    (state: RootState) => state.timelogModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchEmp();
    },
    //eslint-disable-next-line
    [timelogState.initiateSearch]
  );
  useEffect(
    () => {
      if (timelogState.refreshTimelogs) {
        dispatch(timelogActions.setRefreshTimelog(false));
        fetchTimelogs();
      }
    },
    //eslint-disable-next-line
    [timelogState.refreshTimelogs]
  );
  async function fetchTimelogs() {
    setBusy(true);
    await getTimeLogs(
      timelogState.selectedEmployee?.id ?? 0,
      timelogState.start,
      timelogState.end
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(timelogActions.setTimeLog(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => {
        setBusy(false);
      });
  }
  async function searchEmp() {
    if (!timelogState.initiateSearch) return;
    setBusy(true);
    dispatch(timelogActions.setInitiateSearch(false));
    await searchEmployee(
      timelogState.key,
      timelogState.itemCount,
      timelogState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(timelogActions.fill(res.results));
          dispatch(timelogActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => {
        setBusy(false);
      });
  }
  async function search(key: string) {
    dispatch(timelogActions.setkey(key));
    dispatch(timelogActions.setCurrentPage(1));
  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.TimeLogs}</div>
      </div>
      <div>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={timelogState.key}
        />
      </div>
      <TimeLogItems />

      {timelogModalState.isModalShow && <ManageTimelog />}
    </div>
  );
}
