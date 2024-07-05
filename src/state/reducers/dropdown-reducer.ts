import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  openDropdown: string | undefined;
}

const initialState: State = {
  openDropdown: undefined,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: initialState,
  reducers: {
    setOpenDropdown(state, action: PayloadAction<string | undefined>) {
      state.openDropdown = action.payload;
    },
  },
});

export default dropdownSlice.reducer;
export const dropdownActions = dropdownSlice.actions;
