import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../../constant';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { hasAccess } from '../../../helper';
import { searchEmployeeNotInWorkSchedule } from '../../../repositories/employee-queries';
import { employeeScheduleModalActions } from '../../../state/reducers/employee-schedule-modal-reducer';
import { RootState } from '../../../state/store';
import CustomCheckBox from '../../components/custom-checkbox';
import Pagination from '../../components/pagination';
import SearchBar from '../../components/searchbar';
import { addWorkingScheduleEmployee } from '../../../repositories/working-schedule-queries';

export default function Employees() {
  const employeeScheduleModalState = useSelector(
    (state: RootState) => state.employeeScheduleModal
  );
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchEmp();
    },
    //eslint-disable-next-line
    [employeeScheduleModalState.employeeSearch.initiateSearch]
  );

  async function searchEmp() {
    if (!employeeScheduleModalState.employeeSearch.initiateSearch) return;
    dispatch(
      employeeScheduleModalActions.setEmployeeSearch({
        elementName: 'initiateSearch',
        value: false,
      })
    );
    setBusy(true);
    await searchEmployeeNotInWorkSchedule(
      employeeScheduleModalState.employeeSearch.key,
      employeeScheduleModalState.workingSchedule?.id ?? 0,
      employeeScheduleModalState.employeeSearch.itemCount,
      employeeScheduleModalState.employeeSearch.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(employeeScheduleModalActions.setEmployees(res.results));
          dispatch(
            employeeScheduleModalActions.setEmployeeSearch({
              elementName: 'pageCount',
              value: res.pageCount,
            })
          );
        }
      })
      .catch((err) => {
        setToasterMessage({ content: err.message });
      })
      .then(() => {
        setBusy(false);
      });
  }
  async function search(key: string) {
    dispatch(
      employeeScheduleModalActions.setEmployeeSearch({
        elementName: 'key',
        value: key,
      })
    );
    dispatch(
      employeeScheduleModalActions.setEmployeeSearch({
        elementName: 'currentPage',
        value: 1,
      })
    );
    dispatch(
      employeeScheduleModalActions.setEmployeeSearch({
        elementName: 'initiateSearch',
        value: true,
      })
    );
  }
  async function addEmployee() {
    if (
      employeeScheduleModalState.employees.filter((x) => x.isChecked).length ===
      0
    ) {
      setToasterMessage({ content: 'Please select atleast 1 employee.' });
      return;
    }
    setBusy(true);
    await addWorkingScheduleEmployee(
      employeeScheduleModalState.employees
        .filter((x) => x.isChecked)
        .map((x) => x.id),
      employeeScheduleModalState.workingSchedule?.id ?? 0
    )
      .then((ret) => {
        if (ret) {
          dispatch(
            employeeScheduleModalActions.setEmployeeSearch({
              elementName: 'initiateSearch',
              value: true,
            })
          );
        }
      })
      .catch((err) => setToasterMessage({ content: err.message }))
      .finally(() => setBusy(false));
  }
  return (
    <div className='employee-searching-container'>
      <SearchBar
        search={search}
        placeholder='Search Key'
        value={employeeScheduleModalState.employeeSearch.key}
      />
      <div className='btn-actions-group-container'>
        <div className='btn-actions-group'>
          {hasAccess(
            userProfileState.moduleRights,
            Pages.WorkingSchedules,
            'Add Checked Employee/s',
            userProfileState.isAdmin
          ) && (
            <button className='btn-action' onClick={addEmployee}>
              <FontAwesomeIcon icon={faCheckToSlot} />
              <span className='desktop-features'>Add Checked Employee/s</span>
            </button>
          )}
        </div>
        <Pagination
          pages={employeeScheduleModalState.employeeSearch.pageCount}
          currentPageNumber={
            employeeScheduleModalState.employeeSearch.currentPage
          }
          itemCount={employeeScheduleModalState.employeeSearch.itemCount}
          onItemCountChange={(itemCount) => {
            dispatch(
              employeeScheduleModalActions.setEmployeeSearch({
                elementName: 'itemCount',
                value: itemCount,
              })
            );
            dispatch(
              employeeScheduleModalActions.setEmployeeSearch({
                elementName: 'initiateSearch',
                value: true,
              })
            );
          }}
          goInPage={(page) => {
            dispatch(
              employeeScheduleModalActions.setEmployeeSearch({
                elementName: 'currentPage',
                value: page,
              })
            );
            dispatch(
              employeeScheduleModalActions.setEmployeeSearch({
                elementName: 'initiateSearch',
                value: true,
              })
            );
          }}
        />
      </div>
      <div className='table-container'>
        <table className='item-table'>
          <thead>
            <tr>
              <th style={{ width: '5%' }}></th>
              <th>Full Name</th>
              <th>Branch</th>
              <th>Office</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employeeScheduleModalState.employees.map((employee) => (
              <tr
                key={employee.id}
                className={employee.isChecked ? 'selected' : ''}>
                <td>
                  <CustomCheckBox
                    isChecked={!!employee.isChecked}
                    onChange={() =>
                      dispatch(
                        employeeScheduleModalActions.setEmployeeCheckChange(
                          employee.id
                        )
                      )
                    }
                  />
                </td>
                <td>{employee.fullName}</td>
                <td>{employee.branch?.description}</td>
                <td>{employee.office?.description}</td>
                <td>{employee.position?.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
