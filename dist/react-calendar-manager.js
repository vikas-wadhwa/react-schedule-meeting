/* eslint-disable */
import { parseISO, isValid, startOfMonth, isSameMinute, isPast, isAfter, differenceInMinutes, addMinutes, subMonths, addMonths, isBefore, isEqual } from 'date-fns';
import * as React from 'react';
import React__default, { useState, useEffect } from 'react';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import Color from 'color';
import Calendar from 'react-calendar';
import { setup, styled } from 'goober';
import { shouldForwardProp } from 'goober/should-forward-prop';
import Select from 'react-select';

const Arrow = ({ direction }) => (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "26", height: "26", viewBox: "0 0 512 512" },
    React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "48", d: direction === 'back' ? 'M328 112L184 256l144 144' : 'M184.001 400L328.001 256L184.001 112' })));

const createZonedDate = (date, timezone) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const localDate = new Date(year, month, day);
    const timezoneAdjustedDay = fromZonedTime(localDate.toISOString().split('T')[0] + 'T12:00:00', timezone);
    return timezoneAdjustedDay;
};

setup(React__default.createElement, undefined, undefined, shouldForwardProp((prop) => {
    return prop['0'] !== '$';
}));
const StyledCalendar = styled(Calendar) `
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
const formatDate = (date, timezone, locale) => {
    return formatInTimeZone(date, timezone, 'MM/dd/yyyy');
};
const formateDateFromLocal = (date, timezone, locale) => {
    const newDate = fromZonedTime(date, timezone);
    return formatDate(newDate, timezone);
};
const ScheduleCalendar = ({ startTimeEventsList, onDaySelected, selectedDay, locale, timezone, eventList = [], blackoutDates = {}, ignoreScheduler = false, setDateToShow }) => {
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [eventCounts, setEventCounts] = useState({});
    useEffect(() => {
        const counts = {};
        if (!eventList || eventList.length === 0) {
            setEventCounts({});
            return;
        }
        for (const ev of eventList) {
            if (!ev || !ev.start)
                continue;
            const parsed = parseISO(ev.start);
            if (!isValid(parsed))
                continue;
            const key = formatInTimeZone(parsed, timezone, 'yyyy-MM-dd');
            counts[key] = (counts[key] || 0) + 1;
        }
        setEventCounts(counts);
    }, [eventList, timezone]);
    useEffect(() => {
        const daysInTimeslots = [];
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
    const _onClickDay = (day) => {
        const timezoneAdjustedDay = createZonedDate(day, timezone);
        onDaySelected(timezoneAdjustedDay);
        setDateToShow(timezoneAdjustedDay);
    };
    const _isTileDisabled = (props) => {
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
        if (props.view !== 'month')
            return false;
        const dateStr = formateDateFromLocal(props.date, timezone);
        const hasAvailable = daysAvailable.some((date) => date === dateStr);
        const key = formatInTimeZone(props.date, timezone, 'yyyy-MM-dd');
        const hasEvent = (eventCounts[key] || 0) > 0;
        return !hasAvailable && !hasEvent;
    };
    const _renderClassName = (props) => {
        let classNames = [];
        if (daysAvailable.some((date) => date === formateDateFromLocal(props.date, timezone)))
            classNames.push('day-tile', 'active-day-tile');
        else if (props.view === 'month')
            classNames.push('day-tile');
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
    return (React__default.createElement(StyledCalendar, { showNeighboringMonth: false, defaultView: 'month', onClickDay: _onClickDay, showNavigation: false, tileDisabled: _isTileDisabled, tileClassName: _renderClassName, value: selectedDay, activeStartDate: startOfMonth(selectedDay), calendarType: 'gregory', tileContent: ({ date, view }) => {
            if (view !== 'month')
                return null;
            const key = createZonedDate(date, timezone).toISOString().split('T')[0];
            const eventCount = eventCounts[key] || 0;
            return (React__default.createElement(React__default.Fragment, null, eventCount > 0 && (React__default.createElement("div", { className: `rsm-event-dot`, "aria-label": eventCount === 1 ? '1 event' : `${eventCount} events` }, eventCount > 1 ? eventCount : ''))));
        } }));
};

const StartTimeListButton = styled('button') `
  padding: 16px;
  border: none;
  color: rgba(var(--text-color-rgb), 1);
  background-color: rgba(0,0,0,0);
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`;
const StartTimeGridItemButton = styled('button') `
  padding: 12px 16px;
  margin: 4px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
  outline: none;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  @media (max-width: 768px) {
    padding: 7px 12px;
  }
  :hover {
    opacity: 0.8;
  }
