import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchUserRole } from '../../../repositories/user-role-queries';
import { userRoleActions } from '../../../state/reducers/user-role-reducer';
import { RootState } from '../../../state/store';
import ManageUserRole from '../../modals/manage-user-role/manage-user-role';
import SearchBar from '../searchbar';
import UserRoleButtons from './user-role-buttons';
import UserRoleItems from './user-role-items';

export default function UserRolePage() {
  const userRoleModalState = useSelector(
    (state: RootState) => state.userRoleModal
  );
  const userRoleState = useSelector((state: RootState) => state.userRole);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [userRoleState.initiateSearch]
  );

  async function searchDes() {
    if (!userRoleState.initiateSearch) return true;
    setBusy(true);
    dispatch(userRoleActions.setInitiateSearch(false));
    await searchUserRole(userRoleState.key, userRoleState.currentPage)
      .then((res) => {
        if (res !== undefined) {
          dispatch(userRoleActions.fill(res.results));
          dispatch(userRoleActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(userRoleActions.setkey(key));
    dispatch(userRoleActions.setCurrentPage(1));
    dispatch(userRoleActions.setInitiateSearch(true));
  }
  return (
    <div className='main-container'>
      <section className='title-container'>
        <div className='title'>{Pages.UserRoles}</div>
      </section>
      <section>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={userRoleState.key}
        />
      </section>
      <UserRoleButtons />
      <UserRoleItems />
      {userRoleModalState.isModalShow && <ManageUserRole />}
    </div>
  );
}
