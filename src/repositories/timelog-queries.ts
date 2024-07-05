import { TimeLogEnd } from '../endpoints';
import { validateDate, dateToString } from '../helper';
import TimeLog from '../models/entities/TimeLog';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function getTimeLogs(
  employeeId: number,
  startDate: Date | undefined,
  endDate: Date | undefined
): Promise<TimeLog[] | undefined> {
  var query = '?employeeId=' + employeeId;
  if (validateDate(startDate)) {
    if (!!query) query += '&';
    query += 'startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    if (!!query) query += '&';
    query += 'endDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  return await httpGet<TimeLog[]>(TimeLogEnd.GetList + query);
}

export async function insertTimeLog(
  timelog: TimeLog
): Promise<TimeLog | undefined> {
  return await httpPost<TimeLog>(TimeLogEnd.Insert, timelog);
}

export async function updateTimeLog(
  timelog: TimeLog
): Promise<boolean | undefined> {
  return await httpPut(TimeLogEnd.Update + '/' + timelog.id, timelog);
}

export async function deleteTimeLog(id: number): Promise<boolean | undefined> {
  return await httpDelete(TimeLogEnd.Delete + '/' + id);
}

export async function getDTRReport(
  startDate: Date | undefined,
  endDate: Date | undefined,
  employeeId: number | undefined
): Promise<string | undefined> {
  var query = '?';
  if (validateDate(startDate)) {
    query += 'startDate=' + encodeURI(dateToString(startDate) ?? '');
  }
  if (validateDate(endDate)) {
    if (!!query) query += '&';
    query += 'endDate=' + encodeURI(dateToString(endDate) ?? '');
  }
  if (!!employeeId) {
    if (!!query) query += '&';
    query += 'employeeId=' + employeeId;
  }
  return httpGet<string>(TimeLogEnd.DTRReport + query);
}
