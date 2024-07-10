import Employee from './Employee';

export default interface EmployeeSchedule {
  id: number;
  employeeId: number;
  workingScheduleId: number;

  employee?: Employee;
}
