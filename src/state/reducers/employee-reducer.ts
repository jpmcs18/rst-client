import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';

interface State extends Searchable {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
    },
    setSelected(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
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

export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
