import Position from './Position';
import Office from './Office';
import Branch from './Branch';

export default interface Employee {
  id: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  extension?: string;
  fullName?: string;
  officeId?: number;
  positionId?: number;
  branchId?: number;

  office?: Office;
  position?: Position;
  branch?: Branch;
}
