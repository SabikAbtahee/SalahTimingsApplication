import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalendarEventGroups } from '../interfaces/ICalendarEventsResponse.interface';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { ICalendarEvent } from '../interfaces/ICalendarEvent.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private httpClient: HttpClient) {}

  getCalendarEvents(): Observable<ICalendarEvent[]> {
    return this.httpClient.get(
      environment.SalahTimesService + '/calendar/events'
    ) as Observable<ICalendarEvent[]>;
  }

  groupEventsByDate(events) {
    return events.reduce((groupedEvents, event) => {
      const date = new Date(event.startDate);
      const eventDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      if (!groupedEvents[eventDate]) {
        groupedEvents[eventDate] = [];
      }
      groupedEvents[eventDate].push(event);
      return groupedEvents;
    }, {});
  }
}
