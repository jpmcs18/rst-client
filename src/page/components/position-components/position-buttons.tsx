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
import { deletePosition } from '../../../repositories/position-queries';
import { positionModalActions } from '../../../state/reducers/position-modal-reducer';
import { positionActions } from '../../../state/reducers/position-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';

export default function PositionButtons() {
  const positionState = useSelector((state: RootState) => state.position);
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setToasterMessage = useSetToasterMessage();
  const setMessage = useSetMessage();
  const setBusy = useSetBusy();
  function add() {
    dispatch(positionActions.setSelected(undefined));
    dispatch(positionModalActions.setPosition());
    dispatch(positionModalActions.setShowModal(true));
  }
  function edit() {
    dispatch(positionModalActions.setPosition(positionState.selectedPosition!));
    dispatch(positionModalActions.setShowModal(true));
  }
  async function onDelete() {
    if (!positionState.selectedPosition?.id) return;
    setMessage({
      message: 'Are you sure you want to delete this?',
      action: 'YESNO',
      onOk: async () => {
        setBusy(true);
        await deletePosition(positionState.selectedPosition?.id ?? 0)
          .then((res) => {
            if (res) {
              setToasterMessage({
                content: 'Selected position has been deleted',
              });
              dispatch(positionActions.setInitiateSearch(true));
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
          Pages.Positions,
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
          Pages.Positions,
          'Edit',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!positionState.selectedPosition}
            onClick={edit}
            title='Edit'>
            <FontAwesomeIcon icon={faEdit} />
            <span className='desktop-features'>Edit</span>
          </button>
        )}
        {hasAccess(
          userProfileState.moduleRights,
          Pages.Positions,
          'Delete',
          userProfileState.isAdmin
        ) && (
          <button
            className='btn-action'
            disabled={!positionState.selectedPosition}
            onClick={onDelete}
            title='Delete'>
            <FontAwesomeIcon icon={faTrash} />
            <span className='desktop-features'>Delete</span>
          </button>
        )}
      </div>

      <Pagination
        pages={positionState.pageCount}
        currentPageNumber={positionState.currentPage}
        itemCount={positionState.itemCount}
        onItemCountChange={(itemCount) =>
          dispatch(positionActions.setItemCount(itemCount))
        }
        goInPage={(page) =>
          dispatch(positionActions.setCurrentPage(page))
        }></Pagination>
    </div>
  );
}
