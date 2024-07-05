import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { insertBranch, updateBranch } from '../../repositories/branch-queries';
import { branchModalActions } from '../../state/reducers/branch-modal-reducer';
import { branchActions } from '../../state/reducers/branch-reducer';
import { RootState } from '../../state/store';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';

export default function ManageBranch() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const branchModalState = useSelector((state: RootState) => state.branchModal);
  function onModalClose(hasChange: boolean) {
    dispatch(branchModalActions.setShowModal(false));
    if (hasChange) dispatch(branchActions.setInitiateSearch(true));
  }
  async function saveData() {
    if (!branchModalState.branch.description) {
      setToasterMessage({ content: 'Please fill the description field.' });
      return;
    }
    if (!branchModalState.branch.location) {
      setToasterMessage({ content: 'Please fill the location field.' });
      return;
    }
    setBusy(true);
    if (branchModalState.branch.id > 0) {
      await updateBranch(branchModalState.branch)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Branch has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertBranch(branchModalState.branch)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New branch has been added.' });
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
      className='branch-modal'
      onClose={() => onModalClose(false)}
      title='Manage Branch'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          name='description'
          value={branchModalState.branch?.description}
          onChange={(ret) => dispatch(branchModalActions.updateBranch(ret))}
        />
        <CustomTextBox
          title='Location'
          name='location'
          value={branchModalState.branch?.location}
          onChange={(ret) => dispatch(branchModalActions.updateBranch(ret))}
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
