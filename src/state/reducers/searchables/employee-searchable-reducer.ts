import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../../models/client-model/Searchable';
import Employee from '../../../models/entities/Employee';

interface State extends Searchable {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  isModalShow: boolean;
  onCloseFunction: ((employee?: Employee) => void) | undefined;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
  key: '',
  currentPage: 1,
  itemCount: 10,
  pageCount: 0,
  initiateSearch: false,
  isModalShow: false,
  onCloseFunction: undefined,
};

const employeeSearchableSlice = createSlice({
  name: 'employee-searchable',
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
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      state.employees = [];
      state.selectedEmployee = undefined;
    },
    setOnCloseFunction(
      state,
      action: PayloadAction<(employee?: Employee) => void>
    ) {
      state.onCloseFunction = action.payload;
    },
  },
});

export default employeeSearchableSlice.reducer;
export const employeeSearchableActions = employeeSearchableSlice.actions;
