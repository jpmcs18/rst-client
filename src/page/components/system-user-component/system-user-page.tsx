import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchSystemUser } from '../../../repositories/system-user-queries';
import { systemUserActions } from '../../../state/reducers/system-user-reducer';
import { RootState } from '../../../state/store';
import ManageSystemUser from '../../modals/manage-system-user/manage-system-user';
import SearchBar from '../searchbar';
import SystemUserButtons from './system-user-buttons';
import SystemUserItems from './system-user-items';

export default function SystemUserPage() {
  const systemUserModalState = useSelector(
    (state: RootState) => state.systemUserModal
  );
  const systemUserState = useSelector((state: RootState) => state.systemUser);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchUsr();
    },
    //eslint-disable-next-line
    [systemUserState.initiateSearch]
  );

  async function searchUsr() {
    if (!systemUserState.initiateSearch) return;
    dispatch(systemUserActions.setInitiateSearch(false));
    setBusy(true);
    await searchSystemUser(
      systemUserState.key,
      systemUserState.itemCount,
      systemUserState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(systemUserActions.fill(res.results));
          dispatch(systemUserActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(systemUserActions.setkey(key));
    dispatch(systemUserActions.setCurrentPage(1));
  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.SystemUsers}</div>
      </div>
      <div>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={systemUserState.key}
        />
      </div>
      <SystemUserButtons />
      <SystemUserItems />
      {systemUserModalState.isModalShow && <ManageSystemUser />}
    </div>
  );
}
