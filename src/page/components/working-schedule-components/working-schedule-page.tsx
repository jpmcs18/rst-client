import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchWorkingSchedule } from '../../../repositories/working-schedule-queries';
import { workingScheduleActions } from '../../../state/reducers/working-schedule-reducer';
import { RootState } from '../../../state/store';
import ManageWorkingSchedule from '../../modals/manage-working-schedule';
import SearchBar from '../searchbar';
import WorkingScheduleButtons from './working-schedule-buttons';
import WorkingScheduleItems from './working-schedule-items';
import ManageEmployeeSchedule from '../../modals/manage-employee-schedule/manage-employee-schedule';

export default function WorkingSchedulePage() {
  const workingScheduleModalState = useSelector(
    (state: RootState) => state.workingScheduleModal
  );
  const employeeScheduleModalState = useSelector(
    (state: RootState) => state.employeeScheduleModal
  );
  const workingScheduleState = useSelector(
    (state: RootState) => state.workingSchedule
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [workingScheduleState.initiateSearch]
  );

  async function searchDes() {
    if (!workingScheduleState.initiateSearch) return;
    dispatch(workingScheduleActions.setInitiateSearch(false));
    setBusy(true);
    await searchWorkingSchedule(
      workingScheduleState.key,
      workingScheduleState.itemCount,
      workingScheduleState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(workingScheduleActions.fill(res.results));
          dispatch(workingScheduleActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(workingScheduleActions.setkey(key));
    dispatch(workingScheduleActions.setCurrentPage(1));
  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.WorkingSchedules}</div>
      </div>
      <div>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={workingScheduleState.key}
        />
      </div>
      <WorkingScheduleButtons />
      <WorkingScheduleItems />
      {workingScheduleModalState.isModalShow && <ManageWorkingSchedule />}
      {employeeScheduleModalState.isModalShow && <ManageEmployeeSchedule />}
    </div>
  );
}
