import { ModuleEnd } from '../endpoints';
import Module from '../models/entities/Module';
import { httpGet } from './base';

export async function getModules(): Promise<Module[] | undefined> {
  return httpGet<Module[]>(ModuleEnd.GetList);
}
