import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from '../../../state/reducers/schedule-reducer';
import { RootState } from '../../../state/store';

export default function ScheduleItems() {
  const dispatch = useDispatch();
  const scheduleState = useSelector((state: RootState) => state.schedule);
  return (
    <section className='table-container'>
      <table className='item-table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Time Start</th>
            <th>Time End</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