`;
const StartTimeConfirmButton = styled('button') `
  padding: 16px;
  border: none;
  color: rgba(var(--primary-color-contrast-rgb), 1);
  background-color: rgba(var(--primary-color-rgb), 1);
  border-radius: var(--border-radius);
  outline: none;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  opacity: 1;
  &:hover {
    opacity: 0.8;
    background-color: rgba(var(--primary-color-rgb), 1);
  }
`;

const Container$1 = styled('div') `
  display: flex;
  width: 100%;
  align-items: center;
`;
styled('button') `
  padding: 8px 24px;
  border: none;
  background-color: rgb(0, 0, 0, 0);
  border-radius: var(--border-radius);
  outline: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 100%;
  color: rgba(var(--text-color-rgb), 1);
  &:hover {
    background-color: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`;
const StartTimeListItem = ({ confirmState, onStartTimeSelect, startTimeEvent, selected, onCancelClicked, format_startTimeFormatString, lang_confirmButtonText, lang_cancelButtonText, lang_selectedButtonText, locale, timezone, }) => {
    let chosen = Boolean(selected || confirmState);
    return (React__default.createElement(Container$1, { className: "rsm-start-time-item" },
        React__default.createElement(StartTimeListButton, { type: "button", className: "rsm-cancel-button", selected: chosen, onClick: chosen ? onCancelClicked : onStartTimeSelect }, formatInTimeZone(startTimeEvent.startTime, timezone, format_startTimeFormatString)),
        (confirmState || selected) && (React__default.createElement(StartTimeConfirmButton, { type: "button", className: "rsm-confirm-button", onClick: onStartTimeSelect }, lang_confirmButtonText))));
};

const ScrollListContainer = styled('div') `
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 24px;
  padding-top: 16px;
`;
const GridContainer = styled('div') `
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-items: stretch;
  justify-content: flex-start;
  &.has-selection {
    button:not(.is-selected) {
      opacity: 0.5;
    }
  }
`;
const ScrollEdgeFade = styled('div') `
  position: absolute;
  width: 100%;
  height: 24px;
  left: 0;
  right: 0;
  z-index: 12;
  pointer-events: none;
`;
const ListItemDivider = styled('div') `
  flex-shrink: 0;
  flex: 1;
  padding: 0.5px;
  margin: 0px 8px;
  position: relative;
  background: ${({ makeTransparent }) => makeTransparent ? `transparent` : `rgba(var(--background-color-contrast-rgb), 0.05)`};
`;
const StyledP = styled('p') `
  margin: 0;
  opacity: 0.5;
  margin-bottom: 24px;
  font-size: 18px;
  color: rgba(var(--text-color-rgb), 1);
`;
const NoTimesAvailableContainer = styled('div') `
  height: 100%;
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const GoToNextAvailableDayButton = styled(StartTimeListButton) `
  border: none;
  padding: 6px 18px;
  width: auto;
  text-align: left;
  p {
    margin: 0;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
  }
  small {
    font-weight: 700;
  }
  display: flex;
  align-items: center;
  svg {
    margin-left: 14px;
    margin-right: -4px;
  }
`;
const NoFutureTimesText = styled(StyledP) `
  font-size: 90%;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--background-color-contrast-rgb), 0.5);
`;
const StartTimeList = ({ skipConfirmCheck, selectedDay, selectedStartTime, startTimeListItems = [], onStartTimeSelect, emptyListContentEl, lang_emptyListText, format_startTimeFormatString, lang_confirmButtonText, lang_cancelButtonText, lang_goToNextAvailableDayText, lang_noFutureTimesText, lang_selectedButtonText, onGoToNextAvailableDayClick, nextFutureStartTimeAvailable, format_nextFutureStartTimeAvailableFormatString, startTimeListStyle, setSelectedStartTime, locale, timezone, eventDurationInMinutes }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    useEffect(() => {
        setSelectedItemIndex(-1);
    }, [selectedDay]);
    const _onStartTimeSelect = (startTimeEvent, index) => {
        if (skipConfirmCheck || selectedItemIndex === index) {
            onStartTimeSelect(startTimeEvent);
            setSelectedItemIndex(-1);
        }
        else {
            setSelectedItemIndex(index);
        }
    };
    const emptyListElement = (React__default.createElement(NoTimesAvailableContainer, null,
        React__default.createElement(React__default.Fragment, null,
            emptyListContentEl || React__default.createElement(StyledP, { className: "rsm-empty-list-text" }, lang_emptyListText),
            nextFutureStartTimeAvailable ? (React__default.createElement(GoToNextAvailableDayButton, { type: "button", selected: true, className: "rsm-next-available-date-button", onClick: onGoToNextAvailableDayClick },
                React__default.createElement("p", null,
                    React__default.createElement("small", null, lang_goToNextAvailableDayText),
                    React__default.createElement("br", null),
                    formatInTimeZone(nextFutureStartTimeAvailable, timezone, format_nextFutureStartTimeAvailableFormatString)))) : (React__default.createElement(NoFutureTimesText, { className: "rsm-no-future-times-text" }, lang_noFutureTimesText)))));
    const handleCancelClicked = (startTimeEvent) => {
        setSelectedItemIndex(-1);
        if (selectedStartTime && startTimeEvent.startTime.getTime() === selectedStartTime) {
            setSelectedStartTime(undefined);
        }
    };
    return (React__default.createElement(React__default.Fragment, null, startTimeListItems.length === 0 ? (emptyListElement) : startTimeListStyle === 'scroll-list' ? (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(ScrollEdgeFade, { className: "top" }),
        React__default.createElement(ScrollEdgeFade, { className: "bottom" }),
        React__default.createElement(ScrollListContainer, null, startTimeListItems.map((startTimeEvent, i) => (React__default.createElement(React__default.Fragment, { key: i },
            React__default.createElement(StartTimeListItem, { locale: locale, timezone: timezone, lang_selectedButtonText: lang_selectedButtonText, lang_confirmButtonText: lang_confirmButtonText, lang_cancelButtonText: lang_cancelButtonText, format_startTimeFormatString: format_startTimeFormatString, onCancelClicked: () => handleCancelClicked(startTimeEvent), selected: Boolean(selectedStartTime && selectedStartTime === startTimeEvent.startTime.getTime()), confirmState: i === selectedItemIndex, startTimeEvent: startTimeEvent, onStartTimeSelect: () => _onStartTimeSelect(startTimeEvent, i) }),
            i !== startTimeListItems.length - 1 && (React__default.createElement(ListItemDivider, { makeTransparent: selectedItemIndex === i || selectedItemIndex === i + 1 })))))))) : (React__default.createElement(GridContainer, { className: selectedStartTime ? 'has-selection' : '' }, startTimeListItems.map((startTimeEvent, i) => (React__default.createElement(StartTimeGridItemButton, { key: i, type: "button", className: selectedStartTime && selectedStartTime === startTimeEvent.startTime.getTime() ? 'is-selected' : '', onClick: () => onStartTimeSelect(startTimeEvent) }, formatInTimeZone(startTimeEvent.startTime, timezone, format_startTimeFormatString))))))));
};

