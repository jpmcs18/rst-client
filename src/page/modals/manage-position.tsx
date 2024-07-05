import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertPosition,
  updatePosition,
} from '../../repositories/position-queries';
import { positionModalActions } from '../../state/reducers/position-modal-reducer';
import { positionActions } from '../../state/reducers/position-reducer';
import { RootState } from '../../state/store';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManagePosition() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const positionModalState = useSelector(
    (state: RootState) => state.positionModal
  );
  function onModalClose(hasChange: boolean) {
    dispatch(positionModalActions.setShowModal(false));
    if (hasChange) dispatch(positionActions.setInitiateSearch(true));
  }
  async function saveData() {
    if (!positionModalState.position.description) {
      setToasterMessage({ content: 'Please fill the description field.' });
      return;
    }
    setBusy(true);
    if (positionModalState.position.id > 0) {
      await updatePosition(positionModalState.position)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Position has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertPosition(positionModalState.position)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New position has been added.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    }
  }
  return (
    <Modal
      className='position-modal'
      onClose={() => onModalClose(false)}
      title='Manage Position'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          value={positionModalState.position?.description}
          onChange={(ret) => {
            dispatch(
              positionModalActions.setPosition({
                ...positionModalState.position!,
                description: ret.value,
              })
            );
          }}
        />
      </div>
      <div className='modal-footer'>
        <div className='btn-actions-group'>
          <button onClick={saveData} className='btn-action'>
            <FontAwesomeIcon icon={faSave} />
            <span className='desktop-features'>Save</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
