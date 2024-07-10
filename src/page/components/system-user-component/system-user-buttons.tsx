import {
  faAdd,
  faEdit,
  faRepeat,
  faTrash,
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
import {
  deleteSystemUser,
  resetPassword,
} from '../../../repositories/system-user-queries';
import { systemUserModalActions } from '../../../state/reducers/system-user-modal-reducer';
import { systemUserActions } from '../../../state/reducers/system-user-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function SystemUserButtons() {
  const dispatch = useDispatch();
  const systemUserState = useSelector((state: RootState) => state.systemUser);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setMessage = useSetMessage();
  const setToasterMessage = useSetToasterMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(systemUserActions.setSelected(undefined));
    dispatch(systemUserModalActions.setSystemUser());
    dispatch(systemUserModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(
      systemUserModalActions.setSystemUser(systemUserState.selectedSystemUser!)
    );
    dispatch(systemUserModalActions.setShowModal(true));
  }
  function resetPass() {
    if (!systemUserState.selectedSystemUser?.id) return;

    setMessage({
      message: 'Are you sure you want to reset the password of this user?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await resetPassword(systemUserState.selectedSystemUser?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Password reset successful.',
              });
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
  async function onDelete() {
    if (!systemUserState.selectedSystemUser?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteSystemUser(systemUserState.selectedSystemUser?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected user has been deleted',
              });
              dispatch(systemUserActions.setInitiateSearch(true));
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
    <div className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.SystemUsers,
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
          Pages.SystemUsers,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!systemUserState.selectedSystemUser}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.SystemUsers,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!systemUserState.selectedSystemUser}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.SystemUsers,
          'Reset Password',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!systemUserState.selectedSystemUser}
            onClick={resetPass}
            title='Reset Password'>
            <FontAwesomeIcon icon={faRepeat} />
            <span className='desktop-features'>Reset Password</span>
          </button>
        )}
      </div>

      <Pagination
        pages={systemUserState.pageCount}
        currentPageNumber={systemUserState.pageCount}
        itemCount={systemUserState.itemCount}
        onItemCountChange={(itemCount) =>
          dispatch(systemUserActions.setItemCount(itemCount))
        }
        goInPage={(page) =>
          dispatch(systemUserActions.setCurrentPage(page))
        }></Pagination>
    </div>
  );
}
