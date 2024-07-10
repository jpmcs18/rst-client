import Schedule from './Schedule';

export default interface WorkingSchedule {
  id: number;
  sundayScheduleId: number | undefined;
  mondayScheduleId: number | undefined;
  tuesdayScheduleId: number | undefined;
  wednesdayScheduleId: number | undefined;
  thursdayScheduleId: number | undefined;
  fridayScheduleId: number | undefined;
  saturdayScheduleId: number | undefined;
  employees: number | undefined;

  sundaySchedule?: Schedule;
  mondaySchedule?: Schedule;
  tuesdaySchedule?: Schedule;
  wednesdaySchedule?: Schedule;
  thursdaySchedule?: Schedule;
  fridaySchedule?: Schedule;
  saturdaySchedule?: Schedule;
}
