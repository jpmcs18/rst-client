import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Position from '../../models/entities/Position';
import Employee from '../../models/entities/Employee';
import Office from '../../models/entities/Office';
import Branch from '../../models/entities/Branch';

interface State {
  employee: Employee;
  offices: Office[];
  positions: Position[];
  branches: Branch[];
  allPositions: Position[];
  isModalShow: boolean;
}

const employeeInitialState: Employee = {
  id: 0,
  firstName: '',
  lastName: '',
  middleName: '',
  extension: '',
  fullName: '',
  officeId: undefined,
  positionId: undefined,
};

const initialState: State = {
  employee: employeeInitialState,
  offices: [],
  positions: [],
  allPositions: [],
  branches: [],
  isModalShow: false,
};

const employeeModalSlice = createSlice({
  name: 'employee-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload ?? employeeInitialState;
    },
    updateEmployee(state, action: PayloadAction<CustomReturn>) {
      state.employee = {
        ...state.employee,
        [action.payload.elementName]: action.payload.value,
      };
    },
    updateOffice(state, action: PayloadAction<string>) {
      let office = state.offices
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        officeId: office.id,
        positionId: undefined,
      };
      state.positions =
        office.positions?.map((x) => x.position!) ?? state.allPositions.slice();
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;

      state.positions =
        action.payload
          .filter((x) => x.id === state.employee.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? [];
    },
    setPositions(state, action: PayloadAction<Position[]>) {
      state.allPositions = action.payload;
    },
    setBranches(state, action: PayloadAction<Branch[]>) {
      state.branches = action.payload;
    },
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
