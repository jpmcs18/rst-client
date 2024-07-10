import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchPosition } from '../../../repositories/position-queries';
import { positionActions } from '../../../state/reducers/position-reducer';
import { RootState } from '../../../state/store';
import ManagePosition from '../../modals/manage-position';
import SearchBar from '../searchbar';
import PositionButtons from './position-buttons';
import PositionItems from './position-items';

export default function PositionPage() {
  const positionModalState = useSelector(
    (state: RootState) => state.positionModal
  );
  const positionState = useSelector((state: RootState) => state.position);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchDes();
    },
    //eslint-disable-next-line
    [positionState.initiateSearch]
  );

  async function searchDes() {
    if (!positionState.initiateSearch) return;
    dispatch(positionActions.setInitiateSearch(false));
    setBusy(true);
    await searchPosition(
      positionState.key,
      positionState.itemCount,
      positionState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(positionActions.fill(res.results));
          dispatch(positionActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(positionActions.setkey(key));
    dispatch(positionActions.setCurrentPage(1));
  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.Positions}</div>
      </div>
      <div>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={positionState.key}
        />
      </div>
      <PositionButtons />
      <PositionItems />
      {positionModalState.isModalShow && <ManagePosition />}
    </div>
  );
}
