import { SystemUserEnd } from '../endpoints';
import SystemUser from '../models/entities/SystemUser';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function saveProfile(
  username: string,
  password: string | null | undefined,
  newPassword: string | null | undefined
): Promise<boolean | undefined> {
  return await httpPost(SystemUserEnd.SaveProfile, {
    username,
    password,
    newPassword,
  });
}

export async function getData(): Promise<SystemUser | undefined> {
  return await httpGet<SystemUser>(SystemUserEnd.GetData);
}

export async function searchSystemUser(
  key: string,
  itemCount: number,
  page: number
): Promise<SearchResult<SystemUser> | undefined> {
  var query = '?itemCount=' + itemCount + '&page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<SystemUser>>(SystemUserEnd.Search + query);
}

export async function insertSystemUser(
  systemUser: SystemUser,
  userRoleIds: number[]
): Promise<SystemUser | undefined> {
  return await httpPost<SystemUser>(SystemUserEnd.Insert, {
    ...systemUser,
    userRoleIds,
  });
}

export async function updateSystemUser(
  systemUser: SystemUser,
  newUserRoleIds: number[],
  deletedUserAccessIds: number[]
): Promise<boolean | undefined> {
  return await httpPut(SystemUserEnd.Update + '/' + systemUser.id, {
    ...systemUser,
    newUserRoleIds,
    deletedUserAccessIds,
  });
}

export async function deleteSystemUser(
  id: number
): Promise<boolean | undefined> {
  return await httpDelete(SystemUserEnd.Delete + '/' + id);
}

export async function resetPassword(id: number): Promise<boolean | undefined> {
  return await httpPut(SystemUserEnd.ResetPassword + '/' + id);
}
