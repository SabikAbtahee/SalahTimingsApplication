export interface ICalendarEvent {
  summary: string;
  isRecurring: boolean;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
}
