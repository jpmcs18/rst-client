import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import UserRole from '../../models/entities/UserRole';

interface State extends Searchable {
  userRoles: UserRole[];
  selectedUserRole: UserRole | undefined;
}
const initialState: State = {
  userRoles: [],
  selectedUserRole: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  itemCount: 10,
};

const userRoleSlice = createSlice({
  name: 'userRole',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<UserRole[]>) {
      state.userRoles = action.payload;
      state.selectedUserRole = undefined;
    },
    setSelected(state, action: PayloadAction<UserRole | undefined>) {
      state.selectedUserRole = action.payload;
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

export default userRoleSlice.reducer;
export const userRoleActions = userRoleSlice.actions;
