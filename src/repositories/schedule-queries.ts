import { ScheduleEnd } from '../endpoints';
import Schedule from '../models/entities/Schedule';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchSchedule(
  key: string,
  page: number
): Promise<SearchResult<Schedule> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Schedule>>(ScheduleEnd.Search + query);
}

export async function getSchedulees(): Promise<Schedule[] | undefined> {
  return await httpGet<Schedule[]>(ScheduleEnd.GetList);
}

export async function insertSchedule(
  schedule: Schedule
): Promise<Schedule | undefined> {
  return await httpPost<Schedule>(ScheduleEnd.Insert, schedule);
}

export async function updateSchedule(
  schedule: Schedule
): Promise<boolean | undefined> {
  return await httpPut(ScheduleEnd.Update + '/' + schedule.id, schedule);
}

export async function deleteSchedule(id: number): Promise<boolean | undefined> {
  return await httpDelete(ScheduleEnd.Delete + '/' + id);
}