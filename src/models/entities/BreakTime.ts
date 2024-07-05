export default interface BreakTime {
  id: number;
  scheduleId: number;
  description?: string;
  timeStart?: Date;
  totalBreakTimes?: number;
}
