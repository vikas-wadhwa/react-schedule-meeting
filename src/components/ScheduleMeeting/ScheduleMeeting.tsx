import {
  Locale,
  addDays,
  addMinutes,
  addMonths,
  differenceInMinutes,
  format,
  isAfter,
  isPast,
  isSameMinute,
  isToday,
  subDays,
  subMonths,
} from 'date-fns';

import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';
import { Arrow } from '../ArrowSVG';
import Color from 'color';
import ScheduleCalendar from './ScheduleCalendar';
import StartTimeList from './StartTimeList';
import { styled } from 'goober';

type StyleVariables = {
  $borderRadius: number;
  $primaryColorRGB: string;
  $textColorRGB: string;
  $backgroundColorContrastRGB: string;
  $backgroundColorRGB: string;
  $primaryColorContrastRGB: string;
  $calendarColoredTextRGB: string;
};

const Container = styled('div')<StyleVariables>`
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

const Inner = styled('div')`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Divider = styled('div')`
  width: 1px;
  background: rgba(0, 0, 0);
  margin: 1.75rem;
  @media (max-width: 768px) {
    width: auto;
    height: 1px;
  }
`;

const CalendarContainer = styled('div')`
  flex: 1.5;
`;

const OverlayMessageWrapper = styled('div')`
    height: auto;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const OverlayMessage = styled('div')`
  color: white;
  display: block;
  position: absolute;
  background: black;
  opacity: 0.7;
  padding: 4rem;
  border-radius: 3rem;
  z-index: 2;
`;


const StartTimeListContainer = styled('div')`
  flex: 1;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    min-height: 301px;
  }
`;

const StartTimeListContainerAbsolute = styled('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// const PrefixListContainer = styled('div')`
//   flex: 1;
//   overflow: hidden;
//   position: relative;
//   @media (max-width: 768px) {
//     min-height: 301px;
//   }
// `;

// const PrefixListContainerAbsolute = styled('div')`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// const SuffixListContainer = styled('div')`
//   flex: 1;
//   overflow: hidden;
//   position: relative;
//   @media (max-width: 768px) {
//     min-height: 301px;
//   }
// `;

// const SuffixListContainerAbsolute = styled('div')`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
// `;

const SelectedDayTitle = styled('h3')`
  width: 100%;
  margin: 0;
  padding: 0;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  color: rgba(var(--text-color-rgb), 1);
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const ArrowButton = styled('button')`
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

const TimezoneContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ClockNotationContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 2rem;
`;

const DurationHeaderContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 3rem;
  margin-right: 3rem;
  background: var(--bs-gray-600);
  padding: 0.25rem;
  color: white;
`;


export type PrefixSection = {
  id?: string | number | undefined;
  className?: string;
};

export type SuffixSection = {
  id?: string | number | undefined;
  className?: string;
};

export type AvailableTimeslot = {
  startTime: Date | string;
  endTime: Date | string;
  id?: string | number | undefined;
};

export type Scheduler = {
  id: string | number | undefined;
  title: string;
  description: string;
  duration: string;
  tzid: string;
  clock_notation: number;
};

export type SplitTimeslot = null | ModifiedTimeslot;

export type ModifiedTimeslot = AvailableTimeslot & {
  oldId: string | number | undefined;
};

export type StartTimeEvent = {
  availableTimeslot: AvailableTimeslot;
  startTime: Date;
};

export type StartTimeEventEmit = StartTimeEvent & {
  splitTimeslot?: [SplitTimeslot, SplitTimeslot];
  resetDate: () => void;
  resetSelectedTimeState: () => void;
};

