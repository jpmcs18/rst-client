import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SystemModules } from '../routes';
import Dashboard from './dashboard';
import { getModuleByPageName } from '../helper';
import { Pages } from '../constant';
import EmployeePage from './components/employee-components/employee-page';
import PositionPage from './components/position-components/position-page';
import OfficePage from './components/office-components/office-page';
import SystemUserPage from './components/system-user-component/system-user-page';
import UserRolePage from './components/user-role-component/user-role-page';
import TimeLogPage from './components/timelog-components/timelog-page';
import TimelogReportPage from './components/timelog-report-components/timelog-report-page';
import BranchPage from './components/branch-components/branch-page';
import SchedulePage from './components/schedule-components/schedule-page';
import WorkingSchedulePage from './components/working-schedule-components/working-schedule-page';

export default function PageRoutes() {
  const userProfileState = useSelector((state: RootState) => state.userProfile);
  return (
    <Routes>
      <Route
        path={SystemModules[0].route}
        element={<Navigate to={SystemModules[1].route!} replace />}
      />
      <Route path={SystemModules[1].route} element={<Dashboard />} />

      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.Employees).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.Employees).route}
          element={<EmployeePage />}
        />
      )}

      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.Positions).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.Positions).route}
          element={<PositionPage />}
        />
      )}

      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.Offices).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.Offices).route}
          element={<OfficePage />}
        />
      )}

      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.SystemUsers).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.SystemUsers).route}
          element={<SystemUserPage />}
        />
      )}

      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.UserRoles).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.UserRoles).route}
          element={<UserRolePage />}
        />
      )}

      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.TimeLogs).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.TimeLogs).route}
          element={<TimeLogPage />}
        />
      )}
      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.TimelogReports).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.TimelogReports).route}
          element={<TimelogReportPage />}
        />
      )}
      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.Branches).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.Branches).route}
          element={<BranchPage />}
        />
      )}
      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.Schedules).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.Schedules).route}
          element={<SchedulePage />}
        />
      )}
      {(!!userProfileState.module.filter(
        (x) => x === getModuleByPageName(Pages.WorkingSchedules).id
      ).length ||
        userProfileState.isAdmin) && (
        <Route
          path={getModuleByPageName(Pages.WorkingSchedules).route}
          element={<WorkingSchedulePage />}
        />
      )}
      <Route
        path='*'
        element={<Navigate to={SystemModules[0].route!} replace />}
      />
    </Routes>
  );
}
