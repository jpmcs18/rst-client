import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import CustomReturn from '../../models/client-model/CustomReturn';
import Position from '../../models/entities/Position';
import Office from '../../models/entities/Office';
import OfficePosition from '../../models/entities/OfficePosition';

interface State {
  office: Office;
  positions: Position[];
  newPosition: number[];
  deletedPosition: number[];
  officePositions: OfficePosition[];
  isModalShow: boolean;
}

const officeInitialState: Office = {
  id: 0,
  abbreviation: '',
  description: '',
  positions: [],
};

const initialState: State = {
  office: officeInitialState,
  positions: [],
  newPosition: [],
  deletedPosition: [],
  officePositions: [],
  isModalShow: false,
};

const officeModalSlice = createSlice({
  name: 'office-modal',
  initialState: initialState,
  reducers: {
    setOffice(state, action: PayloadAction<Office | undefined>) {
      state.office = action.payload ?? officeInitialState;
      state.newPosition = [];
      state.deletedPosition = [];
      state.officePositions =
        state.office.positions
          ?.slice()
          ?.map((x) => {
            return { ...x, tempId: Guid.create().toString(), deleted: false };
          })
          .sort((a, b) =>
            a.position!.description! < b.position!.description! ? -1 : 1
          ) ?? [];
    },
    updateOffice(state, action: PayloadAction<CustomReturn>) {
      state.office = {
        ...state.office,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setPositions(state, action: PayloadAction<Position[]>) {
      state.positions = action.payload.filter((x) => {
        return !state.office.positions?.filter((y) => y.positionId === x.id)
          .length;
      });
    },
    addNewPosition(state, action: PayloadAction<string>) {
      state.newPosition.push(+action.payload);
      state.officePositions.push({
        officeId: state.office.id,
        position: state.positions.filter((x) => x.id === +action.payload)[0],
        positionId: +action.payload,
        id: 0,
        tempId: Guid.create().toString(),
        deleted: false,
      });
      state.positions = state.positions.filter((x) => x.id !== +action.payload);
    },
    deletePosition(state, action: PayloadAction<OfficePosition>) {
      if (action.payload.id > 0) {
        state.deletedPosition.push(action.payload.id);
        state.officePositions = state.officePositions.map((x) => {
          if (x.id === action.payload.id) {
            x.deleted = true;
          }
          return x;
        });
      } else {
        state.officePositions = state.officePositions.filter(
          (x) => x.tempId !== action.payload.tempId
        );
        state.newPosition = state.newPosition.filter(
          (x) => x !== action.payload.positionId
        );
      }
      state.positions.push(action.payload.position!);
      state.positions = state.positions
        .slice()
        .sort((a, b) => (a.description! < b.description! ? -1 : 1));
    },
    undoDeletePosition(state, action: PayloadAction<number>) {
      state.officePositions = state.officePositions.map((x) => {
        if (x.id === action.payload) {
          x.deleted = false;
        }
        return x;
      });
    },
  },
});

export default officeModalSlice.reducer;
export const officeModalActions = officeModalSlice.actions;
