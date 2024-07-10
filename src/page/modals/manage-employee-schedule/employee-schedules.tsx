import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useSetBusy,
  useSetToasterMessage,
} from '../../../custom-hooks/authorize-provider';
import { searchEmployeeInWorkSchedule } from '../../../repositories/employee-queries';
import { deleteWorkingScheduleEmployee } from '../../../repositories/working-schedule-queries';
import { employeeScheduleModalActions } from '../../../state/reducers/employee-schedule-modal-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../../components/pagination';
import SearchBar from '../../components/searchbar';

export default function EmployeeSchedules() {
  const employeeScheduleModalState = useSelector(
    (state: RootState) => state.employeeScheduleModal
  );
  const dispatch = useDispatch();
  const setBusy = useSetBusy();
  const setToasterMessage = useSetToasterMessage();
  useEffect(
    () => {
      searchEmp();
    },
    //eslint-disable-next-line
    [employeeScheduleModalState.employeeScheduleSearch.initiateSearch]
  );

  async function searchEmp() {
    if (!employeeScheduleModalState.employeeScheduleSearch.initiateSearch)
      return;
    dispatch(
      employeeScheduleModalActions.setEmployeeScheduleSearch({
        elementName: 'initiateSearch',
        value: false,
      })
    );
    setBusy(true);
    await searchEmployeeInWorkSchedule(
      employeeScheduleModalState.employeeScheduleSearch.key,
      employeeScheduleModalState.workingSchedule?.id ?? 0,
      employeeScheduleModalState.employeeScheduleSearch.itemCount,
      employeeScheduleModalState.employeeScheduleSearch.currentPage
    )
      .then((res) => {
        if (res !== undefined) {
          dispatch(
            employeeScheduleModalActions.setEmployeeSchedules(res.results)
          );
          dispatch(
            employeeScheduleModalActions.setEmployeeScheduleSearch({
              elementName: 'pageCount',
              value: res.pageCount,
            })
          );
          if (
            res.pageCount <
            employeeScheduleModalState.employeeScheduleSearch.currentPage
          ) {
            dispatch(
              employeeScheduleModalActions.setEmployeeScheduleSearch({
                elementName: 'currentPage',
                value:
                  employeeScheduleModalState.employeeScheduleSearch
                    .currentPage - 1,
              })
            );
          }
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
      employeeScheduleModalActions.setEmployeeScheduleSearch({
        elementName: 'key',
        value: key,
      })
    );
    dispatch(
      employeeScheduleModalActions.setEmployeeScheduleSearch({
        elementName: 'currentPage',
        value: 1,
      })
    );
    dispatch(
      employeeScheduleModalActions.setEmployeeScheduleSearch({
        elementName: 'initiateSearch',
        value: true,
      })
    );
  }
  async function onDeleteEmployee(id: number) {
    setBusy(true);
    await deleteWorkingScheduleEmployee(
      id,
      employeeScheduleModalState.workingSchedule?.id ?? 0
    )
      .then((res) => {
        if (res) {
          dispatch(
            employeeScheduleModalActions.setEmployeeScheduleSearch({
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
        value={employeeScheduleModalState.employeeScheduleSearch.key}
      />

      <Pagination
        pages={employeeScheduleModalState.employeeScheduleSearch.pageCount}
        currentPageNumber={
          employeeScheduleModalState.employeeScheduleSearch.currentPage
        }
        itemCount={employeeScheduleModalState.employeeScheduleSearch.itemCount}
        onItemCountChange={(itemCount) => {
          dispatch(
            employeeScheduleModalActions.setEmployeeScheduleSearch({
              elementName: 'itemCount',
              value: itemCount,
            })
          );
          dispatch(
            employeeScheduleModalActions.setEmployeeScheduleSearch({
              elementName: 'initiateSearch',
              value: true,
            })
          );
        }}
        goInPage={(page) => {
          dispatch(
            employeeScheduleModalActions.setEmployeeScheduleSearch({
              elementName: 'currentPage',
              value: page,
            })
          );
          dispatch(
            employeeScheduleModalActions.setEmployeeScheduleSearch({
              elementName: 'initiateSearch',
              value: true,
            })
          );
        }}
      />
      <div className='table-container'>
        <table className='item-table'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Branch</th>
              <th>Office</th>
              <th>Position</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employeeScheduleModalState.employeeSchedules.map((employee) => (
              <tr key={employee?.id}>
                <td>{employee?.fullName}</td>
                <td>{employee?.branch?.description}</td>
                <td>{employee?.office?.description}</td>
                <td>{employee?.position?.description}</td>
                <td>
                  <FontAwesomeIcon
                    onClick={() => onDeleteEmployee(employee?.id)}
                    icon={faTrash}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
