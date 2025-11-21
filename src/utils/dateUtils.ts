import { fromZonedTime } from "date-fns-tz";

export const createZonedDate = (date: Date, timezone: string): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const localDate = new Date(year, month, day);
  const timezoneAdjustedDay = fromZonedTime(localDate.toISOString().split('T')[0] + 'T12:00:00', timezone);

  return timezoneAdjustedDay;
}


export const getTimezoneAbbreviation = (timezone: string) => {
  const date = new Date();

  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "short",
  });

  const parts = f.formatToParts(date);

  const tz = parts.find(p => p.type === "timeZoneName");
  return tz ? tz.value : null;
};


export const getTimezoneOffsetMs = (timeZone: string): number => {
  // Use a fixed date so DST shifts are predictable. You can choose "now" if preferred.
    const now = new Date();

    // Format the date in the target timezone and extract the UTC offset
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset"
    });

    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find(p => p.type === "timeZoneName");

    // Example offsetPart.value formats:
    // "UTC", "UTC+1", "UTC-05:00", "GMT+3"
    const match = offsetPart?.value.match(/([+-]\d{1,2})(?::(\d{2}))?/);

    if (!match) {
      // UTC has no offset (`UTC`)
      return 0;
    }

    const hours = -parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    return (hours * 60 + minutes) * 60 * 1000;
}


export const normalizeCalendarTileDate = (date: Date, timezone: string) => {
  // Convert browser-local date to "midnight in selected timezone"
  return fromZonedTime(
    new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )),
    timezone
  );
}