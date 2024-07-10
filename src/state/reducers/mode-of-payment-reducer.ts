import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import ModeOfPayment from '../../models/entities/ModeOfPayment';

interface State extends Searchable {
  modeOfPayments: ModeOfPayment[];
  selectedModeOfPayment: ModeOfPayment | undefined;
}
const initialState: State = {
  modeOfPayments: [],
  selectedModeOfPayment: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  itemCount: 10,
};

const modeOfPaymentSlice = createSlice({
  name: 'mode-of-payment',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<ModeOfPayment[]>) {
      state.modeOfPayments = action.payload;
      state.selectedModeOfPayment = undefined;
    },
    setSelected(state, action: PayloadAction<ModeOfPayment | undefined>) {
      state.selectedModeOfPayment = action.payload;
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

export default modeOfPaymentSlice.reducer;
export const modeOfPaymentActions = modeOfPaymentSlice.actions;
