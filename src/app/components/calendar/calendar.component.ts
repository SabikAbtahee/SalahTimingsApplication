import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { ICalendarEventGroups } from '../../interfaces/ICalendarEventsResponse.interface';
import { map, Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CalendarEventCardComponent } from '../calendar-event-card/calendar-event-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [CommonModule, CalendarEventCardComponent, MatProgressSpinnerModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  calendarEvents: ICalendarEventGroups;
  calendarEventsDates: Array<string>;
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.setCalendarEvents();
  }

  setCalendarEvents() {
    this.calendarService
      .getCalendarEvents()
      .pipe(
        map((res) => this.calendarService.groupEventsByDate(res)),
        tap((res) => {
          this.calendarEventsDates = Object.keys(res);
        })
      )
      .subscribe((res) => {
        this.calendarEvents = res;
      });
  }
}
