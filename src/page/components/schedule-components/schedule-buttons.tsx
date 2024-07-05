import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteSchedule } from '../../../repositories/schedule-queries';
import { scheduleModalActions } from '../../../state/reducers/schedule-modal-reducer';
import { scheduleActions } from '../../../state/reducers/schedule-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function ScheduleButtons() {
  const scheduleState = useSelector((state: RootState) => state.schedule);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(scheduleActions.setSelected(undefined));
    dispatch(scheduleModalActions.setSchedule());
    dispatch(scheduleModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(scheduleModalActions.setSchedule(scheduleState.selectedSchedule!));
    dispatch(scheduleModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(scheduleActions.setCurrentPage(page));
    dispatch(scheduleActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!scheduleState.selectedSchedule?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteSchedule(scheduleState.selectedSchedule?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected schedule has been deleted',
              });
              dispatch(scheduleActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Schedules,
          'Add',
          userProfileState.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='desktop-features'>Add</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Schedules,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!scheduleState.selectedSchedule}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Schedules,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!scheduleState.selectedSchedule}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={scheduleState.pageCount}
        currentPageNumber={scheduleState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
