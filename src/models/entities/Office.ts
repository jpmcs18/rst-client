import OfficePosition from './OfficePosition';

export default interface Office {
  id: number;
  abbreviation: string | undefined;
  description: string | undefined;
  positions: OfficePosition[] | undefined;
}