function regionOf(tz) {
    const region = tz.split('/')[0] || "Other";
    return region.toUpperCase();
}
function buildGroupsFromLabels(labels) {
    const favoriteIds = new Set([
        "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York",
        "America/Juneau", "America/Phoenix", "America/St_Johns", "Pacific/Honolulu",
    ]);
    const territoryIds = new Set([
        "America/Puerto_Rico",
        "Pacific/Guam",
        "Pacific/Pago_Pago"
    ]);
    const favorites = [];
    const territories = [];
    const byRegion = {};
    for (const tz of Object.keys(labels)) {
        const option = { value: tz, label: labels[tz] };
        if (favoriteIds.has(tz))
            favorites.push(option);
        else if (territoryIds.has(tz))
            territories.push(option);
        else {
            const region = regionOf(tz);
            (byRegion[region] || (byRegion[region] = [])).push(option);
        }
    }
    favorites.sort((a, b) => a.label.localeCompare(b.label));
    territories.sort((a, b) => a.label.localeCompare(b.label));
    Object.values(byRegion).forEach(list => {
        list.sort((a, b) => a.label.localeCompare(b.label));
    });
    const groups = [];
    if (favorites.length > 0)
        groups.push({ label: 'US/CANADA', options: favorites });
    if (territories.length > 0) {
        groups.push({ label: 'US TERRITORIES', options: territories });
    }
    const sortedRegions = Object.keys(byRegion).sort();
    sortedRegions.forEach(region => {
        groups.push({ label: region, options: byRegion[region] });
    });
    return groups;
}
function isSelected(groups, value) {
    if (!value)
        return undefined;
    for (const group of groups) {
        const match = group.options.find(opt => opt.value === value);
        if (match)
            return match;
    }
    return undefined;
}
function offsetTextFor(tz) {
    var _a;
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'shortOffset'
    });
    const parts = ((_a = dtf.formatToParts(new Date()).find(x => x.type === 'timeZoneName')) === null || _a === void 0 ? void 0 : _a.value) || '';
    return parts.replace('GMT', 'UTC');
}
const TimeZonePicker = (props) => {
    const { value, labels, onChange, className, classNamePrefix, name, noOptionsMessage, styles } = props;
    const groups = buildGroupsFromLabels(labels);
    const selected = isSelected(groups, value);
    return (React__default.createElement(Select, { options: groups, value: selected, onChange: (opt) => onChange(opt ? opt.value : null), className: className, classNamePrefix: classNamePrefix, name: name, noOptionsMessage: noOptionsMessage, styles: styles, formatOptionLabel: (opt) => (React__default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', width: '100%' } },
            React__default.createElement("span", null, opt.label),
            React__default.createElement("span", { className: "tz-offset d-none" }, offsetTextFor(opt.value)))) }));
};

