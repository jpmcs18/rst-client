import Employee from './Employee';
import UserAccess from './UserAccess';
import UserType from './UserType';

export default interface SystemUser {
  id: number;
  username: string | undefined;
  isActive: boolean;
  userTypeId: number;
  displayName: string;
  employeeId: number | undefined;
  employee: Employee | undefined;
  userAccesses: UserAccess[] | undefined;
  userType?: UserType | undefined;
}
