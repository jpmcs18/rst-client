import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Position from '../../models/entities/Position';

interface State extends Searchable {
  positions: Position[];
  selectedPosition: Position | undefined;
}
const initialState: State = {
  positions: [],
  selectedPosition: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  itemCount: 10,
};

const positionSlice = createSlice({
  name: 'position',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Position[]>) {
      state.positions = action.payload;
      state.selectedPosition = undefined;
    },
    setSelected(state, action: PayloadAction<Position | undefined>) {
      state.selectedPosition = action.payload;
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

export default positionSlice.reducer;
export const positionActions = positionSlice.actions;
