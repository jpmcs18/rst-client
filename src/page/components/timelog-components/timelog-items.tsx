import { useDispatch, useSelector } from 'react-redux';
import { toDateTime } from '../../../helper';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';
import Pagination from '../pagination';
import TimeLogButtons from './timelog-buttons';
import TimelogFilter from './timelog-filter';

export default function EmployeeSection() {
  const dispatch = useDispatch();
  const timelogState = useSelector((state: RootState) => state.timelog);
  async function nextPage(page: number) {
    dispatch(timelogActions.setCurrentPage(page));
    dispatch(timelogActions.setInitiateSearch(true));
  }
  return (
    <div className='timelog-main-container'>
      <div className='timelog-container'>
        <Pagination
          pages={timelogState.pageCount}
          currentPageNumber={timelogState.currentPage}
          goInPage={nextPage}></Pagination>
        <div className='table-container employee-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Office</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {timelogState.employees.map((employee) => (
                <tr
                  onClick={() => {
                    dispatch(timelogActions.setSelected(employee));
                    dispatch(timelogActions.setRefreshTimelog(true));
                  }}
                  key={employee.id}
                  className={
                    timelogState.selectedEmployee?.id === employee.id
                      ? 'selected'
                      : ''
                  }>
                  <td>{employee.fullName}</td>
                  <td>{employee.office?.description}</td>
                  <td>{employee.position?.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='timelog-container'>
        <TimelogFilter />
        <TimeLogButtons />
        <div className='table-container logs-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Login</th>
                <th>Logout</th>
              </tr>
            </thead>
            <tbody>
              {timelogState.timelogs?.map((timelog) => (
                <tr
                  onClick={() =>
                    dispatch(timelogActions.setSelectedTimelog(timelog))
                  }
                  key={timelog.id}
                  className={
                    timelogState.selectedTimelog?.id === timelog.id
                      ? 'selected'
                      : ''
                  }>
                  <td>{toDateTime(timelog.login)}</td>
                  <td>{toDateTime(timelog.logout)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
