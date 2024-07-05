import { UserTypeEnd } from '../endpoints';
import UserType from '../models/entities/UserType';
import { httpGet } from './base';

export async function getUserTypes(): Promise<UserType[] | undefined> {
  return await httpGet<UserType[]>(UserTypeEnd.GetList);
}
