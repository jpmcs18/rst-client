import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Schedule from '../../models/entities/Schedule';
import WorkingSchedule from '../../models/entities/WorkingSchedule';
interface State {
  workingSchedule: WorkingSchedule;
  isModalShow: boolean;
  schedules: Schedule[];
}
const workingScheduleInitialState: WorkingSchedule = {
  id: 0,
  sundayScheduleId: undefined,
  mondayScheduleId: undefined,
  tuesdayScheduleId: undefined,
  wednesdayScheduleId: undefined,
  thursdayScheduleId: undefined,
  fridayScheduleId: undefined,
  saturdayScheduleId: undefined,
  employees: 0,
};
const initialState: State = {
  workingSchedule: workingScheduleInitialState,
  isModalShow: false,
  schedules: [],
};

const workingScheduleModalSlice = createSlice({
  name: 'working-schedule-modal',
  initialState: initialState,
  reducers: {
    setWorkingSchedule(
      state,
      action: PayloadAction<WorkingSchedule | undefined>
    ) {
      state.workingSchedule = action.payload ?? workingScheduleInitialState;
    },
    updateWorkingSchedule(state, action: PayloadAction<CustomReturn>) {
      state.workingSchedule = {
        ...state.workingSchedule,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setSchedules(state, action: PayloadAction<Schedule[] | undefined>) {
      state.schedules = action.payload ?? [];
    },
  },
});

export default workingScheduleModalSlice.reducer;
export const workingScheduleModalActions = workingScheduleModalSlice.actions;
