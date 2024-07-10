import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';
import WorkingSchedule from '../../models/entities/WorkingSchedule';

interface State {
  workingSchedule: WorkingSchedule | undefined;
  employeeSchedules: Employee[];
  employees: Employee[];
  employeeSearch: Searchable;
  employeeScheduleSearch: Searchable;
  isModalShow: boolean;
}

const initialState: State = {
  workingSchedule: undefined,
  isModalShow: false,
  employees: [],
  employeeSchedules: [],
  employeeSearch: {
    currentPage: 1,
    pageCount: 0,
    key: '',
    itemCount: 10,
    initiateSearch: false,
  },
  employeeScheduleSearch: {
    currentPage: 1,
    pageCount: 0,
    key: '',
    itemCount: 10,
    initiateSearch: false,
  },
};

const employeeScheduleModalSlice = createSlice({
  name: 'employee-schedule-modal',
  initialState: initialState,
  reducers: {
    setWorkingSchedule(
      state,
      action: PayloadAction<WorkingSchedule | undefined>
    ) {
      state.workingSchedule = action.payload;
    },
    setEmployees(state, action: PayloadAction<Employee[] | undefined>) {
      state.employees = action.payload ?? [];
    },
    setEmployeeCheckChange(state, action: PayloadAction<number>) {
      state.employees = state.employees.slice().map((x) => {
        if (x.id === +action.payload) {
          x.isChecked = !x.isChecked;
        }
        return x;
      });
    },
    setEmployeeSchedules(state, action: PayloadAction<Employee[] | undefined>) {
      state.employeeSchedules = action.payload ?? [];
    },
    setEmployeeSearch(state, action: PayloadAction<CustomReturn>) {
      state.employeeSearch = {
        ...state.employeeSearch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setEmployeeScheduleSearch(state, action: PayloadAction<CustomReturn>) {
      state.employeeScheduleSearch = {
        ...state.employeeScheduleSearch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default employeeScheduleModalSlice.reducer;
export const employeeScheduleModalActions = employeeScheduleModalSlice.actions;
