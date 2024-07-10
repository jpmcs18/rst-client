import { configureStore } from '@reduxjs/toolkit';
import positionModalReducer from './reducers/position-modal-reducer';
import positionReducer from './reducers/position-reducer';
import employeeModalReducer from './reducers/employee-modal-reducer';
import employeeReducer from './reducers/employee-reducer';
import employeeSearchableReducer from './reducers/searchables/employee-searchable-reducer';
import officeModalReducer from './reducers/office-modal-reducer';
import officeReducer from './reducers/office-reducer';
import officeSearchableReducer from './reducers/searchables/office-searchable-reducer';
import systemUserModalReducer from './reducers/system-user-modal-reducer';
import systemUserReducer from './reducers/system-user-reducer';
import userProfileReducer from './reducers/user-profile-reducer';
import userRoleModalReducer from './reducers/user-role-modal-reducer';
import userRoleReducer from './reducers/user-role-reducer';
import reportModalReducer from './reducers/report-modal-reducer';
import modeOfPaymentReducer from './reducers/mode-of-payment-reducer';
import modeOfPaymentModalReducer from './reducers/mode-of-payment-modal-reducer';
import dropdownReducer from './reducers/dropdown-reducer';
import paymentReducer from './reducers/payment-reducer';
import timelogReducer from './reducers/timelog-reducer';
import timelogModalReducer from './reducers/timelog-modal-reducer';
import branchReducer from './reducers/branch-reducer';
import branchModalReducer from './reducers/branch-modal-reducer';
import scheduleReducer from './reducers/schedule-reducer';
import scheduleModalReducer from './reducers/schedule-modal-reducer';
import workingScheduleReducer from './reducers/working-schedule-reducer';
import workingScheduleModalReducer from './reducers/working-schedule-modal-reducer';
import employeeScheduleModalReducer from './reducers/employee-schedule-modal-reducer';
const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    employeeSearchable: employeeSearchableReducer,
    officeSearchable: officeSearchableReducer,
    userProfile: userProfileReducer,
    employee: employeeReducer,
    employeeModal: employeeModalReducer,
    position: positionReducer,
    positionModal: positionModalReducer,
    office: officeReducer,
    officeModal: officeModalReducer,
    userRole: userRoleReducer,
    userRoleModal: userRoleModalReducer,
    systemUser: systemUserReducer,
    systemUserModal: systemUserModalReducer,
    reportModal: reportModalReducer,
    modeOfPayment: modeOfPaymentReducer,
    modeOfPaymentModal: modeOfPaymentModalReducer,
    payment: paymentReducer,
    timelog: timelogReducer,
    timelogModal: timelogModalReducer,
    branch: branchReducer,
    branchModal: branchModalReducer,
    schedule: scheduleReducer,
    scheduleModal: scheduleModalReducer,
    workingSchedule: workingScheduleReducer,
    workingScheduleModal: workingScheduleModalReducer,
    employeeScheduleModal: employeeScheduleModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
