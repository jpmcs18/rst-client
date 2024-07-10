import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import WorkingSchedule from '../../models/entities/WorkingSchedule';

interface State extends Searchable {
  workingSchedules: WorkingSchedule[];
  selectedWorkingSchedule: WorkingSchedule | undefined;
}
const initialState: State = {
  workingSchedules: [],
  selectedWorkingSchedule: undefined,
  key: '',
  currentPage: 1,
  itemCount: 10,
  pageCount: 0,
  initiateSearch: true,
};

const workingScheduleSlice = createSlice({
  name: 'working-schedule',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<WorkingSchedule[]>) {
      state.workingSchedules = action.payload;
      state.selectedWorkingSchedule = undefined;
    },
    setSelected(state, action: PayloadAction<WorkingSchedule | undefined>) {
      state.selectedWorkingSchedule = action.payload;
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
  },
});

export default workingScheduleSlice.reducer;
export const workingScheduleActions = workingScheduleSlice.actions;
