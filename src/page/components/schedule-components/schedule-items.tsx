import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from '../../../state/reducers/schedule-reducer';
import { RootState } from '../../../state/store';
import { toFullTimeDisplay } from '../../../helper';

export default function ScheduleItems() {
  const dispatch = useDispatch();
  const scheduleState = useSelector((state: RootState) => state.schedule);
  return (
    <div className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Time Start</th>
            <th>Time End</th>
            <th>Working Minutes</th>
            <th>Break Times</th>
          </tr>
        </thead>
        <tbody>
          {scheduleState.schedules.map((schedule) => (
            <tr
              onClick={() => dispatch(scheduleActions.setSelected(schedule))}
              key={schedule.id}
              className={
                scheduleState.selectedSchedule?.id === schedule.id
                  ? 'selected'
                  : ''
              }>
              <td>{schedule.description}</td>
              <td>{toFullTimeDisplay(schedule.timeStart)}</td>
              <td>{toFullTimeDisplay(schedule.timeEnd)}</td>
              <td>{schedule.totalWorkingMinutes}</td>
              <td>
                {schedule.breakTimes?.map((b) => (
                  <li key={b.id}>
                    {toFullTimeDisplay(b.timeStart)}&nbsp;-&nbsp;
                    {toFullTimeDisplay(b.timeEnd)}
                  </li>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
