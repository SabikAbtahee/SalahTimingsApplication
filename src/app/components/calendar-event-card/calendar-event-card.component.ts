import { Component, Input } from '@angular/core';
import { ICalendarEvent } from '../../interfaces/ICalendarEvent.interface';
import { DatePipe } from '@angular/common';
import { SkeletonLoaderDirective } from '../../directives/skeleton-loader.directive';

@Component({
  selector: 'calendar-event-card',
  standalone: true,
  imports: [DatePipe, SkeletonLoaderDirective],
  templateUrl: './calendar-event-card.component.html',
  styleUrl: './calendar-event-card.component.scss',
})
export class CalendarEventCardComponent {
  x = true;
  @Input({ required: true }) calendarEvents: ICalendarEvent[];
  @Input({ required: true }) date: string;
}
