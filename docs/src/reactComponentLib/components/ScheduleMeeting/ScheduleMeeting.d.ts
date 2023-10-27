import { Locale } from 'date-fns';
import React from 'react';
export type AvailableTimeslot = {
    displayText: string;
    startTime: Date | string;
    endTime: Date | string;
    id?: string | number | undefined;
};
export type Host = {
    user_id?: string | number | undefined;
    avatar_url: string;
    full_name: string;
};
export type Scheduler = {
    id: string | number | undefined;
    title: string;
    description: string;
    duration: string;
    timezone: string;
};
export type SplitTimeslot = null | ModifiedTimeslot;
export type ModifiedTimeslot = AvailableTimeslot & {
    oldId: string | number | undefined;
};
export type StartTimeEvent = {
    displayText: string;
    availableTimeslot: AvailableTimeslot;
    startTime: Date;
};
export type StartTimeEventEmit = StartTimeEvent & {
    splitTimeslot?: [SplitTimeslot, SplitTimeslot];
    resetDate: () => void;
    resetSelectedTimeState: () => void;
};
type Props = {
    host: Host;
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
export declare const ScheduleMeeting: React.FC<Props>;
export {};
