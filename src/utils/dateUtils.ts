import { fromZonedTime } from "date-fns-tz";

export const createZonedDate = (date: Date, timezone: string): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const localDate = new Date(year, month, day);
  const timezoneAdjustedDay = fromZonedTime(localDate.toISOString().split('T')[0] + 'T12:00:00', timezone);

  return timezoneAdjustedDay;
}