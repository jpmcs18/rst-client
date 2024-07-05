import { useDispatch, useSelector } from 'react-redux';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';

export default function UserRoleItems() {
  const dispatch = useDispatch();
  const userRoleState = useSelector((state: RootState) => state.userRole);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {userRoleState.userRoles.map((userRole) => (
            <tr
              onClick={() => dispatch(userRoleActions.setSelected(userRole))}
              key={userRole.id}
              className={
                userRoleState.selectedUserRole?.id === userRole.id
                  ? 'selected'
                  : ''
              }>
              <td>{userRole.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
