import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchOffice } from '../../../repositories/office-queries';
import { officeActions } from '../../../state/reducers/office-reducer';
import { RootState } from '../../../state/store';
import ManageOffice from '../../modals/manage-office/manage-office';
import SearchBar from '../searchbar';
import OfficeButtons from './office-buttons';
import OfficeItems from './office-items';

export default function OfficePage() {
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  const officeState = useSelector((state: RootState) => state.office);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchOff();
    },
    //eslint-disable-next-line
    [officeState.initiateSearch]
  );

  async function searchOff() {
    if (!officeState.initiateSearch) return;
    dispatch(officeActions.setInitiateSearch(false));
    setBusy(true);
    await searchOffice(
      officeState.key,
      officeState.itemCount,
      officeState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(officeActions.fill(res.results));
          dispatch(officeActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(officeActions.setkey(key));
    dispatch(officeActions.setCurrentPage(1));
  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.Offices}</div>
      </div>
      <div>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={officeState.key}
        />
      </div>
      <OfficeButtons />
      <OfficeItems />
      {officeModalState.isModalShow && <ManageOffice />}
    </div>
  );
}
