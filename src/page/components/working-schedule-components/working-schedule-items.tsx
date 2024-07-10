import { useDispatch, useSelector } from 'react-redux';
import { workingScheduleActions } from '../../../state/reducers/working-schedule-reducer';
import { RootState } from '../../../state/store';

export default function ScheduleItems() {
  const dispatch = useDispatch();
  const workingScheduleState = useSelector(
    (state: RootState) => state.workingSchedule
  );
  return (
    <div className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Employee Count</th>
          </tr>
        </thead>
        <tbody>
          {workingScheduleState.workingSchedules.map((workingSchedule) => (
            <tr
              onClick={() =>
                dispatch(workingScheduleActions.setSelected(workingSchedule))
              }
              key={workingSchedule.id}
              className={
                workingScheduleState.selectedWorkingSchedule?.id ===
                workingSchedule.id
                  ? 'selected'
                  : ''
              }>
              <td>{workingSchedule.sundaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.mondaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.tuesdaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.wednesdaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.thursdaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.fridaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.saturdaySchedule?.description ?? 'OFF'}</td>
              <td>{workingSchedule.employees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
