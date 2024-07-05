import ModuleRight from './ModuleRight';

export default interface RoleAccess {
  id: number;
  userRoleId: number | undefined;
  moduleRightId: number | undefined;
  moduleRight: ModuleRight | undefined;
}
