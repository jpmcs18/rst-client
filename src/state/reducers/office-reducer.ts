import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Office from '../../models/entities/Office';

interface State extends Searchable {
  offices: Office[];
  selectedOffice: Office | undefined;
}
const initialState: State = {
  offices: [],
  selectedOffice: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  itemCount: 10,
};

const officeSlice = createSlice({
  name: 'office',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
      state.selectedOffice = undefined;
    },
    setSelected(state, action: PayloadAction<Office | undefined>) {
      state.selectedOffice = action.payload;
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

export default officeSlice.reducer;
export const officeActions = officeSlice.actions;
