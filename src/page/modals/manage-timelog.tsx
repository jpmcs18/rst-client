import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertTimeLog,
  updateTimeLog,
} from '../../repositories/timelog-queries';
import { timelogModalActions } from '../../state/reducers/timelog-modal-reducer';
import { timelogActions } from '../../state/reducers/timelog-reducer';
import { RootState } from '../../state/store';
import CustomDateTimePicker from '../components/custom-datetime-picker';
import CustomDisplay from '../components/custom-display';
import Modal from './modal';

export default function ManageTimelog() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const timelogModalState = useSelector(
    (state: RootState) => state.timelogModal
  );
  function onModalClose(hasChange: boolean) {
    dispatch(timelogModalActions.setShowModal(false));
    if (hasChange) dispatch(timelogActions.setRefreshTimelog(true));
  }
  async function saveData() {
    setBusy(true);
    if (timelogModalState.timelog.id > 0) {
      await updateTimeLog(timelogModalState.timelog)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Timelog updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertTimeLog(timelogModalState.timelog)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New timelog added.' });
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
      className='timelog-modal'
      onClose={() => onModalClose(false)}
      title='Manage Timelog'>
      <div className='modal-content-body'>
        <div>
          <CustomDisplay
            title='Timelog for'
            value={timelogModalState.employee?.fullName ?? ''}
          />
        </div>
        <CustomDateTimePicker
          title='Login'
          name='login'
          type='datetime-local'
          value={timelogModalState.timelog.login}
          onChange={(ret) => {
            dispatch(timelogModalActions.updateTimelog(ret));
          }}
        />
        <CustomDateTimePicker
          title='Logout'
          name='logout'
          type='datetime-local'
          value={timelogModalState.timelog.logout}
          onChange={(ret) => {
            dispatch(timelogModalActions.updateTimelog(ret));
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
