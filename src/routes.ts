import { Pages } from './constant';
import ModuleHead from './models/client-model/ModuleHead';
import ModuleRoute from './models/client-model/ModuleRoute';

export const SystemModules: ModuleRoute[] = [
  { route: '/' },
  { route: '/dashboard' },
  {
    id: 1,
    pageName: Pages.Branches,
    route: '/branches',
    display: true,
  },
  {
    id: 11,
    pageName: Pages.Offices,
    route: '/offices',
    display: true,
  },
  {
    id: 21,
    pageName: Pages.Positions,
    route: '/positions',
    display: true,
  },
  {
    id: 31,
    pageName: Pages.Employees,
    route: '/employees',
    display: true,
  },
  {
    id: 41,
    pageName: Pages.SystemUsers,
    route: '/users',
    display: true,
  },
  {
    id: 51,
    pageName: Pages.UserRoles,
    route: '/user-roles',
    display: true,
  },
  {
    id: 61,
    pageName: Pages.Schedules,
    route: '/schedules',
    display: true,
  },
  {
    id: 71,
    pageName: Pages.EmployeeSchedules,
    route: '/employee-schedules',
    display: true,
  },
  {
    id: 81,
    pageName: Pages.TimeLogs,
    route: '/timelogs',
    display: true,
  },
  {
    id: 91,
    pageName: Pages.TimelogReports,
    route: '/timelog-report',
    display: true,
  },
];

export const HeadModules: ModuleHead[] = [
  {
    title: 'Admin',
    moduleIds: [41, 51],
  },
  {
    title: 'HR',
    moduleIds: [1, 11, 21, 31, 61, 71, 81, 91],
  },
];
