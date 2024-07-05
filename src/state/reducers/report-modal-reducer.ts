import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  pdfBase64: string;
  reportTitle: string;
  isModalShow: boolean;
}

const initialState: State = {
  pdfBase64: '',
  reportTitle: '',
  isModalShow: false,
};

const reportModalSlice = createSlice({
  name: 'report-modal',
  initialState: initialState,
  reducers: {
    setReport(state, action: PayloadAction<string>) {
      state.pdfBase64 = action.payload;
    },
    setReportTitle(state, action: PayloadAction<string>) {
      state.reportTitle = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.pdfBase64 = '';
        state.reportTitle = '';
      }
    },
  },
});

export default reportModalSlice.reducer;
export const reportModalActions = reportModalSlice.actions;
