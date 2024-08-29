export const assetImage = '../../assets/youthIftar.jpeg';
export const mosqueImage = '../../assets/mosque.jpg';

export enum PrayerTexts {
  Fazr = 'Fajr',
  Dhuhr = 'Dhuhr',
  Asr = 'Asr',
  Maghrib = 'Maghrib',
  Isha = 'Isha',
  Khutbah_One = '1st Jummah Khutba',
  Khutbah_Two = '2nd Jummah Khutba',
  Jummah_One = '1st Jummah Prayer',
  Jummah_Two = '2nd Jummah Prayer',
}

export enum Jummahtext {
  Khutbah1 = '1st Jummah Khutbah',
  Prayer1 = '1st Jummah Prayer',
  Khutbah2 = '2nd Jummah Khutbah',
  Prayer2 = '2nd Jummah Prayer',
}

export enum IslamicMonthsEnum {
  'Muharram' = 1,
  'Safar',
  'Rabi Al-Awwal',
  'Rabi Al-Thani',
  'Jumada Al-Awwal',
  'Jumada Al-Thani',
  'Rajab',
  'Shaban',
  'Ramadan',
  'Shawwal',
  'Dhul Qadah',
  'Dhu al-Hijjah',
}

export const IslamicMonths = {
  [IslamicMonthsEnum.Muharram]: 'Muharram',
  [IslamicMonthsEnum.Safar]: 'Safar',
  [IslamicMonthsEnum['Rabi Al-Awwal']]: 'Rabi Al-Awwal',
  [IslamicMonthsEnum['Rabi Al-Thani']]: 'Rabi Al-Thani',
  [IslamicMonthsEnum['Jumada Al-Awwal']]: 'Jumada Al-Awwal',
  [IslamicMonthsEnum['Jumada Al-Thani']]: 'Jumada Al-Thani',
  [IslamicMonthsEnum.Rajab]: 'Rajab',
  [IslamicMonthsEnum.Shaban]: 'Shaban',
  [IslamicMonthsEnum.Ramadan]: 'Ramadan',
  [IslamicMonthsEnum.Shawwal]: 'Shawwal',
  [IslamicMonthsEnum['Dhul Qadah']]: 'Dhul Qadah',
  [IslamicMonthsEnum['Dhu al-Hijjah']]: 'Dhu al-Hijjah',
};
