export default interface BreakTime {
  id: number;
  scheduleId: number;
  timeStart?: Date;
  timeEnd?: Date;
  totalBreakMinutes?: number;

  tempId?: string;
}
