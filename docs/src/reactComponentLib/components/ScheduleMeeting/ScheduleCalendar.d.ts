import { Locale } from 'date-fns';
import React from 'react';
import { AvailableTimeslot } from './ScheduleMeeting';
type CalendarProps = {
    availableTimeslots: Array<AvailableTimeslot>;
    onDaySelected: (day: Date) => void;
    selectedDay: Date;
    borderRadius: number;
    primaryColor: string;
    primaryColorFaded: string;
    locale?: Locale;
};
declare const ScheduleCalendar: React.FC<CalendarProps>;
export default ScheduleCalendar;
