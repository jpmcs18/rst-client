import { ModuleRightEnd } from '../endpoints';
import ModuleRight from '../models/entities/ModuleRight';
import { httpGet } from './base';

export async function getDistinctModuleRights(): Promise<
  ModuleRight[] | undefined
> {
  return httpGet<ModuleRight[]>(ModuleRightEnd.GetUserAccess);
}
