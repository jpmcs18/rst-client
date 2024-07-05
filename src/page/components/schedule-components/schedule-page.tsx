import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchSchedule } from '../../../repositories/schedule-queries';
import { scheduleActions } from '../../../state/reducers/schedule-reducer';
import { RootState } from '../../../state/store';
import ManageSchedule from '../../modals/manage-schedule';
import SearchBar from '../searchbar';
import ScheduleButtons from './schedule-buttons';
import ScheduleItems from './schedule-items';

export default function SchedulePage() {
  const scheduleModalState = useSelector(
    (state: RootState) => state.scheduleModal
  );
  const scheduleState = useSelector((state: RootState) => state.schedule);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [scheduleState.initiateSearch]
  );

  async function searchDes() {
    if (!scheduleState.initiateSearch) return;
    dispatch(scheduleActions.setInitiateSearch(false));
    setBusy(true);
    await searchSchedule(scheduleState.key, scheduleState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(scheduleActions.fill(res.results));
          dispatch(scheduleActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(scheduleActions.setkey(key));
    dispatch(scheduleActions.setCurrentPage(1));
    dispatch(scheduleActions.setInitiateSearch(true));
  }
  return (
    <div className='main-container'>
      <section className='title-container'>
        <div className='title'>{Pages.Schedules}</div>
      </section>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={scheduleState.key}
        />
      </section>
      <ScheduleButtons />
      <ScheduleItems />
      {scheduleModalState.isModalShow && <ManageSchedule />}
    </div>
  );
}
