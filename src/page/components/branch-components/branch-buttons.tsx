import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetMessage,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { deleteBranch } from '../../../repositories/branch-queries';
import { branchModalActions } from '../../../state/reducers/branch-modal-reducer';
import { branchActions } from '../../../state/reducers/branch-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function BranchButtons() {
  const dispatch = useDispatch();
  const branchState = useSelector((state: RootState) => state.branch);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(branchActions.setSelected(undefined));
    dispatch(branchModalActions.setBranch());
    dispatch(branchModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(branchModalActions.setBranch(branchState.selectedBranch!));
    dispatch(branchModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!branchState.selectedBranch?.id) return;

    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deleteBranch(branchState.selectedBranch?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected branch has been deleted',
              });
              dispatch(branchActions.setInitiateSearch(true));
            }
          })
          .catch((err) => {
            setToasterMessage({ content: err.message });
          })
          .then(() => setBusy(false));
      },
    });
  }
  return (
    <div className='btn-actions-group-container'>
      <div className='btn-actions-group'>
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Branches,
          'Add',
          userProfileState.isAdmin
        ) && (
          <button className='btn-action' title='Add' onClick={add}>
            <FontAwesomeIcon icon={faAdd} />
            <span className='desktop-features'>Add</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Branches,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!branchState.selectedBranch}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Branches,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!branchState.selectedBranch}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={branchState.pageCount}
        currentPageNumber={branchState.currentPage}
        itemCount={branchState.itemCount}
        onItemCountChange={(itemCount) =>
          dispatch(branchActions.setItemCount(itemCount))
        }
        goInPage={(page) => dispatch(branchActions.setCurrentPage(page))}
      />
    </div>
  );
}
