import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import BreakTime from '../../models/entities/BreakTime';
import Schedule from '../../models/entities/Schedule';
import { Guid } from 'guid-typescript';
interface State {
  schedule: Schedule;
  isModalShow: boolean;
  breaktime: BreakTime | undefined;
  deletedIds: number[];
}
const scheduleInitialState: Schedule = {
  id: 0,
  description: '',
  breakTimes: [],
};
const initialState: State = {
  schedule: scheduleInitialState,
  isModalShow: false,
  breaktime: undefined,
  deletedIds: [],
};

const scheduleModalSlice = createSlice({
  name: 'schedule-modal',
  initialState: initialState,
  reducers: {
    setSchedule(state, action: PayloadAction<Schedule | undefined>) {
      state.schedule = action.payload ?? scheduleInitialState;
    },
    updateSchedule(state, action: PayloadAction<CustomReturn>) {
      state.schedule = {
        ...state.schedule,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.breaktime = undefined;
        state.deletedIds = [];
      }
    },
    updateBreakTime(state, action: PayloadAction<CustomReturn>) {
      state.breaktime = {
        ...state.breaktime!,
        [action.payload.elementName]: action.payload.value,
      };
    },
    addBreakTime(state) {
      if (state.schedule.breakTimes) {
        state.schedule.breakTimes = [
          ...state.schedule.breakTimes!,
          {
            ...state.breaktime!,
            tempId: Guid.create().toString(),
          },
        ];
      } else {
        state.schedule.breakTimes = [
          {
            ...state.breaktime!,
            tempId: Guid.create().toString(),
          },
        ];
      }
      state.breaktime = undefined;
    },
    deleteBreakTime(state, action: PayloadAction<BreakTime>) {
      state.schedule.breakTimes = state.schedule.breakTimes
        ?.slice()
        .filter(
          (x) =>
            !(x.tempId === action.payload.tempId && x.id === action.payload.id)
        );
      if (!!action.payload.id) {
        state.deletedIds = [...state.deletedIds, action.payload.id];
      }
    },
  },
});

export default scheduleModalSlice.reducer;
export const scheduleModalActions = scheduleModalSlice.actions;
