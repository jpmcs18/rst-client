import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Schedule from '../../models/entities/Schedule';
import CustomReturn from '../../models/client-model/CustomReturn';

interface State {
  schedule: Schedule;
  isModalShow: boolean;
}
const scheduleInitialState = { id: 0, description: '' };
const initialState: State = {
  schedule: scheduleInitialState,
  isModalShow: false,
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
    },
  },
});

export default scheduleModalSlice.reducer;
export const scheduleModalActions = scheduleModalSlice.actions;
