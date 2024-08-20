export type TimeSlot = {
    startTime: Date | string | number;
    endTime: Date | string | number;
    [key: string]: any;
};
/**
 * @param {TimeSlot[]} availableTimeSlots
 * @param {TimeSlot[]} unavailableTimeSlots
 * @returns {TimeSlot[]} Available TimeSlots less the intersecting unavailable TimeSlots
 */
export declare function timeSlotDifference(availableTimeSlots: TimeSlot[], unavailableTimeSlots: TimeSlot[]): TimeSlot[];
