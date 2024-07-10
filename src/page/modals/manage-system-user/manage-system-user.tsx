import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import Employee from '../../../models/entities/Employee';
import {
  insertSystemUser,
  updateSystemUser,
} from '../../../repositories/system-user-queries';
import { getUserRoles } from '../../../repositories/user-role-queries';
import { getUserTypes } from '../../../repositories/user-type-queries';
import { employeeSearchableActions } from '../../../state/reducers/searchables/employee-searchable-reducer';
import { systemUserModalActions } from '../../../state/reducers/system-user-modal-reducer';
import { systemUserActions } from '../../../state/reducers/system-user-reducer';
import { RootState } from '../../../state/store';
import CustomDropdown from '../../components/custom-dropdown';
import CustomSelector from '../../components/custom-selector';
import CustomUsername from '../../components/custom-username';
import Modal from '../modal';
import EmployeeSearchable from '../searchables/employee-searchable';
import ManageSystemUserPositionsTable from './manage-system-user-access-table';

export default function ManageSystemUser() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const systemUserModalState = useSelector(
    (state: RootState) => state.systemUserModal
  );
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );
  useEffect(
    () => {
      fetchUserRoles();
      fetchUserTypes();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(systemUserModalActions.setShowModal(false));
    if (hasChange) dispatch(systemUserActions.setInitiateSearch(true));
  }
  async function fetchUserRoles() {
    setBusy(true);
    await getUserRoles()
      .then((res) => {
        if (res) {
          dispatch(systemUserModalActions.setUserRoles(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (systemUserModalState.systemUser.id > 0) {
      await updateSystemUser(
        systemUserModalState.systemUser,
        systemUserModalState.newUserRole,
        systemUserModalState.deletedUserAccess
      )
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'User has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertSystemUser(
        systemUserModalState.systemUser,
        systemUserModalState.newUserRole
      )
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New user has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  async function fetchUserTypes() {
    setBusy(true);
    await getUserTypes()
      .then((res) => {
        if (res) {
          dispatch(systemUserModalActions.setUserTypes(res));
        }
      })
      .finally(() => setBusy(false));
  }
  function onEmployeeModalClose(employee?: Employee) {
    if (employee) {
      dispatch(
        systemUserModalActions.updateSystemUser({
          elementName: 'employeeId',
          value: employee?.id,
        })
      );
      dispatch(
        systemUserModalActions.updateSystemUser({
          elementName: 'employee',
          value: employee,
        })
      );
    }
  }
  return (
    <Modal
      className='system-user-modal'
      onClose={() => onModalClose(false)}
      title='Manage User'>
      <div className='modal-content-body system-user-content-body'>
        <div>
          <CustomSelector
            title='Employee'
            value={systemUserModalState.systemUser.employee?.fullName}
            onSelectorClick={() => {
              dispatch(employeeSearchableActions.setShowModal(true));
              dispatch(
                employeeSearchableActions.setOnCloseFunction(
                  onEmployeeModalClose
                )
              );
            }}
            onClear={() => {
              dispatch(
                systemUserModalActions.updateSystemUser({
                  elementName: 'employeeId',
                  value: undefined,
                })
              );
              dispatch(
                systemUserModalActions.updateSystemUser({
                  elementName: 'employee',
                  value: undefined,
                })
              );
            }}
          />
          <CustomUsername
            title='Username'
            name='username'
            value={systemUserModalState.systemUser?.username}
            onChange={(ret) => {
              dispatch(systemUserModalActions.updateSystemUser(ret));
            }}
          />
          <CustomDropdown
            title='User Type'
            name='userTypeId'
            value={systemUserModalState.systemUser.userTypeId}
            onChange={(ret) => {
              dispatch(systemUserModalActions.updateSystemUser(ret));
            }}
            itemsList={systemUserModalState.userTypes.map((x) => {
              return {
                key: x.id.toString(),
                value: x.description,
              };
            })}
          />
        </div>
        {systemUserModalState.systemUser.userType?.needsAccess && (
          <div>
            <CustomDropdown
              selectorOnly={true}
              title='Roles'
              onChange={(ret) => {
                dispatch(systemUserModalActions.addNewUserRole(ret.value));
              }}
              itemsList={systemUserModalState.userRoles.map((x) => {
                return {
                  key: x.id.toString(),
                  value: x.description,
                };
              })}
            />
            <ManageSystemUserPositionsTable />
          </div>
        )}
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
      {employeeSearchableState.isModalShow && <EmployeeSearchable />}
    </Modal>
  );
}
