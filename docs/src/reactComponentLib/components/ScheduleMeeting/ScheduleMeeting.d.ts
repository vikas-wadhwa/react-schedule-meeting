import { Locale } from 'date-fns';
import React from 'react';
export type AvailableTimeslot = {
    startTime: Date | string;
    endTime: Date | string;
    id?: string | number | undefined;
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
    skipConfirmCheck?: boolean;
    eventDurationInMinutes: number;
    eventStartTimeSpreadInMinutes?: number;
    availableTimeslots: AvailableTimeslot[];
    onSelectedDayChange?: (day: Date) => void;
    onStartTimeSelect?: (startTimeEventEmit: StartTimeEventEmit) => void;
    scheduleMeetingStyles?: React.CSSProperties;
    emptyListContentEl?: React.ElementType;
    borderRadius?: number;
    primaryColor?: string;
    defaultDate?: Date;
    format_selectedDateMonthTitleFormatString?: string;
    format_selectedDateDayTitleFormatString?: string;
    format_startTimeFormatString?: string;
    lang_emptyListText?: string;
    lang_confirmButtonText?: string;
    lang_cancelButtonText?: string;
    lang_noFutureTimesText?: string;
    lang_goToNextAvailableDayText?: string;
    lang_selectedButtonText?: string;
    format_nextFutureStartTimeAvailableFormatString?: string;
    onNoFutureTimesAvailable?: (selectedDate: Date) => void;
    startTimeListStyle?: 'scroll-list' | 'grid';
    locale?: Locale;
    selectedStartTime?: Date;
};
export declare const ScheduleMeeting: React.FC<Props>;
export {};
