import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env";
import { Observable } from "rxjs";
import * as SunCalc from "suncalc";

import { toGregorian, toHijri } from "hijri-converter";
import { DatePipe } from "@angular/common";
import { IPrayerTimings } from "../interfaces/IPrayerTimings.interface";
import { IslamicMonths } from "../constants/IslamicMonthTexts.const";
import {
  ChangeBannerInterval,
  ChangeBannerIntervalKey,
  ChangeSalahInterval,
  ChangeSalahIntervalKey,
} from "../constants/app.const";

@Injectable({
  providedIn: "root",
})
export class TimingsService {
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

  getTimings(): Observable<IPrayerTimings> {
    return this.httpClient.get(
      environment.SalahTimesService + "/timings",
    ) as Observable<IPrayerTimings>;
  }

  getHizriDate(date?: Date): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentDate = date ? date : new Date();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Get sunset time for the current date
            let sunset = SunCalc.getTimes(
              currentDate,
              latitude,
              longitude,
            ).sunset;

            // Convert to Hijri
            let hijriDate = toHijri(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              currentDate.getDate() + 1,
            );

            // If the current time is after sunset, add one day to the Hijri date
            if (currentDate > sunset) {
              hijriDate = toHijri(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                currentDate.getDate() + 2,
              );
            }
            const month = IslamicMonths[hijriDate.hm];
            resolve(`${month} ${hijriDate.hd}, ${hijriDate.hy}`);
          },
          (error) => {
            reject(error);
          },
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }

  getEnglishDate(date?: Date): string | null {
    const currentDate = date ? date : new Date();

    return this.datePipe.transform(currentDate, "E, MMMM dd, YYYY");
  }

  saveSalahIntervalToLocalStorage(time: number) {
    localStorage.setItem(ChangeSalahIntervalKey, JSON.stringify(time));
  }

  getSalahIntervalFromLocalStorage(): number {
    const storedValue = localStorage.getItem(ChangeSalahIntervalKey);
    return storedValue ? JSON.parse(storedValue) : ChangeSalahInterval;
  }

  gmod(n, m): number {
    return ((n % m) + m) % m;
  }

  kuwaiticalendar(adjust?) {
    var today = new Date();
    if (adjust) {
      let adjustmili = 1000 * 60 * 60 * 24 * adjust;
      let todaymili = today.getTime() + adjustmili;
      today = new Date(todaymili);
    }
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let m = month + 1;
    let y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    let a = Math.floor(y / 100.);
    let b = 2 - a + Math.floor(a / 4.);
    if (y < 1583) b = 0;
    if (y == 1582) {
      if (m > 10) b = -10;
      if (m == 10) {
        b = 0;
        if (day > 4) b = -10;
      }
    }

    let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) +
      day +
      b - 1524;

    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4.);
    }
    let bb = jd + b + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    let dd = Math.floor(365.25 * cc);
    let ee = Math.floor((bb - dd) / 30.6001);
    day = (bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;
    let wd;
    if (adjust) {
      wd = this.gmod(jd + 1 - adjust, 7) + 1;
    } else {
      wd = this.gmod(jd + 1, 7) + 1;
    }

    let iyear = 10631. / 30.;
    let epochastro = 1948084;
    let epochcivil = 1948085;

    let shift1 = 8.01 / 60.;

    let z = jd - epochastro;
    let cyc = Math.floor(z / 10631.);
    z = z - 10631 * cyc;
    let j = Math.floor((z - shift1) / iyear);
    let iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    let im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) im = 12;
    let id = z - Math.floor(29.5001 * im - 29);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month - 1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd - 1; //julian day number
    myRes[4] = wd - 1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im - 1; //islamic month
    myRes[7] = iy; //islamic year

    return myRes;
  }

  writeIslamicDate(adjustment?: any) {
    var wdNames = new Array(
      "Ahad",
      "Ithnin",
      "Thulatha",
      "Arbaa",
      "Khams",
      "Jumuah",
      "Sabt",
    );
    var iMonthNames = new Array(
      "Muharram",
      "Safar",
      "Rabi'ul Awwal",
      "Rabi'ul Akhir",
      "Jumadal Ula",
      "Jumadal Akhira",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhul Qa'ada",
      "Dhul Hijja",
    );
    var iDate = this.kuwaiticalendar(adjustment);
    // var outputIslamicDate = wdNames[iDate[4]] + ", " +
    //   iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " AH";

    return `${iMonthNames[iDate[6]]} ${iDate[5]}, ${iDate[7]}`;
    // return outputIslamicDate;
  }
}
