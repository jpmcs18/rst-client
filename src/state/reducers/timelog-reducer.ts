import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';
import TimeLog from '../../models/entities/TimeLog';

interface State extends Searchable {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  timelogs: TimeLog[] | undefined;
  selectedTimelog: TimeLog | undefined;
  start: Date | undefined;
  end: Date | undefined;
  refreshTimelogs: boolean;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
  timelogs: undefined,
  selectedTimelog: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  start: undefined,
  end: undefined,
  refreshTimelogs: false,
  itemCount: 10,
};

const timelogSlice = createSlice({
  name: 'timelog',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
      state.selectedTimelog = undefined;
      state.timelogs = [];
    },
    setStart(state, action: PayloadAction<Date | undefined>) {
      state.start = action.payload;
    },
    setEnd(state, action: PayloadAction<Date | undefined>) {
      state.end = action.payload;
    },
    setTimeLog(state, action: PayloadAction<TimeLog[] | undefined>) {
      state.timelogs = action.payload;
    },
    setSelected(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
      state.selectedTimelog = undefined;
    },
    setSelectedTimelog(state, action: PayloadAction<TimeLog | undefined>) {
      state.selectedTimelog = action.payload;
    },
    setkey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      state.initiateSearch = true;
    },
    setItemCount(state, action: PayloadAction<number>) {
      state.itemCount = action.payload;
      state.initiateSearch = true;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
    setRefreshTimelog(state, action: PayloadAction<boolean>) {
      state.refreshTimelogs = action.payload;
      state.selectedTimelog = undefined;
    },
  },
});

export default timelogSlice.reducer;
export const timelogActions = timelogSlice.actions;
