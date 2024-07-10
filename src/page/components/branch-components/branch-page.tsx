import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchBranch } from '../../../repositories/branch-queries';
import { branchActions } from '../../../state/reducers/branch-reducer';
import { RootState } from '../../../state/store';
import SearchBar from '../searchbar';
import BranchButtons from './branch-buttons';
import BranchItems from './branch-items';
import ManageBranch from '../../modals/manage-branch';

export default function BranchPage() {
  const branchModalState = useSelector((state: RootState) => state.branchModal);
  const branchState = useSelector((state: RootState) => state.branch);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchOff();
    },
    //eslint-disable-next-line
    [branchState.initiateSearch]
  );

  async function searchOff() {
    if (!branchState.initiateSearch) return;
    dispatch(branchActions.setInitiateSearch(false));
    setBusy(true);
    await searchBranch(
      branchState.key,
      branchState.itemCount,
      branchState.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(branchActions.fill(res.results));
          dispatch(branchActions.setPageCount(res.pageCount));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  async function search(key: string) {
    dispatch(branchActions.setkey(key));
    dispatch(branchActions.setCurrentPage(1));
  }
  return (
    <div className='main-container'>
      <div className='title-container'>
        <div className='title'>{Pages.Branches}</div>
      </div>
      <div>
        <SearchBar
          search={search}
          placeholder='Search Key'
          value={branchState.key}
        />
      </div>
      <BranchButtons />
      <BranchItems />
      {branchModalState.isModalShow && <ManageBranch />}
    </div>
  );
}
