import { BranchEnd } from '../endpoints';
import Branch from '../models/entities/Branch';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchBranch(
  key: string,
  page: number
): Promise<SearchResult<Branch> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Branch>>(BranchEnd.Search + query);
}

export async function getBranches(): Promise<Branch[] | undefined> {
  return await httpGet<Branch[]>(BranchEnd.GetList);
}

export async function insertBranch(
  branch: Branch
): Promise<Branch | undefined> {
  return await httpPost<Branch>(BranchEnd.Insert, branch);
}

export async function updateBranch(
  branch: Branch
): Promise<boolean | undefined> {
  return await httpPut(BranchEnd.Update + '/' + branch.id, branch);
}

export async function deleteBranch(id: number): Promise<boolean | undefined> {
  return await httpDelete(BranchEnd.Delete + '/' + id);
}
