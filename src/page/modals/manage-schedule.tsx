import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import CustomNumber from '../components/custom-number';
import { toFullTimeDisplay } from '../../helper';

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
      await updateSchedule(
        scheduleModalState.schedule,
        scheduleModalState.deletedIds
      )
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
  function addBreakTime() {
    dispatch(scheduleModalActions.addBreakTime());
  }
  return (
    <Modal
      className='schedule-modal'
      onClose={() => onModalClose(false)}
      title='Manage Schedule'>
      <div className='modal-content-body manage-schedule-body'>
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
        <CustomNumber
          title='Total Working Minutes'
          type='number'
          name='totalWorkingMinutes'
          value={scheduleModalState.schedule.totalWorkingMinutes}
          onChange={(ret) => dispatch(scheduleModalActions.updateSchedule(ret))}
        />
        <fieldset>
          <legend>Break Time</legend>
          <div className='breaktime-main-container'>
            <div className='breaktime-management'>
              <CustomDateTimePicker
                title='Break Time Start'
                type='time'
                name='timeStart'
                value={scheduleModalState.breaktime?.timeStart}
                onChange={(ret) =>
                  dispatch(scheduleModalActions.updateBreakTime(ret))
                }
              />
              <CustomDateTimePicker
                title='Break Time End'
                type='time'
                name='timeEnd'
                value={scheduleModalState.breaktime?.timeEnd}
                onChange={(ret) =>
                  dispatch(scheduleModalActions.updateBreakTime(ret))
                }
              />
              <CustomNumber
                title='Total Break Minutes'
                type='number'
                name='totalBreakMinutes'
                value={scheduleModalState.breaktime?.totalBreakMinutes}
                onChange={(ret) =>
                  dispatch(scheduleModalActions.updateBreakTime(ret))
                }
              />
              <div className='btn-actions-group a-left'>
                <button onClick={addBreakTime} className='btn-action'>
                  <FontAwesomeIcon icon={faSave} />
                  <span className='desktop-features'>Save</span>
                </button>
              </div>
            </div>
            <div className='breaktimes-container table-container'>
              <table className='item-table'>
                <thead>
                  <tr>
                    <th>Time Start</th>
                    <th>Time End</th>
                    <th>Total Minutes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleModalState.schedule.breakTimes?.map((breaktime) => (
                    <tr key={breaktime.tempId ?? breaktime.id}>
                      <td>{toFullTimeDisplay(breaktime.timeStart)}</td>
                      <td>{toFullTimeDisplay(breaktime.timeEnd)}</td>
                      <td>{breaktime.totalBreakMinutes}</td>
                      <td>
                        <FontAwesomeIcon
                          onClick={() =>
                            dispatch(
                              scheduleModalActions.deleteBreakTime(breaktime)
                            )
                          }
                          icon={faTrash}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </fieldset>
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
