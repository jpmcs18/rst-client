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
import { deleteUserRole } from '../../../repositories/user-role-queries';
import { userRoleModalActions } from '../../../state/reducers/user-role-modal-reducer';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function UserRoleButtons() {
  const dispatch = useDispatch();
  const userRoleState = useSelector((state: RootState) => state.userRole);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(userRoleActions.setSelected(undefined));
    dispatch(userRoleModalActions.setUserRole());
    dispatch(userRoleModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(userRoleModalActions.setUserRole(userRoleState.selectedUserRole!));
    dispatch(userRoleModalActions.setShowModal(true));
  }
  async function nextPage(page: number) {
    dispatch(userRoleActions.setCurrentPage(page));
    dispatch(userRoleActions.setInitiateSearch(true));
  }
  async function onDelete() {
    if (!userRoleState.selectedUserRole?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteUserRole(userRoleState.selectedUserRole?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected user role has been deleted',
              });
              dispatch(userRoleActions.setInitiateSearch(true));
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
          Pages.UserRoles,
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
          Pages.UserRoles,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!userRoleState.selectedUserRole}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.UserRoles,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!userRoleState.selectedUserRole}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>
      <Pagination
        pages={userRoleState.pageCount}
        currentPageNumber={userRoleState.currentPage}
        goInPage={nextPage}></Pagination>
    </section>
  );
}
