import { APP_SECRET } from '../constant';
import ModuleRight from '../models/entities/ModuleRight';
import SystemUser from '../models/entities/SystemUser';
import TokenData from '../models/entities/TokenData';

var CryptoJS = require('crypto-js');
const token_add = '--pxx--';
const profile_add = '--pxx-xdx--';
const access_add = '--axx-xdx--';
const kiosk_add = '--kxx-xdx--';
const theme = '--dark-theme--';

function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, APP_SECRET).toString();
}
function decrypt(data: string): string {
  return CryptoJS.AES.decrypt(data, APP_SECRET).toString(CryptoJS.enc.Utf8);
}
export function getTheme(): boolean | undefined {
  try {
    return localStorage.getItem(theme) === 'true';
  } catch {
    return undefined;
  }
}
export function setTheme(isDarkMode: boolean) {
  localStorage.setItem(theme, isDarkMode.toString());
}
export function saveToken(auth: TokenData) {
  if (auth.token !== undefined && auth.refreshToken !== undefined) {
    localStorage.setItem(token_add, encrypt(JSON.stringify(auth)));
  }
}
export function clearToken() {
  localStorage.removeItem(token_add);
}
export function getToken(): TokenData | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(token_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function getSessionProfile(): SystemUser | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(profile_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function saveSessionProfile(profile: SystemUser) {
  if (profile !== undefined) {
    localStorage.setItem(profile_add, encrypt(JSON.stringify(profile)));
  }
}
export function clearSessionProfile() {
  localStorage.removeItem(profile_add);
}
export function getSessionAccess(): ModuleRight[] | undefined {
  try {
    return JSON.parse(decrypt(localStorage.getItem(access_add) ?? ''));
  } catch {
    return undefined;
  }
}
export function saveSessionAccess(access: ModuleRight[]) {
  if (access !== undefined) {
    localStorage.setItem(access_add, encrypt(JSON.stringify(access)));
  }
}
export function clearSessionAccess() {
  localStorage.removeItem(access_add);
}

export function getIsKiosk(): boolean | undefined {
  try {
    return localStorage.getItem(kiosk_add) === 'true';
  } catch {
    return undefined;
  }
}
export function saveIsKiosk(isKiosk: boolean) {
  localStorage.setItem(kiosk_add, isKiosk.toString());
}
export function clearSession() {
  localStorage.clear();
}
