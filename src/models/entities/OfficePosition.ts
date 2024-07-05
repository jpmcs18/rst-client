import Position from './Position';

export default interface OfficePosition {
  id: number;
  officeId: number;
  positionId: number;
  position: Position | undefined;

  tempId: string;
  deleted?: boolean;
}
