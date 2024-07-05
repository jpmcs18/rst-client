import Employee from './Employee';

export default interface TimeLog {
  id: number;
  employeeId: number | undefined;
  login: Date | undefined;
  logout: Date | undefined;

  Employee?: Employee | undefined;
}
