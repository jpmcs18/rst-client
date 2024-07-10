import { EmployeeEnd } from '../endpoints';
import Employee from '../models/entities/Employee';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchEmployee(
  key: string,
  itemCount: number,
  page: number
): Promise<SearchResult<Employee> | undefined> {
  var query = '?itemCount=' + itemCount + '&page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Employee>>(EmployeeEnd.Search + query);
}

export async function searchEmployeeNotInWorkSchedule(
  key: string,
  workingScheduleId: number,
  itemCount: number,
  page: number
): Promise<SearchResult<Employee> | undefined> {
  var query =
    '?itemCount=' +
    itemCount +
    '&page=' +
    page +
    '&workingScheduleId=' +
    workingScheduleId;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Employee>>(
    EmployeeEnd.SearchNotInWorkSchedule + query
  );
}

export async function searchEmployeeInWorkSchedule(
  key: string,
  workingScheduleId: number,
  itemCount: number,
  page: number
): Promise<SearchResult<Employee> | undefined> {
  var query =
    '?itemCount=' +
    itemCount +
    '&page=' +
    page +
    '&workingScheduleId=' +
    workingScheduleId;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Employee>>(
    EmployeeEnd.SearchInWorkSchedule + query
  );
}

export async function getEmployees(): Promise<Employee[] | undefined> {
  return await httpGet<Employee[]>(EmployeeEnd.GetList);
}

export async function insertEmployee(
  employee: Employee
): Promise<Employee | undefined> {
  return await httpPost<Employee>(EmployeeEnd.Insert, employee);
}

export async function updateEmployee(
  employee: Employee
): Promise<boolean | undefined> {
  return await httpPut(EmployeeEnd.Update + '/' + employee.id, employee);
}

export async function deleteEmployee(id: number): Promise<boolean | undefined> {
  return await httpDelete(EmployeeEnd.Delete + '/' + id);
}