type Props = {
  prefixSection: PrefixSection;
  suffixSection: SuffixSection;
  scheduler: Scheduler;
  availableTimeslots: AvailableTimeslot[];
  backgroundColor?: string;
  borderRadius?: number;
  className?: string;
  defaultDate?: Date;
  emptyListContentEl?: React.ElementType;
  eventDurationInMinutes: number;
  eventStartTimeSpreadInMinutes?: number;
  loading?: boolean;
  submitting?: boolean;
  format_nextFutureStartTimeAvailableFormatString?: string;
  format_selectedDateDayTitleFormatString?: string;
  format_selectedDateMonthTitleFormatString?: string;
  format_startTimeFormatString?: string;
  lang_cancelButtonText?: string;
  lang_confirmButtonText?: string;
  lang_emptyListText?: string;
  lang_goToNextAvailableDayText?: string;
  lang_noFutureTimesText?: string;
  lang_selectedButtonText?: string;
  locale?: Locale;
  onNoFutureTimesAvailable?: (selectedDate: Date) => void;
  onSelectedDayChange?: (day: Date) => void;
  onStartTimeSelect?: (startTimeEventEmit: StartTimeEventEmit) => void;
  onActiveStartDateChange?: (activeStartDate: Date) => void;
  primaryColor?: string;
  scheduleMeetingStyles?: React.CSSProperties;
  selectedStartTime?: Date;
  skipConfirmCheck?: boolean;
  startTimeListStyle?: 'scroll-list' | 'grid';
  textColor?: string;
};

