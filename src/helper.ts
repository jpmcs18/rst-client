import printJS from 'print-js';
import ModuleRoute from './models/client-model/ModuleRoute';
import { SystemModules } from './routes';
import ModuleRight from './models/entities/ModuleRight';
const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
const longMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MAX_FILE_SIZE = 5120; // 5MB
export function validateFileSize(selectedFile: File | undefined) {
  if (!selectedFile) {
    throw new Error('Invalid file');
  }

  const fileSizeKiloBytes = selectedFile.size / 1024;

  if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    throw new Error('File must me less than or equal to 5mb');
  }
}

/**
 * @returns formated date MMM dd, yyyy
 */
export function toDateMMM_dd_yyyy(date?: Date | null): string {
  if (date === undefined || date === null) return '';

  const d = new Date(date);
  return (
    shortMonths[d.getMonth()] +
    ' ' +
    d.getDate().toString().padStart(2, '0') +
    ', ' +
    d.getFullYear()
  );
}

/**
 * @returns formated date MMMM dd, yyyy
 */
export function toDateMMMM_dd_yyyy(date?: Date | null): string {
  if (date === undefined || date === null) return '';

  const d = new Date(date);
  return (
    longMonths[d.getMonth()] +
    ' ' +
    d.getDate().toString().padStart(2, '0') +
    ', ' +
    d.getFullYear()
  );
}

/**
 * @returns formated date yyyy-MM-dd
 */
export function toDateyyyyMMdd(date?: Date | null): string {
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

/**
 * @returns formated date MM/dd/yyyy
 */
export function toDateMMddyyyy(date?: Date | null): string | undefined {
  if (date === undefined || date === null) return undefined;
  const d = new Date(date);
  return (
    (d.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    d.getDate().toString().padStart(2, '0') +
    '/' +
    d.getFullYear()
  );
}

export function getAge(date?: Date | undefined) {
  if (date === undefined || date === null) return '';

  var dob = new Date(date);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  return Math.abs(year - 1970);
}
export function toCommaSeparateAmount(amount?: string): string {
  if (amount === undefined || amount === null) return '';
  var data = amount.split('.');
  return (
    data[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (data[1] ? '.' + data[1] : '')
  );
}

export function toDisplayAmount(amount?: string): string {
  if (amount === undefined || amount === null) return '';
  var result = amount.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  var values = result.split('.');
  return values[0] + (values[1] ?? '.').padEnd(3, '0');
}

export function printPDFReport(report: string) {
  printJS({
    printable: report.replace('data:application/pdf;base64,', ''),
    type: 'pdf',
    base64: true,
  });
}

export const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: any,
  rotation: number,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  return await resizeBase64Image(canvas.toDataURL('image/png'), 400, 625);
}
export function resizeBase64Image(
  base64Image: string,
  height: number,
  width: number
) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const newWidth = width;
      const newHeight = height;
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      let quality = 0.8;
      let dataURL = canvas.toDataURL('image/png', quality);
      resolve(dataURL);
    };
  });
}

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
