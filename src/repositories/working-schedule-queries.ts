import { WorkingScheduleEnd } from '../endpoints';
import WorkingSchedule from '../models/entities/WorkingSchedule';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchWorkingSchedule(
  key: string,
  itemCount: number,
  page: number
): Promise<SearchResult<WorkingSchedule> | undefined> {
  var query = '?itemCount=' + itemCount + '&page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<WorkingSchedule>>(
    WorkingScheduleEnd.Search + query
  );
}

export async function getWorkingSchedules(): Promise<
  WorkingSchedule[] | undefined
> {
  return await httpGet<WorkingSchedule[]>(WorkingScheduleEnd.GetList);
}

export async function insertWorkingSchedule(
  workingSchedule: WorkingSchedule
): Promise<WorkingSchedule | undefined> {
  return await httpPost<WorkingSchedule>(
    WorkingScheduleEnd.Insert,
    workingSchedule
  );
}

export async function updateWorkingSchedule(
  workingSchedule: WorkingSchedule
): Promise<boolean | undefined> {
  return await httpPut(
    WorkingScheduleEnd.Update + '/' + workingSchedule.id,
    workingSchedule
  );
}

export async function deleteWorkingSchedule(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(WorkingScheduleEnd.Delete + '/' + id);
}

export async function addWorkingScheduleEmployee(
  employeeIds: number[],
  workingScheduleId: number
): Promise<boolean | undefined> {
  return await httpPost(WorkingScheduleEnd.AddEmployee, {
    employeeIds,
    workingScheduleId,
  });
}

export async function deleteWorkingScheduleEmployee(
  employeeId: number,
  workingScheduleId: number
): Promise<boolean | undefined> {
  return await httpPost(WorkingScheduleEnd.DeleteEmployee, {
    employeeId,
    workingScheduleId,
  });
}