const Container = styled('div') `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  --text-color-rgb: ${({ $textColorRGB }) => $textColorRGB};
  --primary-color-text-shade-rgb: ${({ $calendarColoredTextRGB }) => $calendarColoredTextRGB};
  --background-color-rgb: ${({ $backgroundColorRGB }) => $backgroundColorRGB};
  --background-color-contrast-rgb: ${({ $backgroundColorContrastRGB }) => $backgroundColorContrastRGB};
  --primary-color-rgb: ${({ $primaryColorRGB }) => $primaryColorRGB};
  --primary-color-contrast-rgb: ${({ $primaryColorContrastRGB }) => $primaryColorContrastRGB};
  --border-radius: ${({ $borderRadius }) => $borderRadius}px;
`;
const Inner = styled('div') `
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const Divider = styled('div') `
  width: 1px;
  background: rgba(200, 200, 200);
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;
const CalendarContainer = styled('div') `
  padding: ${({ $hideLeftPanel }) => $hideLeftPanel ? '0' : '0 4rem'};
  flex: none;
  width: ${({ $hideLeftPanel }) => $hideLeftPanel ? '0px' : '50%'};
  min-width: 0;
  overflow: hidden;
  transition: width 0.35s ease, padding 0.25s ease;
`;
const OverlayMessageWrapper = styled('div') `
    height: auto;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    display: flex;
`;
const OverlayMessage = styled('div') `
  color: white;
  display: block;
  position: absolute;
  background: black;
  opacity: 0.7;
  padding: 4rem;
  border-radius: 3rem;
  z-index: 2;
`;
const StartTimeListContainer = styled('div') `
  flex: 1;
  overflow-y: scroll;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;
const StartTimeListContainerAbsolute = styled('div') `
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SelectedDayTitle = styled('h3') `
  width: 100%;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  color: rgba(var(--text-color-rgb), 1);
`;
const Header = styled('div') `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;
const ArrowButton = styled('button') `
  outline: none;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  opacity: 0.4;
  margin: 0;
  color: rgba(var(--text-color-rgb), 0.7);
  &:hover {
    opacity: 0.7;
    background: rgba(var(--background-color-contrast-rgb), 0.06);
  }
