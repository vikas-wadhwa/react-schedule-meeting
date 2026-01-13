/// <reference types="react" />
interface TimeZonePickerProps {
    value?: string;
    labels: Record<string, string>;
    onChange: (tz: string | null) => void;
    className?: string;
    classNamePrefix?: string;
    name?: string;
    noOptionsMessage?: () => string;
    styles?: any;
}
declare const TimeZonePicker: (props: TimeZonePickerProps) => JSX.Element;
export default TimeZonePicker;
