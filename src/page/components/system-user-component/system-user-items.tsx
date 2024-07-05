import { useDispatch, useSelector } from 'react-redux';
import { systemUserActions } from '../../../state/reducers/system-user-reducer';
import { RootState } from '../../../state/store';

export default function SystemUserItems() {
  const dispatch = useDispatch();
  const systemUserState = useSelector((state: RootState) => state.systemUser);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Office</th>
            <th>Position</th>
            <th>Username</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {systemUserState.systemUsers.map((systemUser) => (
            <tr
              onClick={() =>
                dispatch(systemUserActions.setSelected(systemUser))
              }
              key={systemUser.id}
              className={
                systemUserState.selectedSystemUser?.id === systemUser.id
                  ? 'selected'
                  : ''
              }>
              <td>{systemUser.employee?.fullName ?? 'N/A'}</td>
              <td>{systemUser.employee?.office?.description ?? 'N/A'}</td>
              <td>{systemUser.employee?.position?.description ?? 'N/A'}</td>
              <td>{systemUser.username}</td>
              <td>{systemUser.userType?.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
