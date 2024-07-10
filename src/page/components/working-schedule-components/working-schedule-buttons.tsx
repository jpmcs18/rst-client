import {
  faAdd,
  faEdit,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteWorkingSchedule } from '../../../repositories/working-schedule-queries';
import { workingScheduleModalActions } from '../../../state/reducers/working-schedule-modal-reducer';
import { workingScheduleActions } from '../../../state/reducers/working-schedule-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';
import { employeeScheduleModalActions } from '../../../state/reducers/employee-schedule-modal-reducer';

export default function WorkingScheduleButtons() {
  const workingScheduleState = useSelector(
    (state: RootState) => state.workingSchedule
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(workingScheduleActions.setSelected(undefined));
    dispatch(workingScheduleModalActions.setWorkingSchedule());
  }
  function edit() {
    dispatch(
      workingScheduleModalActions.setWorkingSchedule(
        workingScheduleState.selectedWorkingSchedule!
      )
    );
    dispatch(workingScheduleModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!workingScheduleState.selectedWorkingSchedule?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteWorkingSchedule(
          workingScheduleState.selectedWorkingSchedule?.id ?? 0
        )
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected workingSchedule has been deleted',
              });
              dispatch(workingScheduleActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
  function onManageEmployee() {
    dispatch(
      employeeScheduleModalActions.setWorkingSchedule(
        workingScheduleState.selectedWorkingSchedule
      )
    );
    dispatch(employeeScheduleModalActions.setShowModal(true));
  }
  return (
    <div className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.WorkingSchedules,
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
          Pages.WorkingSchedules,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!workingScheduleState.selectedWorkingSchedule}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.WorkingSchedules,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!workingScheduleState.selectedWorkingSchedule}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.WorkingSchedules,
          'Manage Employees',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!workingScheduleState.selectedWorkingSchedule}
            onClick={onManageEmployee}
            title='Manage Employee'>
            <FontAwesomeIcon icon={faUsers} />
            <span className='desktop-features'>Manage Employee</span>
          </button>
        )}
      </div>
      <Pagination
        pages={workingScheduleState.pageCount}
        currentPageNumber={workingScheduleState.currentPage}
        itemCount={workingScheduleState.itemCount}
        onItemCountChange={(itemCount) =>
          dispatch(workingScheduleActions.setItemCount(itemCount))
        }
        goInPage={(page) =>
          dispatch(workingScheduleActions.setCurrentPage(page))
        }></Pagination>
    </div>
  );
}
