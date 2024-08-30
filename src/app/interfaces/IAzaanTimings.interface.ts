import { PrayerTexts } from "../constants/PrayerTexts.const";

export interface IAzaanTimings {
    [PrayerTexts.Fazr]: string;
    [PrayerTexts.Dhuhr]: string;
    [PrayerTexts.Asr]: string;
    [PrayerTexts.Maghrib]: string;
    [PrayerTexts.Isha]: string;
  }