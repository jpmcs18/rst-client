import React from 'react';
import Modal from '../modal';
import Employees from './employees';
import EmployeeSchedules from './employee-schedules';
import { useDispatch } from 'react-redux';
import { employeeScheduleModalActions } from '../../../state/reducers/employee-schedule-modal-reducer';

export default function ManageEmployeeSchedule() {
  const dispatch = useDispatch();
  return (
    <Modal
      title='Manage Employee'
      onClose={() =>
        dispatch(employeeScheduleModalActions.setShowModal(false))
      }>
      <div className='modal-content-body manage-employee-schedule-body'>
        <Employees />
        <EmployeeSchedules />
      </div>
    </Modal>
  );
}
