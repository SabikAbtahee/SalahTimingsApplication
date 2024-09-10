import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalendarEventsResponse } from '../interfaces/ICalendarEventsResponse.interface';
import { Observable } from 'rxjs';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private httpClient: HttpClient) {}

  getCalendarEvents(): Observable<ICalendarEventsResponse> {
    return this.httpClient.get(
      environment.SalahTimesService + '/calendar/events'
    ) as Observable<ICalendarEventsResponse>;
  }

  getCurrentWeekCalendarEvents(
    payload: ICalendarEventsResponse
  ): ICalendarEventsResponse {
    const currentDate = new Date();
    const allDates =
      Object.keys(payload)
      .sort();

    const futureDates = allDates.slice(0,8)
    //   .map((date) => new Date(date).toLocaleDateString('en-US',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const selectedDates = [...futureDates];

    const filteredPayload: ICalendarEventsResponse = selectedDates.reduce(
      (acc, date) => {
        if (payload[date]) {
          acc[date] = payload[date];
        }
        return acc;
      },
      {} as ICalendarEventsResponse
    );

    return filteredPayload;
  }
}