export const ScheduleMeeting: React.FC<Props> = ({
  prefixSection,
  suffixSection,
  scheduler = {},
  availableTimeslots = [],
  backgroundColor = '#ffffff',
  borderRadius = 0,
  className,
  defaultDate,
  emptyListContentEl,
  eventDurationInMinutes = 30,
  eventStartTimeSpreadInMinutes = 0,
  loading = true,
  submitting = false,
  format_nextFutureStartTimeAvailableFormatString = 'cccc, LLLL do',
  format_selectedDateDayTitleFormatString = 'cccc, LLLL do',
  format_selectedDateMonthTitleFormatString = 'LLLL yyyy',
  format_startTimeFormatString = 'h:mm a zzz',
  lang_cancelButtonText = '',
  lang_confirmButtonText = 'Confirm',
  lang_emptyListText = 'No times available',
  lang_goToNextAvailableDayText = 'Next Available',
  lang_noFutureTimesText = 'No future times available',
  lang_selectedButtonText = 'Selected:',
  locale,
  onNoFutureTimesAvailable,
  onSelectedDayChange,
  onStartTimeSelect,
  onActiveStartDateChange,
  primaryColor = '#3f5b85',
  scheduleMeetingStyles,
  selectedStartTime: _selectedStartTime,
  skipConfirmCheck = false,
  startTimeListStyle = 'grid',
  textColor,
}) => {
  const primaryColorRGB = Color(primaryColor).rgb().array().join(',');
  const backgroundColorRGB = Color(backgroundColor).rgb().array().join(',');
  const isBackgroundColorDark = Color(backgroundColor).isDark();
  const textColorRGB = textColor || (isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34');
  const primaryColorContrastRGB = Color(primaryColor).isDark() ? '255, 255, 255' : '34, 34, 34';
  const backgroundColorContrastRGB = isBackgroundColorDark ? '255, 255, 255' : '34, 34, 34';
  const calendarColoredTextRGB = isBackgroundColorDark
    ? Color(primaryColor).lighten(0.5).rgb().array().join(',')
    : Color(primaryColor).darken(0.5).rgb().array().join(',');

  const [selectedStartTime, setSelectedStartTime] = useState<number | undefined>(
    _selectedStartTime ? _selectedStartTime.getTime() : undefined,
  );
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [timezone, setTimezone] = useState(scheduler.tzid || 'America/Chicago');
  const [clockNotation, setClockNotation] = useState<number | string>(scheduler.clock_notation || 12);
  const [startTimeEventsList, setStartTimeEventsList] = useState([] as StartTimeEvent[]);
  const [selectedDayStartTimeEventsList, setSelectedDayStartTimeEventsList] = useState([] as StartTimeEvent[]);
  const [nextFutureStartTimeAvailable, setNextFutureStartTimeAvailable] = useState<undefined | Date>();

  const [orderedAvailableTimeslots, setOrderedAvailableTimeslots] = useState<AvailableTimeslot[]>([]);

  const _timezoneIds: string [] = Intl.supportedValuesOf('timeZone');

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

  const onTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value);
  }

  const onDaySelected = (day: Date) => {
    setSelectedDay(day);
    onSelectedDayChange && onSelectedDayChange(day);
  };

  const splitTimeslot = (startTimeEvent: StartTimeEvent) => {
    const splitTimeslots: [SplitTimeslot, SplitTimeslot] = [null, null];
    const minutesIntoTimeslotEventWillStart = differenceInMinutes(
      startTimeEvent.startTime,
      new Date(startTimeEvent.availableTimeslot.startTime),
    );

    if (minutesIntoTimeslotEventWillStart !== 0) {
      const newFirstTimeslot: SplitTimeslot = {
        oldId: startTimeEvent.availableTimeslot.id,
        startTime: startTimeEvent.availableTimeslot.startTime,
        endTime: addMinutes(new Date(startTimeEvent.availableTimeslot.startTime), minutesIntoTimeslotEventWillStart),
      };
      splitTimeslots[0] = newFirstTimeslot;
    }

    const startTimeOfEndingSplitTimeslot = addMinutes(
      new Date(startTimeEvent.availableTimeslot.startTime),
      minutesIntoTimeslotEventWillStart + eventDurationInMinutes,
    );
    if (differenceInMinutes(startTimeOfEndingSplitTimeslot, new Date(startTimeEvent.availableTimeslot.endTime)) !== 0) {
      const newSecondTimeslot: SplitTimeslot = {
        oldId: startTimeEvent.availableTimeslot.id,
        startTime: startTimeOfEndingSplitTimeslot,
        endTime: startTimeEvent.availableTimeslot.endTime,
      };
      splitTimeslots[1] = newSecondTimeslot;
    }

    return splitTimeslots;
  };

  const _onStartTimeSelect = (startTimeEvent: StartTimeEvent) => {
    const splitTimeslots = splitTimeslot(startTimeEvent);
    const startTimeEventEmitObject: StartTimeEventEmit = {
      ...startTimeEvent,
      splitTimeslot: splitTimeslots,
      resetDate: () => setSelectedDay(defaultDate || new Date()),
      resetSelectedTimeState: () => setSelectedStartTime(undefined),
    };

    setSelectedStartTime(startTimeEvent.startTime.getTime());

    if (onStartTimeSelect) {
      onStartTimeSelect(startTimeEventEmitObject);
    }
  };

  const isSameDay = (a: Date, b: Date) => {
    return formatInTimeZone(a, timezone, 'yyyy-mm-dd') == formatInTimeZone(b, timezone, 'yyyy-mm-dd')
  }

  useEffect(() => {
    // compile a list of all possible event start times given all timeslots
    const startTimeEvents = [];

    // iterate through all available timeslots
    for (const availableTimeslot of orderedAvailableTimeslots) {
      const timeslotDuration = differenceInMinutes(
        new Date(availableTimeslot.endTime),
        new Date(availableTimeslot.startTime),
      );

      // this prevents start times from being created where the event duration runs past the available timeslot
      let startTimesPossible =
        Math.floor(timeslotDuration / (eventDurationInMinutes + eventStartTimeSpreadInMinutes)) - 1;

      while (startTimesPossible >= 0) {
        const newStartTimeEvent: StartTimeEvent = {
          availableTimeslot,
          startTime: addMinutes(
            new Date(availableTimeslot.startTime),
            startTimesPossible * (eventDurationInMinutes + eventStartTimeSpreadInMinutes),
          ),
        };
        startTimeEvents.push(newStartTimeEvent);
        startTimesPossible--;
      }
    }

    // set initial display date
    if (defaultDate) {
      setSelectedDay(defaultDate);
    }
    setStartTimeEventsList(startTimeEvents);
  }, [orderedAvailableTimeslots, eventDurationInMinutes, eventStartTimeSpreadInMinutes, defaultDate]);

  useEffect(() => {
    const startTimeEventsToDisplay: StartTimeEvent[] = [];

    // filter out startTimeEvents so we get the list of ones to display next to the calendar
    for (const startTimeEvent of startTimeEventsList) {
      // make sure its the same day as the selected day
      if (isSameDay(new Date(startTimeEvent.startTime), selectedDay)) {
        // prevents duplicate times (in case there are multiple overlapping shifts)
        if (
          startTimeEventsToDisplay.filter((item: StartTimeEvent) =>
            isSameMinute(item.startTime, startTimeEvent.startTime),
          ).length === 0
        ) {
          if (!isPast(startTimeEvent.startTime)) {
            startTimeEventsToDisplay.push(startTimeEvent);
          }
        }
      }
    }

    // order the events by first in the day
    const orderedEvents = startTimeEventsToDisplay.sort(
      (a: StartTimeEvent, b: StartTimeEvent) => a.startTime.getTime() - b.startTime.getTime(),
    );

    const _nextFutureStartTimeAvailable = startTimeEventsList.find(
      (startTime) => isAfter(startTime.startTime, selectedDay) && !isToday(startTime.startTime),
    )?.startTime;

    if (
      startTimeEventsList.length > 0 &&
      onNoFutureTimesAvailable &&
      !_nextFutureStartTimeAvailable &&
      orderedEvents.length === 0
    ) {
      onNoFutureTimesAvailable(selectedDay);
    }

    setNextFutureStartTimeAvailable(_nextFutureStartTimeAvailable);
    setSelectedDayStartTimeEventsList(orderedEvents);
  }, [selectedDay, startTimeEventsList]);


  const updateCalendar = (activeStartDate: Date) => {
    const sameMonth = selectedDay.getMonth() == activeStartDate.getMonth();
    setSelectedDay(activeStartDate);

    if (sameMonth) {return null}
    return onActiveStartDateChange && onActiveStartDateChange(activeStartDate);
  };

  const goToPreviousMonth = () => {
    updateCalendar(subMonths(selectedDay, 1));
  };

  const goToNextMonth = () => {
    updateCalendar(addMonths(selectedDay, 1));
  };

  const goToPreviousDay = () => {
    updateCalendar(subDays(selectedDay, 1));
  };

  const goToNextDay = () => {
    updateCalendar(addDays(selectedDay, 1));
  };

  const handleGoToNextAvailableDay = () => {
    if (nextFutureStartTimeAvailable) {
      setSelectedDay(nextFutureStartTimeAvailable);
    }
  };

  const renderOverlayMessage = () => {
    if (loading) {
      return(
        <OverlayMessageWrapper>
          <OverlayMessage>
            <h3>Loading...</h3>
            <div className='loader space-above-2'></div>
          </OverlayMessage>
        </OverlayMessageWrapper>
      )
    }

    else if (submitting) {
      return(
        <OverlayMessageWrapper>
          <OverlayMessage>
            <h3>Submitting...</h3>
            <div className='loader space-above-2'></div>
          </OverlayMessage>
        </OverlayMessageWrapper>
      )
    }
  };

  const overlay_opacity = () => {
    let shown = (loading || submitting);

    return (shown ? '0.25' : '1')
  }

  const Prefix = () => {
    if (!prefixSection){return(<></>)}

    return (
      <>
        {prefixSection}
        <Divider />
      </>
    )
  }

  const Suffix = () => {
    if (!suffixSection){return(<></>)}

    return (
      <>
        <Divider />
        {suffixSection}
      </>
    )
  }

  return(
    <Container
      className={className}
      $primaryColorRGB={primaryColorRGB}
      $borderRadius={borderRadius}
      style={scheduleMeetingStyles}
      $backgroundColorContrastRGB={backgroundColorContrastRGB}
      $textColorRGB={textColorRGB}
      $backgroundColorRGB={backgroundColorRGB}
      $primaryColorContrastRGB={primaryColorContrastRGB}
      $calendarColoredTextRGB={calendarColoredTextRGB}
    >
      <Inner className="rs-container">
        {renderOverlayMessage()}

        <Prefix />


        <CalendarContainer className="rs-calendar-container" style={{opacity: overlay_opacity()}} >


          <TimezoneContainer className="rs-timezone-container">
            <div className='d-flex fw-bold' style={{width: '7.5rem'}}>Timezone</div>

            <select
              id='rs_timezone_picker'
              name='timezone'
              className='form-control d-flex'
              style={{width: '30rem'}}
              onChange={onTimezoneChange}
            >
              {_timezoneIds.map((tz) => (
                <option value={tz} selected={tz == timezone}>
                  {tz}
                </option>
              ))}
            </select>
          </TimezoneContainer>

{/*          <ClockNotationContainer className="rs-time-format-container">
            <ButtonGroup>
                <ToggleButton
                  key="rs-clock-notation-container-12"
                  id="rs-lock-notation-container-12"
                  type="radio"
                  name="radio"
                  variant={clockNotation == 12 ? 'dark' : 'outline-light'}
                  value={12}
                  checked={clockNotation == 12}
                  onChange={(e) => setClockNotation(e.currentTarget.value)}
                >
                  AM/PM
                </ToggleButton>

                <ToggleButton
                  key="rs-clock-notation-container-24"
                  id="rs-lock-notation-container-24"
                  type="radio"
                  name="radio"
                  variant={clockNotation == 24 ? 'dark' : 'outline-light'}
                  value={24}
                  checked={clockNotation == 24}
                  onChange={(e) => setClockNotation(e.currentTarget.value)}
                >
                  24h
                </ToggleButton>


            </ButtonGroup>
          </ClockNotationContainer>*/}

          <Header>
            <ArrowButton type="button" className="rsm-arrow-button" onClick={goToPreviousMonth}>
              <Arrow direction="back" />
            </ArrowButton>
            <SelectedDayTitle className="rsm-date-title">
              {formatInTimeZone(selectedDay, timezone, format_selectedDateMonthTitleFormatString)}
            </SelectedDayTitle>
            <ArrowButton type="button" className="rsm-arrow-button" onClick={goToNextMonth}>
              <Arrow direction="forward" />
            </ArrowButton>
          </Header>

          <ScheduleCalendar
            locale={locale}
            selectedDay={selectedDay}
            availableTimeslots={orderedAvailableTimeslots}
            onDaySelected={onDaySelected}
            timezone={timezone}
          />
        </CalendarContainer>

        <Divider />

        <StartTimeListContainer className="rs-timelist-container" style={{opacity: overlay_opacity()}}>
          <StartTimeListContainerAbsolute>

            <DurationHeaderContainer>
              <span className="fw-bold fs-1 me-1">{eventDurationInMinutes}</span>
              <span className="fs-3">minutes</span>
            </DurationHeaderContainer>

            <Header>
{/*              <ArrowButton type="button" className="rsm-arrow-button" onClick={goToPreviousDay}>
                <Arrow direction="back" />
              </ArrowButton>
*/}
              <SelectedDayTitle className="rsm-date-title">
                {formatInTimeZone(selectedDay, timezone, format_selectedDateDayTitleFormatString)}
              </SelectedDayTitle>

{/*              <ArrowButton type="button" className="rsm-arrow-button" onClick={goToNextDay}>
                <Arrow direction="forward" />
              </ArrowButton>*/}
            </Header>

            <StartTimeList
              skipConfirmCheck={skipConfirmCheck}
              selectedDay={selectedDay}
              selectedStartTime={selectedStartTime}
              locale={locale}
              format_nextFutureStartTimeAvailableFormatString={format_nextFutureStartTimeAvailableFormatString}
              nextFutureStartTimeAvailable={nextFutureStartTimeAvailable}
              lang_goToNextAvailableDayText={lang_goToNextAvailableDayText}
              lang_noFutureTimesText={lang_noFutureTimesText}
              onGoToNextAvailableDayClick={handleGoToNextAvailableDay}
              lang_confirmButtonText={lang_confirmButtonText}
              lang_cancelButtonText={lang_cancelButtonText}
              lang_emptyListText={lang_emptyListText}
              lang_selectedButtonText={lang_selectedButtonText}
              emptyListContentEl={emptyListContentEl}
              onStartTimeSelect={_onStartTimeSelect}
              startTimeListItems={selectedDayStartTimeEventsList}
              format_startTimeFormatString={format_startTimeFormatString}
              startTimeListStyle={startTimeListStyle}
              setSelectedStartTime={setSelectedStartTime}
              timezone={timezone}
              eventDurationInMinutes={eventDurationInMinutes}
            />
          </StartTimeListContainerAbsolute>
        </StartTimeListContainer>


        <Suffix />

      </Inner>
    </Container>
  );
};
