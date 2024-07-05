import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../../models/client-model/Searchable';
import Office from '../../../models/entities/Office';

interface State extends Searchable {
  offices: Office[];
  selectedOffice: Office | undefined;
  isModalShow: boolean;
}
const initialState: State = {
  offices: [],
  selectedOffice: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
  isModalShow: false,
};

const officeSearchableSlice = createSlice({
  name: 'office-searchable',
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
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      state.offices = [];
      state.selectedOffice = undefined;
    },
  },
});

export default officeSearchableSlice.reducer;
export const officeSearchableActions = officeSearchableSlice.actions;
