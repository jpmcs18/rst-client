import { UserRoleEnd } from '../endpoints';
import UserRole from '../models/entities/UserRole';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchUserRole(
  key: string,
  itemCount: number,
  page: number
): Promise<SearchResult<UserRole> | undefined> {
  var query = '?itemCount=' + itemCount + '&page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<UserRole>>(UserRoleEnd.Search + query);
}

export async function getUserRoles(): Promise<UserRole[] | undefined> {
  return await httpGet<UserRole[]>(UserRoleEnd.GetList);
}

export async function insertUserRole(
  description: string,
  moduleRightIds: number[]
): Promise<UserRole | undefined> {
  return await httpPost<UserRole>(UserRoleEnd.Insert, {
    description,
    moduleRightIds,
  });
}

export async function updateUserRole(
  id: number,
  description: string,
  moduleRightIds: number[]
): Promise<boolean | undefined> {
  return await httpPut(UserRoleEnd.Update + '/' + id, {
    description,
    moduleRightIds,
  });
}

export async function deleteUserRole(id: number): Promise<boolean | undefined> {
  return await httpDelete(UserRoleEnd.Delete + '/' + id);
}
