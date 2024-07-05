import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import CustomReturn from '../../models/client-model/CustomReturn';
import Employee from '../../models/entities/Employee';
import SystemUser from '../../models/entities/SystemUser';
import UserAccess from '../../models/entities/UserAccess';
import UserRole from '../../models/entities/UserRole';
import UserType from '../../models/entities/UserType';

interface State {
  systemUser: SystemUser;
  userRoles: UserRole[];
  employees: Employee[];
  newUserRole: number[];
  deletedUserAccess: number[];
  userAccesses: UserAccess[];
  userTypes: UserType[];
  isModalShow: boolean;
}

const systemUserInitialState: SystemUser = {
  id: 0,
  username: '',
  isActive: true,
  userTypeId: 0,
  displayName: '',
  employeeId: undefined,
  employee: undefined,
  userAccesses: [],
};

const initialState: State = {
  systemUser: systemUserInitialState,
  userRoles: [],
  employees: [],
  isModalShow: false,
  newUserRole: [],
  deletedUserAccess: [],
  userTypes: [],
  userAccesses: [],
};

const systemUserModalSlice = createSlice({
  name: 'system-user-modal',
  initialState: initialState,
  reducers: {
    setSystemUser(state, action: PayloadAction<SystemUser | undefined>) {
      state.systemUser = action.payload ?? systemUserInitialState;
      state.newUserRole = [];
      state.deletedUserAccess = [];
      state.userAccesses =
        state.systemUser.userAccesses
          ?.slice()
          ?.map((x) => {
            return { ...x, tempId: Guid.create().toString(), deleted: false };
          })
          .sort((a, b) =>
            a.userRole!.description! < b.userRole!.description! ? -1 : 1
          ) ?? [];
    },
    updateSystemUser(state, action: PayloadAction<CustomReturn>) {
      state.systemUser = {
        ...state.systemUser,
        [action.payload.elementName]: action.payload.value,
      };
      if (action.payload.elementName === 'userTypeId') {
        state.systemUser = {
          ...state.systemUser,
          userType: state.userTypes
            .slice()
            .filter((x) => x.id === +action.payload.value)?.[0],
        };
        console.log(state.systemUser.userType?.needsAccess);
      }
    },
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setUserRoles(state, action: PayloadAction<UserRole[]>) {
      state.userRoles = action.payload.filter((x) => {
        return !state.systemUser.userAccesses?.filter(
          (y) => y.userRoleId === x.id
        ).length;
      });
    },
    setUserTypes(state, action: PayloadAction<UserType[]>) {
      state.userTypes = action.payload;
    },
    addNewUserRole(state, action: PayloadAction<string>) {
      state.newUserRole.push(+action.payload);
      state.userAccesses.push({
        userId: state.systemUser.id,
        userRole: state.userRoles.filter((x) => x.id === +action.payload)[0],
        userRoleId: +action.payload,
        id: 0,
        tempId: Guid.create().toString(),
        deleted: false,
      });
      state.userRoles = state.userRoles.filter((x) => x.id !== +action.payload);
    },
    deleteUserAccess(state, action: PayloadAction<UserAccess>) {
      if (action.payload.id > 0) {
        state.deletedUserAccess.push(action.payload.id);
        state.userAccesses = state.userAccesses.map((x) => {
          if (x.id === action.payload.id) {
            x.deleted = true;
          }
          return x;
        });
      } else {
        state.userAccesses = state.userAccesses.filter(
          (x) => x.tempId !== action.payload.tempId
        );
        state.newUserRole = state.newUserRole.filter(
          (x) => x !== action.payload.userRoleId
        );
      }
      state.userRoles.push(action.payload.userRole!);
      state.userRoles = state.userRoles
        .slice()
        .sort((a, b) => (a.description! < b.description! ? -1 : 1));
    },
    undoDeleteUserAccess(state, action: PayloadAction<number>) {
      state.userAccesses = state.userAccesses.map((x) => {
        if (x.id === action.payload) {
          x.deleted = false;
        }
        return x;
      });
    },
  },
});

export default systemUserModalSlice.reducer;
export const systemUserModalActions = systemUserModalSlice.actions;
