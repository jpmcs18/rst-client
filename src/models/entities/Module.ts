import ModuleRight from './ModuleRight';

export default interface Module {
  id: number;
  description: string | undefined;
  view: string | undefined;
  moduleRights: ModuleRight[] | undefined;
  isCheck?: boolean | undefined;
}
