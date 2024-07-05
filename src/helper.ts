import ModuleRoute from './models/client-model/ModuleRoute';
import ModuleRight from './models/entities/ModuleRight';
import { SystemModules } from './routes';

export function hasAccess(
  moduleRight: ModuleRight[],
  page: string,
  access: string,
  isAdmin?: boolean
) {
  var module = getPage(page);
  return (
    !!moduleRight
      .filter((x) => x.moduleId === module.id)
      ?.filter((x) => x.right === access).length || isAdmin
  );
}

export function getModuleById(id: number): ModuleRoute {
  return SystemModules.filter((x) => x.id === id)[0];
}
export function getModuleByPageName(pageName: string): ModuleRoute {
  return SystemModules.filter((x) => x.pageName === pageName)[0];
}

export function dateToString(date?: Date | undefined): string | undefined {
  return date === undefined ? undefined : new Date(date).toLocaleString();
}
export function dateToDateString(date?: Date | undefined): string | undefined {
  return date === undefined ? undefined : new Date(date).toDateString();
}

export function downloadFile(file: string, fileName: string) {
  let link = document.createElement('a');
  link.href = file;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function addDays(date: Date, days: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  var result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function getLastDateOfMonth(date: Date): Date {
  var result = new Date(date);
  result.setDate(1);
  result = addMonths(result, 1);
  result = addDays(result, -1);
  return result;
}

export function getFirstDateOfMonth(date: Date): Date {
  var result = new Date(date);
  result.setDate(1);
  return result;
}

export function getMonthName(date: Date): string {
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format;
  return monthName(date);
}

export function toDate(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}
export function toDateTime(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  return (
    d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }) +
    ' ' +
    d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );
}
export function toDateDisplay(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  return (
    d.getFullYear() +
    '-' +
    (d.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    d.getDate().toString().padStart(2, '0')
  );
}

export function toDateTimeDisplay(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  return toDateDisplay(d) + ' ' + toTimeDisplay(d);
}

export function toTimeDisplay(date?: Date | null): string {
  if (date === undefined || date === null) return '';
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

export function toAmount(amount?: number | null): string {
  if (amount === undefined || amount === null) return '';
  return (
    '₱ ' +
    amount?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
    })
  );
}

export function toQuantity(quantity?: number | null): string | undefined {
  if (quantity === undefined || quantity === null) return undefined;
  return quantity?.toLocaleString('en-US');
}

export function toCommaSeparated(amount?: string | null): string {
  if (amount === undefined || amount === null) return '';
  return amount.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getPage(page: string): ModuleRoute {
  return SystemModules.filter((x) => x.pageName === page)[0];
}

export function getErrorMessage(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }
  return typeof e === 'string' ? e : 'Unspecified error.';
}

export function validateDate(date: Date | undefined): boolean {
  return !(
    date?.toString() === 'Invalid Date' ||
    date === undefined ||
    date === null
  );
}
