import { ICalendarEvent } from './ICalendarEvent.interface';

export interface ICalendarEventGroups {
  [date: string]: ICalendarEvent[];
}
