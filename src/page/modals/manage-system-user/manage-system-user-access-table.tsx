import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { systemUserModalActions } from '../../../state/reducers/system-user-modal-reducer';
import { RootState } from '../../../state/store';

export default function ManageUserAccessTable() {
  const dispatch = useDispatch();
  const systemUserModalState = useSelector(
    (state: RootState) => state.systemUserModal
  );
  return (
    <div className='table-container systemUser-management-table'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Roles</th>
            <th style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {systemUserModalState.userAccesses?.map((userAccess) => (
            <tr
              key={userAccess.tempId}
              className={userAccess.deleted ? 'deleted' : ''}>
              <td>{userAccess.userRole?.description}</td>
              <td className='table-actions'>
                {userAccess.deleted && (
                  <FontAwesomeIcon
                    icon={faUndo}
                    className='action-icon table-icon-button'
                    onClick={() => {
                      dispatch(
                        systemUserModalActions.undoDeleteUserAccess(
                          userAccess.id
                        )
                      );
                    }}
                    title='Undo'
                  />
                )}
                {!userAccess.deleted && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='action-icon table-icon-button'
                    onClick={() => {
                      dispatch(
                        systemUserModalActions.deleteUserAccess(userAccess)
                      );
                    }}
                    title='Delete'
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
