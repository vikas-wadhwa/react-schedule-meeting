import { fromZonedTime } from "date-fns-tz";

// export const createZonedDate = (date: Date, timezone: string): Date => {
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();

//   const localDate = new Date(year, month, day);
//   const timezoneAdjustedDay = fromZonedTime(localDate.toISOString().split('T')[0] + 'T12:00:00', timezone);

//   return timezoneAdjustedDay;
// }


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
    const now = new Date();

    // Format date in target timezone and get UTC offset
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset"
    });

    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find(p => p.type === "timeZoneName");

    // "UTC", "UTC+1", "UTC-05:00", etc
    const match = offsetPart?.value.match(/([+-]\d{1,2})(?::(\d{2}))?/);

    if (!match) {
      return 0;
    }

    const hours = -parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    return (hours * 60 + minutes) * 60 * 1000;
}


export const getLocalMidnightDateString = (date: Date, timezone: string) => {
  return date.toLocaleString("sv", { timeZone: timezone }).split(" ")[0];
}

export const getLocalMidnightDate = (date: Date, timezone: string) => {
  const dayLocal = getLocalMidnightDateString(date, timezone);
  const zonedDate = fromZonedTime(dayLocal, timezone);
  return zonedDate;
};