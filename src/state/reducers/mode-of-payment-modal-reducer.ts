import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import ModeOfPayment from '../../models/entities/ModeOfPayment';

interface State {
  modeOfPayment: ModeOfPayment;
  isModalShow: boolean;
}
const modeOfPaymentInitialState: ModeOfPayment = { id: 0, description: '' };
const initialState: State = {
  modeOfPayment: modeOfPaymentInitialState,
  isModalShow: false,
};

const modeOfPaymentModalSlice = createSlice({
  name: 'mode-of-payment-modal',
  initialState: initialState,
  reducers: {
    setModeOfPayment(state, action: PayloadAction<ModeOfPayment | undefined>) {
      state.modeOfPayment = action.payload ?? modeOfPaymentInitialState;
    },
    updateModeOfPayment(state, action: PayloadAction<CustomReturn>) {
      state.modeOfPayment = {
        ...state.modeOfPayment,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      console.log(action.payload);
    },
  },
});

export default modeOfPaymentModalSlice.reducer;
export const modeOfPaymentModalActions = modeOfPaymentModalSlice.actions;
