import { ICalendarEvent } from './ICalendarEvent.interface';

export interface ICalendarEventsResponse {
  [date: string]: ICalendarEvent[];
}
