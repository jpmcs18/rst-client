import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Branch from '../../models/entities/Branch';
import CustomReturn from '../../models/client-model/CustomReturn';

interface State {
  branch: Branch;
  isModalShow: boolean;
}
const branchInitialState = { id: 0, description: '' };
const initialState: State = {
  branch: branchInitialState,
  isModalShow: false,
};

const branchModalSlice = createSlice({
  name: 'branch-modal',
  initialState: initialState,
  reducers: {
    setBranch(state, action: PayloadAction<Branch | undefined>) {
      state.branch = action.payload ?? branchInitialState;
    },
    updateBranch(state, action: PayloadAction<CustomReturn>) {
      state.branch = {
        ...state.branch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default branchModalSlice.reducer;
export const branchModalActions = branchModalSlice.actions;
