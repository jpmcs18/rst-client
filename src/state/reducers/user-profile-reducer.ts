import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModuleRight from '../../models/entities/ModuleRight';
import SystemUser from '../../models/entities/SystemUser';
import {
  clearSession,
  getIsKiosk,
  getSessionAccess,
  getSessionProfile,
  getToken,
  saveIsKiosk,
  saveSessionAccess,
  saveSessionProfile,
} from '../../repositories/session-managers';
import { _UserType } from '../../constant';

interface State {
  authorize: boolean | undefined;
  systemUser: SystemUser | undefined;
  isAdmin: boolean;
  isKiosk: boolean;
  moduleRights: ModuleRight[];
  module: number[];
}

const initialState: State = {
  authorize: undefined,
  systemUser: undefined,
  isAdmin: false,
  isKiosk: false,
  moduleRights: [],
  module: [],
};

const userProfileSlice = createSlice({
  name: 'user-profile',
  initialState: initialState,
  reducers: {
    initializeState(state) {
      var token = getToken();
      if (token?.token !== undefined) {
        state.authorize = true;
        state.systemUser = getSessionProfile();
        var access = getSessionAccess() ?? [];
        state.moduleRights = access;
        state.module =
          access
            .map((x) => x.moduleId ?? 0)
            .filter((x, y, z) => z.indexOf(x) === y) ?? [];
        state.isAdmin =
          state.systemUser?.userTypeId === (_UserType.GeneralAdmin as number) ||
          state.systemUser?.userTypeId === (_UserType.BranchAdmin as number);
        state.isKiosk = getIsKiosk() ?? false;
      } else {
        state.systemUser = undefined;
        state.isAdmin = false;
        state.isKiosk = false;
        state.authorize = false;
        state.module = [];
        state.moduleRights = [];
        clearSession();
      }
    },
    setProfile(state, action: PayloadAction<SystemUser>) {
      state.systemUser = action.payload;
      state.isAdmin =
        state.systemUser?.userTypeId === (_UserType.GeneralAdmin as number) ||
        state.systemUser?.userTypeId === (_UserType.BranchAdmin as number);
      saveSessionProfile(action.payload);
    },
    setAuthorize(state, action: PayloadAction<boolean>) {
      state.authorize = action.payload;
      if (!action.payload) {
        state.systemUser = undefined;
        state.authorize = false;
        state.module = [];
        state.moduleRights = [];
        state.isAdmin = false;
        state.isKiosk = false;
        clearSession();
      }
    },
    setAccess(state, action: PayloadAction<ModuleRight[]>) {
      state.moduleRights = action.payload;
      state.module =
        action.payload
          .map((x) => x.moduleId ?? 0)
          .filter((x, y, z) => z.indexOf(x) === y) ?? [];

      saveSessionAccess(action.payload);
    },
    setIsKiosk(state, action: PayloadAction<boolean>) {
      state.isKiosk = action.payload;
      saveIsKiosk(action.payload);
    },
    clearProfile(state) {
      state.systemUser = undefined;
      state.authorize = false;
      state.module = [];
      state.moduleRights = [];
      state.isAdmin = false;
      state.isKiosk = false;

      clearSession();
    },
  },
});

export default userProfileSlice.reducer;
export const userProfileAction = userProfileSlice.actions;
