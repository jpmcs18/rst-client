import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { officeModalActions } from '../../../state/reducers/office-modal-reducer';
import { RootState } from '../../../state/store';

export default function ManageOfficePositionsTable() {
  const dispatch = useDispatch();
  const officeModalState = useSelector((state: RootState) => state.officeModal);
  return (
    <div className='table-container office-management-table'>
      <table className='item-table'>
        <thead>
          <tr>
            <th colSpan={2}>Positions</th>
          </tr>
        </thead>
        <tbody>
          {officeModalState.officePositions?.map((officePositions) => (
            <tr
              key={officePositions.tempId}
              className={officePositions.deleted ? 'deleted' : ''}>
              <td>{officePositions.position?.description}</td>
              <td style={{ width: '3em' }} className='table-actions'>
                {officePositions.deleted && (
                  <FontAwesomeIcon
                    icon={faUndo}
                    className='action-icon table-icon-button'
                    onClick={() => {
                      dispatch(
                        officeModalActions.undoDeletePosition(
                          officePositions.id
                        )
                      );
                    }}
                    title='Undo'
                  />
                )}
                {!officePositions.deleted && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className='action-icon table-icon-button'
                    onClick={() => {
                      dispatch(
                        officeModalActions.deletePosition(officePositions)
                      );
                    }}
                    title='Delete'
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
