import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import SystemUser from '../../models/entities/SystemUser';

interface State extends Searchable {
  systemUsers: SystemUser[];
  selectedSystemUser: SystemUser | undefined;
}
const initialState: State = {
  systemUsers: [],
  selectedSystemUser: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  itemCount: 10,
};

const systemUserSlice = createSlice({
  name: 'system-user',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<SystemUser[]>) {
      state.systemUsers = action.payload;
      state.selectedSystemUser = undefined;
    },
    setSelected(state, action: PayloadAction<SystemUser | undefined>) {
      state.selectedSystemUser = action.payload;
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

export default systemUserSlice.reducer;
export const systemUserActions = systemUserSlice.actions;