`;
const TimezoneContainer = styled('div') `
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
styled('div') `
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 2rem;
`;
const DurationHeaderContainer = styled('div') `
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 3rem;
  margin-right: 3rem;
  background: var(--bs-gray-600);
  padding: 0.25rem;
  color: white;
`;
const ScheduleMeeting = ({ prefixSection, suffixSection, scheduler = {}, availableTimeslots = [], backgroundColor = '#ffffff', borderRadius = 0, className, defaultDate, emptyListContentEl, eventDurationInMinutes = 30, eventStartTimeSpreadInMinutes = 0, loading = true, submitting = false, format_nextFutureStartTimeAvailableFormatString = 'cccc, LLLL do', format_selectedDateDayTitleFormatString = 'cccc, LLLL do', format_selectedDateMonthTitleFormatString = 'LLLL yyyy', format_startTimeFormatString = 'h:mm a zzz', lang_cancelButtonText = '', lang_confirmButtonText = 'Confirm', lang_emptyListText = 'No times available', lang_goToNextAvailableDayText = 'Next Available', lang_noFutureTimesText = 'No future times available', lang_selectedButtonText = 'Selected:', locale, onTimeZoneChange, onNoFutureTimesAvailable, onSelectedDayChange, onStartTimeSelect, onActiveStartDateChange, primaryColor = '#3f5b85', scheduleMeetingStyles, selectedStartTime: _selectedStartTime, skipConfirmCheck = false, startTimeListStyle = 'grid', textColor, eventList = [], blackoutDates = {}, tzLabels, eventComponent, noEventComponent, ignoreScheduler = false, setDateToShow }) => {
    const primaryColorRGB = Color(primaryColor).rgb().array().join(',');
    const backgroundColorRGB = Color(backgroundColor).rgb().array().join(',');
    const isBackgroundColorDark = Color(backgroundColor).isDark();
    const textColorRGB = textColor || (isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34');
    const primaryColorContrastRGB = Color(primaryColor).isDark() ? '255, 255, 255' : '34, 34, 34';
    const backgroundColorContrastRGB = isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34';
    const calendarColoredTextRGB = isBackgroundColorDark
        ? Color(primaryColor).lighten(0.5).rgb().array().join(',')
        : Color(primaryColor).darken(0.5).rgb().array().join(',');
    const [selectedStartTime, setSelectedStartTime] = useState(_selectedStartTime ? _selectedStartTime.getTime() : undefined);
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [timezone, setTimezone] = useState(scheduler.timezone || 'America/Chicago');
    useState(scheduler.clock_notation || 12);
    const [startTimeEventsList, setStartTimeEventsList] = useState([]);
    const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = useState([]);
    const [nextFutureStartTimeAvailable, setNextFutureStartTimeAvailable] = useState();
    const [orderedAvailableTimeslots, setOrderedAvailableTimeslots] = useState([]);
    const [timeslotsLoading, setTimeslotsLoading] = useState(false);
    const [hideLeftPanel, setHideLeftPanel] = useState(false);
    const buildStartTimeEvents = (tz) => {
        const startTimeEvents = [];
        for (const availableTimeslot of orderedAvailableTimeslots) {
            const timeslotDuration = differenceInMinutes(new Date(availableTimeslot.endTime), new Date(availableTimeslot.startTime));
            let startTimesPossible = Math.floor(timeslotDuration / (eventDurationInMinutes + eventStartTimeSpreadInMinutes)) - 1;
            while (startTimesPossible >= 0) {
                startTimeEvents.push({
                    timezone: tz,
                    availableTimeslot,
                    startTime: addMinutes(new Date(availableTimeslot.startTime), startTimesPossible * (eventDurationInMinutes + eventStartTimeSpreadInMinutes)),
                });
                startTimesPossible--;
            }
        }
        return startTimeEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    };
    const _timezoneIds = Intl.supportedValuesOf('timeZone');
    useEffect(() => {
        setSelectedStartTime(_selectedStartTime ? _selectedStartTime.getTime() : undefined);
    }, [_selectedStartTime]);
    useEffect(() => {
        const _orderedAvailableTimeslots = [...availableTimeslots];
        _orderedAvailableTimeslots.sort((a, b) => {
            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });
        setOrderedAvailableTimeslots(_orderedAvailableTimeslots);
    }, [availableTimeslots]);
    useEffect(() => {
        const orderedStartTimeEvents = buildStartTimeEvents(timezone);
        if (defaultDate) {
            setSelectedDay(fromZonedTime(defaultDate, timezone));
        }
        setStartTimeEventsList(orderedStartTimeEvents);
    }, [orderedAvailableTimeslots, eventDurationInMinutes, eventStartTimeSpreadInMinutes, defaultDate, timezone]);
    const handleTimezoneChange = (iana) => {
        if (!iana)
            return;
        const newSelectedDay = createZonedDate(selectedDay, iana);
        setTimeslotsLoading(true);
        setTimezone(iana);
        setSelectedDay(newSelectedDay);
        if (defaultDate) {
            setSelectedDay(createZonedDate(defaultDate, iana));
        }
        onTimeZoneChange === null || onTimeZoneChange === void 0 ? void 0 : onTimeZoneChange(iana);
    };
    _timezoneIds.map((tz) => ({ value: tz, label: tz }));
    const onDaySelected = (day) => {
        setSelectedDay(day);
        onSelectedDayChange && onSelectedDayChange(day);
    };
    const splitTimeslot = (startTimeEvent) => {
        const splitTimeslots = [null, null];
        const minutesIntoTimeslotEventWillStart = differenceInMinutes(startTimeEvent.startTime, new Date(startTimeEvent.availableTimeslot.startTime));
        if (minutesIntoTimeslotEventWillStart !== 0) {
            const newFirstTimeslot = {
                oldId: startTimeEvent.availableTimeslot.id,
                startTime: startTimeEvent.availableTimeslot.startTime,
                endTime: addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart),
            };
            splitTimeslots[0] = newFirstTimeslot;
        }
        const startTimeOfEndingSplitTimeslot = addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart + eventDurationInMinutes);
        if (differenceInMinutes(startTimeOfEndingSplitTimeslot, new Date(startTimeEvent.availableTimeslot.endTime)) !== 0) {
            const newSecondTimeslot = {
                oldId: startTimeEvent.availableTimeslot.id,
                startTime: startTimeOfEndingSplitTimeslot,
                endTime: startTimeEvent.availableTimeslot.endTime,
            };
            splitTimeslots[1] = newSecondTimeslot;
        }
        return splitTimeslots;
    };
    const _onStartTimeSelect = (startTimeEvent) => {
        const splitTimeslots = splitTimeslot(startTimeEvent);
        const startTimeEventEmitObject = Object.assign(Object.assign({}, startTimeEvent), { timezone: timezone, splitTimeslot: splitTimeslots, resetDate: () => setSelectedDay(defaultDate ? fromZonedTime(defaultDate, timezone) : new Date()), resetSelectedTimeState: () => setSelectedStartTime(undefined) });
        setSelectedStartTime(startTimeEvent.startTime.getTime());
        if (onStartTimeSelect) {
            onStartTimeSelect(startTimeEventEmitObject);
        }
    };
    const isSameDay = (a, b) => {
        return formatInTimeZone(a, timezone, 'yyyy-MM-dd') == formatInTimeZone(b, timezone, 'yyyy-MM-dd');
    };
    const isSameMonth = (a, b) => {
        return formatInTimeZone(a, timezone, 'yyyy-MM') == formatInTimeZone(b, timezone, 'yyyy-MM');
    };
    const hasEventsOnDay = (day, events, tz) => {
        return events.some((ev) => {
            if (!ev || !ev.start)
                return false;
            const parsedEventStart = parseISO(ev.start);
            if (!isValid(parsedEventStart))
                return false;
            const eventDate = formatInTimeZone(parsedEventStart, tz, 'yyyy-MM-dd');
            const selectedDate = formatInTimeZone(day, tz, 'yyyy-MM-dd');
            return eventDate === selectedDate;
        });
    };
    const selectedDayHasEvents = hasEventsOnDay(selectedDay, eventList, timezone);
    useEffect(() => {
        var _a;
        const startTimeEventsToDisplay = [];
        for (const startTimeEvent of startTimeEventsList) {
            if (isSameDay(new Date(startTimeEvent.startTime), selectedDay)) {
                if (startTimeEventsToDisplay.filter((item) => isSameMinute(item.startTime, startTimeEvent.startTime)).length === 0) {
                    if (!isPast(startTimeEvent.startTime)) {
                        startTimeEventsToDisplay.push(startTimeEvent);
                    }
                }
            }
        }
        const orderedEvents = startTimeEventsToDisplay.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        const _nextFutureStartTimeAvailable = (_a = startTimeEventsList.find((startTime) => isAfter(startTime.startTime, selectedDay))) === null || _a === void 0 ? void 0 : _a.startTime;
        if (startTimeEventsList.length > 0 &&
            onNoFutureTimesAvailable &&
            !_nextFutureStartTimeAvailable &&
            orderedEvents.length === 0) {
            onNoFutureTimesAvailable(selectedDay);
        }
        setNextFutureStartTimeAvailable(_nextFutureStartTimeAvailable);
        setSelectedDayStartTimeEventsList(orderedEvents);
    }, [selectedDay, startTimeEventsList]);
    useEffect(() => {
        if (!timeslotsLoading)
            return;
        let raf1 = 0;
        let raf2 = 0;
        raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                setTimeslotsLoading(false);
            });
        });
        return () => {
            if (raf1)
                cancelAnimationFrame(raf1);
            if (raf2)
                cancelAnimationFrame(raf2);
        };
    }, [startTimeEventsList, timeslotsLoading]);
    const updateCalendar = (activeStartDate) => {
        const timezonedActiveStartDate = fromZonedTime(activeStartDate, timezone);
        const timezonedSelectedDay = fromZonedTime(selectedDay, timezone);
        const sameMonth = isSameMonth(timezonedSelectedDay, timezonedActiveStartDate);
        setSelectedDay(timezonedActiveStartDate);
        if (sameMonth) {
            return null;
        }
        return onActiveStartDateChange && onActiveStartDateChange(timezonedActiveStartDate);
    };
    const goToPreviousMonth = () => {
        updateCalendar(subMonths(selectedDay, 1));
    };
    const goToNextMonth = () => {
        updateCalendar(addMonths(selectedDay, 1));
    };
    const handleGoToNextAvailableDay = () => {
        if (nextFutureStartTimeAvailable) {
            setSelectedDay(nextFutureStartTimeAvailable);
        }
    };
    const renderOverlayMessage = () => {
        if (loading) {
            return (React__default.createElement(OverlayMessageWrapper, null,
                React__default.createElement(OverlayMessage, null,
                    React__default.createElement("h3", null, "Loading..."),
                    React__default.createElement("div", { className: 'loader space-above-2' }))));
        }
        else if (submitting) {
            return (React__default.createElement(OverlayMessageWrapper, null,
                React__default.createElement(OverlayMessage, null,
                    React__default.createElement("h3", null, "Submitting..."),
                    React__default.createElement("div", { className: 'loader space-above-2' }))));
        }
    };
    const overlay_opacity = () => {
        let shown = (loading || submitting);
        return (shown ? '0.25' : '1');
    };
    const Prefix = () => {
        if (!prefixSection) {
            return (React__default.createElement(React__default.Fragment, null));
        }
        return (React__default.createElement(React__default.Fragment, null,
            prefixSection,
            React__default.createElement(Divider, null)));
    };
    const Suffix = () => {
        if (!suffixSection) {
            return (React__default.createElement(React__default.Fragment, null));
        }
        return (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Divider, null),
            suffixSection));
    };
    return (React__default.createElement(Container, { className: className, "$primaryColorRGB": primaryColorRGB, "$borderRadius": borderRadius, style: scheduleMeetingStyles, "$backgroundColorContrastRGB": backgroundColorContrastRGB, "$textColorRGB": textColorRGB, "$backgroundColorRGB": backgroundColorRGB, "$primaryColorContrastRGB": primaryColorContrastRGB, "$calendarColoredTextRGB": calendarColoredTextRGB },
        React__default.createElement(Inner, { className: "rs-container" },
            renderOverlayMessage(),
            React__default.createElement(Prefix, null),
            React__default.createElement(CalendarContainer, { className: "rs-calendar-container", style: { opacity: overlay_opacity() }, "$hideLeftPanel": hideLeftPanel },
                React__default.createElement(TimezoneContainer, { className: "rs-timezone-container" },
                    React__default.createElement("div", { className: 'd-flex flex-column gap-3' },
                        React__default.createElement("span", { className: 'fw-bold' }, "Time Zone"),
                        React__default.createElement("style", null, `
                .rselect__control { min-width: 36rem; }
                .rselect__menu    { width: 40rem; }
                .rselect__menu-list { width: 100%; }

                .rselect__option .tz-offset { color: #9ca3af; }
                .rselect__option--is-focused .tz-offset,
                .rselect__option--is-selected .tz-offset { color: #fff; }
              `),
                        React__default.createElement(TimeZonePicker, { value: timezone, labels: tzLabels, onChange: handleTimezoneChange, className: "sclass", classNamePrefix: "rselect", name: "timezone", noOptionsMessage: () => "No timezones found", styles: { container: (base) => (Object.assign(Object.assign({}, base), { width: "40rem" })) } }))),
                React__default.createElement(Header, null,
                    React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", onClick: goToPreviousMonth },
                        React__default.createElement(Arrow, { direction: "back" })),
                    React__default.createElement(SelectedDayTitle, { className: "rsm-date-title" }, formatInTimeZone(selectedDay, timezone, format_selectedDateMonthTitleFormatString)),
                    React__default.createElement(ArrowButton, { type: "button", className: "rsm-arrow-button", onClick: goToNextMonth },
                        React__default.createElement(Arrow, { direction: "forward" }))),
                React__default.createElement("div", { className: "d-flex justify-content-center" },
                    React__default.createElement("button", { className: "btn btn-link text-positive text-decoration-underline", onClick: () => setSelectedDay(new Date()) }, "Jump to Today")),
                React__default.createElement(ScheduleCalendar, { locale: locale, selectedDay: selectedDay, startTimeEventsList: startTimeEventsList, onDaySelected: onDaySelected, timezone: timezone, eventList: eventList, blackoutDates: blackoutDates, ignoreScheduler: ignoreScheduler, setDateToShow: setDateToShow })),
            React__default.createElement(Divider, null),
            React__default.createElement(StartTimeListContainer, { className: "rs-timelist-container", style: { opacity: overlay_opacity() } },
                React__default.createElement(StartTimeListContainerAbsolute, null, selectedDayHasEvents ? (eventComponent ? React__default.cloneElement(eventComponent, { events: eventList, selectedDate: selectedDay, timezone }) : null) : (noEventComponent ? React__default.cloneElement(noEventComponent, { selectedDate: selectedDay, timezone, blackoutDates, setHideLeftPanel }) : (timeslotsLoading ? (
                React__default.createElement("div", { className: "d-flex justify-content-center align-items-center gap-3" },
                    React__default.createElement("div", { className: "spinner-border", role: "status" },
                        React__default.createElement("span", { className: "visually-hidden" }, "Loading...")),
                    React__default.createElement("div", null, "Loading timeslots..."))) : (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement(DurationHeaderContainer, null,
                        React__default.createElement("span", { className: "fw-bold fs-1 me-1" }, eventDurationInMinutes),
                        React__default.createElement("span", { className: "fs-3" }, "minutes")),
                    React__default.createElement(Header, null,
                        React__default.createElement(SelectedDayTitle, { className: "rsm-date-title" }, formatInTimeZone(selectedDay, timezone, format_selectedDateDayTitleFormatString))),
                    React__default.createElement(StartTimeList, { skipConfirmCheck: skipConfirmCheck, selectedDay: selectedDay, selectedStartTime: selectedStartTime, locale: locale, format_nextFutureStartTimeAvailableFormatString: format_nextFutureStartTimeAvailableFormatString, nextFutureStartTimeAvailable: nextFutureStartTimeAvailable, lang_goToNextAvailableDayText: lang_goToNextAvailableDayText, lang_noFutureTimesText: lang_noFutureTimesText, onGoToNextAvailableDayClick: handleGoToNextAvailableDay, lang_confirmButtonText: lang_confirmButtonText, lang_cancelButtonText: lang_cancelButtonText, lang_emptyListText: lang_emptyListText, lang_selectedButtonText: lang_selectedButtonText, emptyListContentEl: emptyListContentEl, onStartTimeSelect: _onStartTimeSelect, startTimeListItems: selectedDayStartTimeEventsList, format_startTimeFormatString: format_startTimeFormatString, startTimeListStyle: startTimeListStyle, setSelectedStartTime: setSelectedStartTime, timezone: timezone, eventDurationInMinutes: eventDurationInMinutes }))))))),
            React__default.createElement(Suffix, null))));
};

