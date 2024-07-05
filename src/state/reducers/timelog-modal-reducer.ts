import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Employee from '../../models/entities/Employee';
import TimeLog from '../../models/entities/TimeLog';

interface State {
  employee: Employee | undefined;
  timelog: TimeLog;
  isModalShow: boolean;
}

const timelogInitialState: TimeLog = {
  id: 0,
  employeeId: undefined,
  login: undefined,
  logout: undefined,
};

const initialState: State = {
  employee: undefined,
  timelog: timelogInitialState,
  isModalShow: false,
};

const timelogModalSlice = createSlice({
  name: 'timelog-modal',
  initialState: initialState,
  reducers: {
    setTimelog(state, action: PayloadAction<TimeLog | undefined>) {
      state.timelog = action.payload ?? timelogInitialState;
    },
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
      if (action.payload) {
        state.timelog = { ...state.timelog, employeeId: action.payload?.id };
      }
    },
    updateTimelog(state, action: PayloadAction<CustomReturn>) {
      state.timelog = {
        ...state.timelog,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.timelog = timelogInitialState;
        state.employee = undefined;
      }
    },
  },
});

export default timelogModalSlice.reducer;
export const timelogModalActions = timelogModalSlice.actions;
