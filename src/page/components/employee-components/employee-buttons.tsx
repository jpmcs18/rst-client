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
import { deleteEmployee } from '../../../repositories/employee-queries';
import { employeeModalActions } from '../../../state/reducers/employee-modal-reducer';
import { employeeActions } from '../../../state/reducers/employee-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function EmployeeButtons() {
  const employeeState = useSelector((state: RootState) => state.employee);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(employeeActions.setSelected(undefined));
    dispatch(employeeModalActions.setEmployee());
    dispatch(employeeModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(employeeModalActions.setEmployee(employeeState.selectedEmployee!));
    dispatch(employeeModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!employeeState.selectedEmployee?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteEmployee(employeeState.selectedEmployee?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected employee has been deleted',
              });
              dispatch(employeeActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
  async function nextPage(page: number) {
    dispatch(employeeActions.setCurrentPage(page));
    dispatch(employeeActions.setInitiateSearch(true));
  }
  return (
    <section className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
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
          Pages.Employees,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Employees,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!employeeState.selectedEmployee}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={employeeState.pageCount}
        currentPageNumber={employeeState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
