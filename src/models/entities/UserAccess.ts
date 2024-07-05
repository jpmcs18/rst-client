import UserRole from './UserRole';

export default interface UserAccess {
  id: number;
  userId: number | undefined;
  userRoleId: number | undefined;
  userRole: UserRole | undefined;
  tempId?: string | undefined;
  deleted?: boolean | undefined;
}
