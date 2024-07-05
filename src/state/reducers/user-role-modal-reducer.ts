import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Module from '../../models/entities/Module';
import UserRole from '../../models/entities/UserRole';

interface State {
  userRole: UserRole;
  modules: Module[];
  isModalShow: boolean;
}

const userRoleInitialState: UserRole = {
  id: 0,
  description: '',
  accesses: [],
};

const initialState: State = {
  userRole: userRoleInitialState,
  modules: [],
  isModalShow: false,
};

const userRoleModalSlice = createSlice({
  name: 'userRole-modal',
  initialState: initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<UserRole | undefined>) {
      state.userRole = action.payload ?? userRoleInitialState;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setModules(state, action: PayloadAction<Module[]>) {
      state.modules = action.payload.map((module) => {
        module.moduleRights =
          module.moduleRights?.map((moduleRight) => {
            moduleRight.isCheck = !!state.userRole.accesses
              ?.slice()
              .filter((access) => access.moduleRightId === moduleRight.id)
              .length;
            return moduleRight;
          }) ?? [];

        module.isCheck = !!module.moduleRights?.filter((x) => x.isCheck).length;
        return module;
      });
    },
    checkModule(state, action: PayloadAction<number>) {
      state.modules = state.modules.slice().map((module) => {
        if (module.id === action.payload) {
          module.isCheck = !module.isCheck;
          module.moduleRights = module.moduleRights?.map((moduleRights) => {
            moduleRights.isCheck = module.isCheck;
            return moduleRights;
          });
        }
        return module;
      });
    },
    checkModuleRight(
      state,
      action: PayloadAction<{ moduleId: number; moduleRightId: number }>
    ) {
      state.modules = state.modules.slice().map((module) => {
        if (module.id === action.payload.moduleId) {
          module.moduleRights = module.moduleRights?.map((moduleRight) => {
            if (moduleRight.id === action.payload.moduleRightId)
              moduleRight.isCheck = !moduleRight.isCheck;
            return moduleRight;
          });
          module.isCheck = !!module.moduleRights?.filter((x) => x.isCheck)
            .length;
        }
        return module;
      });
    },
  },
});

export default userRoleModalSlice.reducer;
export const userRoleModalActions = userRoleModalSlice.actions;
