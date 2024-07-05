import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { downloadFile, validateDate } from '../../../helper';
import Employee from '../../../models/entities/Employee';
import { getDTRReport } from '../../../repositories/timelog-queries';
import { employeeSearchableActions } from '../../../state/reducers/searchables/employee-searchable-reducer';
import { RootState } from '../../../state/store';
import EmployeeSearchable from '../../modals/searchables/employee-searchable';
import CustomDateTimePicker from '../custom-datetime-picker';
import CustomSelector from '../custom-selector';

export default function DTRReport() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  const dispatch = useDispatch();
  const employeeSearchableState = useSelector(
    (state: RootState) => state.employeeSearchable
  );

  async function exportReport() {
    if (!validateDate(startDate) || !validateDate(endDate)) {
      setToasterMessage({
        content: 'Unable to generate report.\nInvalid date range.',
      });
      return;
    }
    setBusy(true);
    await getDTRReport(startDate, endDate, employee?.id)
      .then((res) => {
        if (res !== undefined) {
          downloadFile(res, 'dtr.xlsx');
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => setBusy(false));
  }
  function onEmployeeModalClose(employee?: Employee) {
    setEmployee(() => employee);
    console.log(employee);
  }

  return (
    <section className='report-container'>
      <div className='report-title'>Export DTR</div>
      <div className='report-header'>
        <CustomDateTimePicker
          type='date'
          title='Start Date'
          value={startDate}
          onChange={(ret) => setStartDate(ret.value)}
        />
        <CustomDateTimePicker
          type='date'
          title='End Date'
          value={endDate}
          onChange={(ret) => setEndDate(ret.value)}
        />
        <CustomSelector
          title='Employee'
          value={employee?.fullName}
          onSelectorClick={() => {
            dispatch(employeeSearchableActions.setShowModal(true));
            dispatch(
              employeeSearchableActions.setOnCloseFunction(onEmployeeModalClose)
            );
          }}
          onClear={() => {
            setEmployee(() => undefined);
          }}
        />
      </div>
      <div className='report-footer'>
        <div className='btn-actions-group'>
          <button className='btn-action' onClick={exportReport}>
            <FontAwesomeIcon icon={faFileExport} />
            <span className='desktop-features'>Export</span>
          </button>
        </div>
      </div>
      {employeeSearchableState.isModalShow && <EmployeeSearchable />}
    </section>
  );
}
