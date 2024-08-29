import { PrayerTexts } from './app.const';

export interface IPrayerTimings {
  Iqamah: IIqamahTimings;
  Azaan: IAzaanTimings;
}

export interface IIqamahTimings {
  [key: string]: string;
  [PrayerTexts.Fazr]: string;
  [PrayerTexts.Dhuhr]: string;
  [PrayerTexts.Asr]: string;
  [PrayerTexts.Maghrib]: string;
  [PrayerTexts.Isha]: string;
  [PrayerTexts.Jummah_One]: string;
  [PrayerTexts.Jummah_Two]: string;
  [PrayerTexts.Khutbah_One]: string;
  [PrayerTexts.Khutbah_Two]: string;
}

export interface IAzaanTimings {
  [PrayerTexts.Fazr]: string;
  [PrayerTexts.Dhuhr]: string;
  [PrayerTexts.Asr]: string;
  [PrayerTexts.Maghrib]: string;
  [PrayerTexts.Isha]: string;
}

export interface AuthPayload {
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface BannersResponse {
  banners: Array<{ name: string; url: string }>;
}
