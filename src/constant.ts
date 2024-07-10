export const API =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV
    : window.location.protocol === 'http:'
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_SECURED_PROD;
export const AppName = 'RST';
export const APP_SECRET = process.env.REACT_APP_SECRET_KEY;

export const Pages = {
  Employees: 'Employees',
  Branches: 'Branches',
  Offices: 'Offices',
  Positions: 'Positions',
  SystemUsers: 'Users',
  UserRoles: 'User Roles',
  ModeOfPayments: 'Mode Of Payments',
  TimelogReports: 'Timelog Reports',
  Schedules: 'Schedules',
  WorkingSchedules: 'Working Schedules',
  TimeLogs: 'Time Logs',
};

export enum _Direction {
  Ascending = 1,
  Descending = 2,
}

export enum _UserType {
  GeneralAdmin = 1,
  BranchAdmin = 2,
  User = 3,
}
