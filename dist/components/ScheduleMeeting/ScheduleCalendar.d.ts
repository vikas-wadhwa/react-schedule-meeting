import { Locale } from 'date-fns';
import React from 'react';
import { StartTimeEvent } from './ScheduleMeeting';
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
declare const ScheduleCalendar: React.FC<CalendarProps>;
export default ScheduleCalendar;
