import RoleAccess from './RoleAccess';

export default interface UserRole {
  id: number;
  description: string | undefined;
  accesses: RoleAccess[] | undefined;
}
