import BreakTime from './BreakTime';

export default interface Schedule {
  id: number;
  description?: string;
  timeStart?: Date;
  timeEnd?: Date;
  totalWorkingHours?: number;

  breakTimes?: BreakTime[];
}
