import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { getModules } from '../../../repositories/module-queries';
import {
  insertUserRole,
  updateUserRole,
} from '../../../repositories/user-role-queries';
import { userRoleModalActions } from '../../../state/reducers/user-role-modal-reducer';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';
import CustomTextBox from '../../components/custom-textbox';
import ManageUserRoleAccess from './manage-user-role-access';
import Modal from '../modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default function ManageUserRole() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const userRoleModalState = useSelector(
    (state: RootState) => state.userRoleModal
  );
  useEffect(
    () => {
      getMod();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(userRoleModalActions.setShowModal(false));
    if (hasChange) dispatch(userRoleActions.setInitiateSearch(true));
  }
  async function getMod() {
    setBusy(true);
    await getModules()
      .then((res) => {
        if (res) {
          dispatch(userRoleModalActions.setModules(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (userRoleModalState.userRole.id > 0) {
      await updateUserRole(
        userRoleModalState.userRole.id,
        userRoleModalState.userRole.description ?? '',
        userRoleModalState.modules
          .filter((module) => module.isCheck)
          .flatMap(
            (modules) =>
              modules.moduleRights
                ?.filter((moduleRight) => moduleRight.isCheck)
                .map((moduleRight) => moduleRight.id) ?? []
          )
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'User role has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertUserRole(
        userRoleModalState.userRole.description ?? '',
        userRoleModalState.modules
          .filter((module) => module.isCheck)
          .flatMap(
            (modules) =>
              modules.moduleRights
                ?.filter((moduleRight) => moduleRight.isCheck)
                .map((moduleRight) => moduleRight.id) ?? []
          )
      )
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New user role has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='user-role-modal'
      onClose={() => onModalClose(false)}
      title='Manage User Role'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          value={userRoleModalState.userRole?.description}
          onChange={(ret) => {
            dispatch(
              userRoleModalActions.setUserRole({
                ...userRoleModalState.userRole!,
                description: ret.value,
              })
            );
          }}
        />
        <ManageUserRoleAccess />
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
