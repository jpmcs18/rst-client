import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { timelogActions } from '../../../state/reducers/timelog-reducer';
import { RootState } from '../../../state/store';
import CustomDateTimePicker from '../custom-datetime-picker';

export default function TimelogFilter() {
  const timelogState = useSelector((state: RootState) => state.timelog);
  const dispatch = useDispatch();
  return (
    <div className='date-range-container'>
      <CustomDateTimePicker
        title='Start Date'
        type='date'
        name='start'
        value={timelogState.start}
        onChange={(ret) => dispatch(timelogActions.setStart(ret.value))}
      />
      <CustomDateTimePicker
        title='End Date'
        type='date'
        name='end'
        value={timelogState.end}
        onChange={(ret) => dispatch(timelogActions.setEnd(ret.value))}
      />
      <button
        className='btn-tool'
        onClick={() => dispatch(timelogActions.setRefreshTimelog(true))}>
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </div>
  );
}
