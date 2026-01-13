import Calendar from 'react-calendar';

import type {
  Action,
  CalendarType,
  ClassName,
  DeprecatedCalendarType,
  Detail,
  LooseValue,
  NavigationLabelFunc,
  OnArgs,
  OnClickFunc,
  OnClickWeekNumberFunc,
  Range,
  TileArgs,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  Value,
  View,
} from 'react-calendar/dist/esm/shared/types.js';

import { Locale, getDay, isValid, parseISO, startOfMonth } from 'date-fns';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';

import React, { useEffect, useState } from 'react';
import { setup, styled } from 'goober';

import { StartTimeEvent } from './ScheduleMeeting';
import { shouldForwardProp } from 'goober/should-forward-prop';
import { createZonedDate } from '../../utils/dateUtils';

setup(
  React.createElement,
  undefined,
  undefined,
  shouldForwardProp((prop) => {
    // Do NOT forward props that start with `$` symbol
    return prop['0'] !== '$';
  }),
);

const StyledCalendar = styled(Calendar)`
  &.react-calendar,
  &.react-calendar *,
  &.react-calendar *:before,
  &.react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  button {
    margin: 0;
    border: 0;
    outline: none;
  }
  button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: hsl(0, 0%, 90.19607843137256%);
  }
  .react-calendar__navigation button[disabled] {
    background-color: hsl(0, 0%, 94.11764705882352%);
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers {
    font-weight: bold;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    text-align: center;
    padding: 0.75em 0.5em;
    background: none;
  }

  .day-tile {
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      height: 45px;
    }
    color: rgba(var(--text-color-rgb), .9);
    padding: 5px;
    position: relative;
    z-index: 0;
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      bottom: 2px;
      right: 2px;
      z-index: -1;
    }
  }

  .day-tile abbr {
    font-weight: bold;
    font-size: 15.33px;
  }

  .react-calendar__month-view__days__day {
    aspect-ratio: 1 / 1;
    height: auto;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(var(--text-color-rgb), .6);
  }

  button {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
  }

  .active-day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222);
      border-radius: var(--border-radius);
    }
    color: rgba(var(--primary-color-text-shade-rgb), 1);
  }

  .active-day-tile:hover {
    opacity: 0.5;
  }

  .react-calendar__tile:disabled.day-tile {
    opacity: 0.2;
    cursor: not-allowed;
  }

  .react-calendar__tile--now.day-tile {
    color: black !important;

    &::after {
      border-radius: var(--border-radius);
      background: var(--bs-gray-200);
      border: none;
    }
  }

  .react-calendar__tile--now:hover.day-tile {
    border: none;
    border-radius: var(--border-radius);
    background: var(--bs-gray-200);
    color: black !important;

    &::after {
      border-radius: var(--border-radius);
      background: var(--bs-gray-200);
      border: none;
    }
  }

  .react-calendar__tile:hover.day-tile {
    background: rgba(var(--background-color-rgb), 1);
  }

  .react-calendar__tile--active.day-tile {
    background: rgba(var(--background-color-rgb), 1);
    color: rgba(var(--primary-color-text-shade-rgb), 1);

    &::after {
      border-radius: var(--border-radius);
      border: none;
    }
  }

  .react-calendar__tile--active:enabled.day-tile,
  .react-calendar__tile--active:enabled:focus.day-tile {
    &::after {
      background: rgba(var(--primary-color-rgb), 0.222)
      border-radius: var(--border-radius);
      border: solid rgba(0, 0, 0, 1) 3px;
    }

    &.react-calendar__tile--now {
      color: black !important;

      &::after {
        border-radius: var(--border-radius);
        background: var(--bs-gray-200);
        border: solid rgba(0, 0, 0, 1) 3px;
      }
    }
  }

  /* month day titles */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-weight: normal;
    color: rgba(var(--text-color-rgb), 1);
    font-size: 14px;
    font-weight: 700;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    color: rgba(var(--text-color-rgb), 1);
  }

  /* calendar styles */
  &.react-calendar {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    border: none !important;
    width: 100% !important;
    min-height: 390px;
    @media (max-width: 768px) {
      min-height: 302px;
    }
  }

  .react-calendar__tile { position: relative; }
  .rsm-event-dot {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgb(0, 122, 255);
    color: #fff;
    font-size: 1.25rem;
    line-height: 1;
    text-align: center;
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 2;
    box-shadow: 0 1px 0 rgba(0,0,0,0.12);
    white-space: nowrap;
    overflow: hidden;
  }

  .custom-tile {
    &::after {
      inset: 5px;
      border: 1px solid rgb(150, 150, 150);
      border-radius: var(--border-radius);
      content: ""; // required for ::after to render
      position: absolute;
    }

    &.rsm-blackout-tile {
      color: white !important;
    }

    &.rsm-blackout-tile::after {
      background-color: #f05d2a !important;
    }
  }

`;

