import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Branch from '../../models/entities/Branch';

interface State extends Searchable {
  branchs: Branch[];
  selectedBranch: Branch | undefined;
}
const initialState: State = {
  branchs: [],
  selectedBranch: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  itemCount: 10,
};

const branchSlice = createSlice({
  name: 'branch',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Branch[]>) {
      state.branchs = action.payload;
      state.selectedBranch = undefined;
    },
    setSelected(state, action: PayloadAction<Branch | undefined>) {
      state.selectedBranch = action.payload;
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

export default branchSlice.reducer;
export const branchActions = branchSlice.actions;
