import { Component, Input } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/ICalendarEvent.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'calendar-event-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar-event-card.component.html',
  styleUrl: './calendar-event-card.component.scss',
})
export class CalendarEventCardComponent {
  @Input({ required: true }) calendarEvents: ICalendarEvent[];
  @Input({ required: true }) date: string;

}