type CalendarProps = {
  startTimeEventsList: StartTimeEvent[];
  onDaySelected: (day: Date) => void;
  selectedDay: Date;
  locale?: Locale;
  timezone: string;
  eventList?: {
    id: number;
    title: string;
    start: string;
    end: string;
    speaker_event_user_id: number;
    status: string;
    url: string;
  }[];
  blackoutDates?: Record<string, number>;
  ignoreScheduler: boolean;
  setDateToShow: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const formatDate = (date: Date, timezone: string, locale?: Locale) => {
  return formatInTimeZone(date, timezone, 'MM/dd/yyyy');
};

const formateDateFromLocal = (date: Date, timezone: string, locale?: Locale) => {
  const newDate = fromZonedTime(date, timezone);
  return formatDate(newDate, timezone);
};

const ScheduleCalendar: React.FC<CalendarProps> = ({
  startTimeEventsList,
  onDaySelected,
  selectedDay,
  locale,
  timezone,
  eventList = [],
  blackoutDates = {},
  ignoreScheduler = false,
  setDateToShow
}) => {
  const [daysAvailable, setDaysAvailable] = useState<Array<any>>([]);
  const [eventCounts, setEventCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    if (!eventList || eventList.length === 0) {
      setEventCounts({});
      return;
    }

    for (const ev of eventList) {
      if (!ev || !ev.start) continue;

      const parsed = parseISO(ev.start);
      if (!isValid(parsed)) continue;

      const key = formatInTimeZone(parsed, timezone, 'yyyy-MM-dd');
      counts[key] = (counts[key] || 0) + 1;
    }

    setEventCounts(counts);
  }, [eventList, timezone]);

  useEffect(() => {
    const daysInTimeslots: string[] = [];

    startTimeEventsList.map((slot) => {
      if (!isValid(new Date(slot.startTime)))
        throw new Error(`Invalid date for start time on slot ${slot.availableTimeslot.id}`);

      const date = formatDate(new Date(slot.startTime), timezone);

      if (daysInTimeslots.indexOf(date) === -1) {
        daysInTimeslots.push(date);
      }
      return null;
    });

    setDaysAvailable(daysInTimeslots);
  }, [startTimeEventsList, timezone]);

  const _onClickDay = (day: Date) => {

    const timezoneAdjustedDay = createZonedDate(day, timezone);

    onDaySelected(timezoneAdjustedDay);
    setDateToShow(timezoneAdjustedDay);
  };

  const _isTileDisabled = (props: TileArgs) => {
    if (ignoreScheduler) {
      const key = createZonedDate(props.date, timezone).toISOString().split('T')[0];
      const hasEvent = (eventCounts[key] || 0) > 0;
      const today = new Date();
      const todayKey = today.toISOString().split('T')[0];
      const isTodayOrFuture = key >= todayKey;
      if (hasEvent || isTodayOrFuture) {
        return false;
      }

      return true;
    }

    if (props.view !== 'month') return false;
    const dateStr = formateDateFromLocal(props.date, timezone);
    const hasAvailable = daysAvailable.some((date) => date === dateStr);
    const key = formatInTimeZone(props.date, timezone, 'yyyy-MM-dd');
    const hasEvent = (eventCounts[key] || 0) > 0;
    return !hasAvailable && !hasEvent;
  };

  const _renderClassName = (props: TileArgs) => {
    let classNames = [];
    if (daysAvailable.some((date) => date === formateDateFromLocal(props.date, timezone)))
      classNames.push('day-tile', 'active-day-tile');
    else if (props.view === 'month') classNames.push('day-tile');
    const keyDate = createZonedDate(props.date, timezone);
    const key = keyDate.toISOString().split('T')[0];
    if (key in blackoutDates) {
      classNames.push('rsm-blackout-tile');
    }
    if (ignoreScheduler && props.view === 'month') {
      classNames.push('custom-tile');
    }
    return classNames.length > 0 ? classNames : null;
  };

  return (
    <StyledCalendar
      showNeighboringMonth={false}
      defaultView={'month'}
      onClickDay={_onClickDay}
      showNavigation={false}
      tileDisabled={_isTileDisabled}
      tileClassName={_renderClassName}
      value={selectedDay}
      activeStartDate={startOfMonth(selectedDay)}
      calendarType={'gregory'}
      tileContent={({ date, view }) => {
        if (view !== 'month') return null;
        const key = createZonedDate(date, timezone).toISOString().split('T')[0];
        const eventCount = eventCounts[key] || 0;

        return (
          <>
            {eventCount > 0 && (
              <div className={`rsm-event-dot`} aria-label={eventCount === 1 ? '1 event' : `${eventCount} events`}>
                {eventCount > 1 ? eventCount : ''}
              </div>
            )}
          </>
        );
      }}
    />
  );
};

export default ScheduleCalendar;
