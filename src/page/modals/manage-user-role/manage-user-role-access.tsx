import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userRoleModalActions } from '../../../state/reducers/user-role-modal-reducer';
import { RootState } from '../../../state/store';
import CollapsibleContainer from '../../components/collapsible-container';
import CustomCheckBox from '../../components/custom-checkbox';

export default function ManageUserRoleAccess() {
  const userRoleModalState = useSelector(
    (state: RootState) => state.userRoleModal
  );
  const dispatch = useDispatch();
  return (
    <div className='table-container user-role-modules-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Modules</th>
          </tr>
        </thead>
        <tbody>
          {userRoleModalState.modules.map((module) => (
            <tr key={module.id}>
              <td>
                <CollapsibleContainer
                  header={
                    <div>
                      <CustomCheckBox
                        text={module.description}
                        id={'module' + module.id}
                        checkChange={() => {
                          dispatch(userRoleModalActions.checkModule(module.id));
                        }}
                        isCheck={module.isCheck ?? false}
                      />
                    </div>
                  }
                  content={
                    <div className='module-right-container'>
                      {module.moduleRights?.map((moduleRight) => (
                        <div key={moduleRight.id} className='module-right'>
                          <CustomCheckBox
                            text={moduleRight.right}
                            id={'module-right' + moduleRight.id}
                            checkChange={() => {
                              dispatch(
                                userRoleModalActions.checkModuleRight({
                                  moduleId: module.id,
                                  moduleRightId: moduleRight.id,
                                })
                              );
                            }}
                            isCheck={moduleRight.isCheck ?? false}
                          />
                        </div>
                      ))}
                    </div>
                  }></CollapsibleContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