function timeSlotDifference(availableTimeSlots, unavailableTimeSlots) {
    if (!availableTimeSlots || !unavailableTimeSlots)
        return [];
    const _orderedAvailableTimeSlots = [...availableTimeSlots];
    const _unavailableTimeSlots = [...unavailableTimeSlots];
    _orderedAvailableTimeSlots.sort((a, b) => {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
    let cursorIndex = 0;
    while (cursorIndex < _orderedAvailableTimeSlots.length) {
        const availableSlot = _orderedAvailableTimeSlots[cursorIndex];
        try {
            const availableSlotStartTime = new Date(availableSlot.startTime);
            const availableSlotEndTime = new Date(availableSlot.endTime);
            if (typeof availableSlot.startTime === 'string') {
                availableSlot.startTime = availableSlotStartTime;
            }
            if (typeof availableSlot.endTime === 'string') {
                availableSlot.endTime = availableSlotEndTime;
            }
            for (const unavailableSlot of _unavailableTimeSlots) {
                try {
                    const unavailableSlotStartTime = new Date(unavailableSlot.startTime);
                    const unavailableSlotEndTime = new Date(unavailableSlot.endTime);
                    if (typeof unavailableSlot.startTime === 'string') {
                        unavailableSlot.startTime = unavailableSlotStartTime;
                    }
                    if (typeof unavailableSlot.endTime === 'string') {
                        unavailableSlot.endTime = unavailableSlotEndTime;
                    }
                    if (isBefore(unavailableSlotStartTime, availableSlotStartTime) ||
                        isEqual(unavailableSlotStartTime, availableSlotStartTime)) {
                        if (isBefore(availableSlotStartTime, unavailableSlotEndTime)) {
                            if (isBefore(unavailableSlotEndTime, availableSlotEndTime)) {
                                availableSlot.startTime = unavailableSlotEndTime;
                            }
                            else {
                                _orderedAvailableTimeSlots.splice(cursorIndex, 1);
                                cursorIndex--;
                            }
                        }
                    }
                    else if (isBefore(unavailableSlotStartTime, availableSlotEndTime)) {
                        if (isBefore(unavailableSlotEndTime, availableSlotEndTime)) {
                            const newSlot = Object.assign(Object.assign({}, availableSlot), { startTime: unavailableSlotEndTime });
                            availableSlot.endTime = unavailableSlotStartTime;
                            _orderedAvailableTimeSlots.splice(cursorIndex + 1, 0, newSlot);
                            cursorIndex--;
                        }
                        else {
                            availableSlot.endTime = unavailableSlotStartTime;
                        }
                    }
                }
                catch (err) {
                    console.error('Invalid Date for unavailable slot: ', unavailableSlot);
                    throw err;
                }
            }
        }
        catch (err) {
            console.error('Invalid Date for available slot: ', availableSlot);
            throw err;
        }
        cursorIndex++;
    }
    return _orderedAvailableTimeSlots;
}

export { ScheduleMeeting, timeSlotDifference };
