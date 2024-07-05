import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  amount: number;
  payment: number;
  change: number;
  isModalShow: boolean;
  onProceed: () => void;
}
const initialState: State = {
  amount: 0,
  payment: 0,
  change: 0,
  isModalShow: false,
  onProceed: () => {},
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState,
  reducers: {
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload;
    },
    setPayment(state, action: PayloadAction<number>) {
      state.payment = action.payload;
      state.change = state.amount - state.payment;
    },
    setOnProceed(state, action: PayloadAction<() => void>) {
      state.onProceed = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.amount = 0;
        state.payment = 0;
        state.change = 0;
        state.onProceed = () => {};
      }
    },
  },
});

export default paymentSlice.reducer;
export const paymentActions = paymentSlice.actions;
