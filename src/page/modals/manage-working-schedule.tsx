import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../custom-hooks/authorize-provider';
import { getSchedules } from '../../repositories/schedule-queries';
import {
  insertWorkingSchedule,
  updateWorkingSchedule,
} from '../../repositories/working-schedule-queries';
import { workingScheduleModalActions } from '../../state/reducers/working-schedule-modal-reducer';
import { workingScheduleActions } from '../../state/reducers/working-schedule-reducer';
import { RootState } from '../../state/store';
import CustomDropdown from '../components/custom-dropdown';
import Modal from './modal';

export default function ManageWorkingSchedule() {
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const workingScheduleModalState = useSelector(
    (state: RootState) => state.workingScheduleModal
  );
  useEffect(
    () => {
      fetchSchedule();
    },
    //eslint-disable-next-line
    []
  );

  function onModalClose(hasChange: boolean) {
    dispatch(workingScheduleModalActions.setShowModal(false));
    if (hasChange) dispatch(workingScheduleActions.setInitiateSearch(true));
  }
  async function fetchSchedule() {
    setBusy(true);
    await getSchedules()
      .then((res) => {
        if (res) {
          dispatch(workingScheduleModalActions.setSchedules(res));
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .finally(() => setBusy(false));
  }
  async function saveData() {
    setBusy(true);
    if (workingScheduleModalState.workingSchedule.id > 0) {
      await updateWorkingSchedule(workingScheduleModalState.workingSchedule)
        .then((res) => {
          if (res) {
            setToasterMessage({
              content: 'Working schedule has been updated.',
            });
            onModalClose(true);
          }
        })
        .catch((err) => {
          setToasterMessage({ content: err.message });
        })
        .finally(() => setBusy(false));
    } else {
      await insertWorkingSchedule(workingScheduleModalState.workingSchedule)
        .then((res) => {
          if (res !== undefined) {
            setToasterMessage({
              content: 'New working schedule has been added.',
            });
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
      className='workingSchedule-modal'
      onClose={() => onModalClose(false)}
      title='Manage Working Schedule'>
      <div className='modal-content-body'>
        <CustomDropdown
          title='Sunday'
          name='sundayScheduleId'
          value={workingScheduleModalState.workingSchedule.sundayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Monday'
          name='mondayScheduleId'
          value={workingScheduleModalState.workingSchedule.mondayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Tuesday'
          name='tuesdayScheduleId'
          value={workingScheduleModalState.workingSchedule.tuesdayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Wednesday'
          name='wednesdayScheduleId'
          value={workingScheduleModalState.workingSchedule.wednesdayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Thursday'
          name='thursdayScheduleId'
          value={workingScheduleModalState.workingSchedule.thursdayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Friday'
          name='fridayScheduleId'
          value={workingScheduleModalState.workingSchedule.fridayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
        />
        <CustomDropdown
          title='Saturday'
          name='saturdayScheduleId'
          value={workingScheduleModalState.workingSchedule.saturdayScheduleId}
          onChange={(ret) => {
            dispatch(workingScheduleModalActions.updateWorkingSchedule(ret));
          }}
          itemsList={workingScheduleModalState.schedules.map((x) => {
            return {
              key: x.id.toString(),
              value: x.description,
            };
          })}
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
