import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import {
  insertSchedule,
  updateSchedule,
} from '../../repositories/schedule-queries';
import { scheduleModalActions } from '../../state/reducers/schedule-modal-reducer';
import { scheduleActions } from '../../state/reducers/schedule-reducer';
import { RootState } from '../../state/store';
import CustomTextBox from '../components/custom-textbox';
import Modal from './modal';
import CustomDateTimePicker from '../components/custom-datetime-picker';

export default function ManageSchedule() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const scheduleModalState = useSelector(
    (state: RootState) => state.scheduleModal
  );
  function onModalClose(hasChange: boolean) {
    dispatch(scheduleModalActions.setShowModal(false));
    if (hasChange) dispatch(scheduleActions.setInitiateSearch(true));
  }
  async function saveData() {
    if (!scheduleModalState.schedule.description) {
      setToasterMessage({ content: 'Please fill the description field.' });
      return;
    }
    setBusy(true);
    if (scheduleModalState.schedule.id > 0) {
      await updateSchedule(scheduleModalState.schedule)
        .then((res) => {
          if (res) {
            setToasterMessage({ content: 'Schedule has been updated.' });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertSchedule(scheduleModalState.schedule)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({ content: 'New schedule has been added.' });
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
      className='schedule-modal'
      onClose={() => onModalClose(false)}
      title='Manage Schedule'>
      <div className='modal-content-body'>
        <CustomTextBox
          title='Description'
          name='description'
          value={scheduleModalState.schedule?.description}
          onChange={(ret) => dispatch(scheduleModalActions.updateSchedule(ret))}
        />
        <CustomDateTimePicker
          title='Time Start'
          type='time'
          name='timeStart'
          value={scheduleModalState.schedule.timeStart}
          onChange={(ret) => dispatch(scheduleModalActions.updateSchedule(ret))}
        />
        <CustomDateTimePicker
          title='Time End'
          type='time'
          name='timeEnd'
          value={scheduleModalState.schedule.timeEnd}
          onChange={(ret) => dispatch(scheduleModalActions.updateSchedule(ret))}
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
