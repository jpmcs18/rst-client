import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Schedule from '../../models/entities/Schedule';

interface State extends Searchable {
  schedules: Schedule[];
  selectedSchedule: Schedule | undefined;
}
const initialState: State = {
  schedules: [],
  selectedSchedule: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Schedule[]>) {
      state.schedules = action.payload;
      state.selectedSchedule = undefined;
    },
    setSelected(state, action: PayloadAction<Schedule | undefined>) {
      state.selectedSchedule = action.payload;
    },
    setkey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default scheduleSlice.reducer;
export const scheduleActions = scheduleSlice.actions;
