import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Position from '../../models/entities/Position';

interface State {
  position: Position;
  isModalShow: boolean;
}
const positionInitialState = { id: 0, description: '' };
const initialState: State = {
  position: positionInitialState,
  isModalShow: false,
};

const positionModalSlice = createSlice({
  name: 'position-modal',
  initialState: initialState,
  reducers: {
    setPosition(state, action: PayloadAction<Position | undefined>) {
      state.position = action.payload ?? positionInitialState;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default positionModalSlice.reducer;
export const positionModalActions = positionModalSlice.actions;
