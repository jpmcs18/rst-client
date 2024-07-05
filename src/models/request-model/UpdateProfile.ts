import Employee from '../entities/Employee';

export default interface UpdateUserProfile {
  username: string;
  employee?: Employee | undefined;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
