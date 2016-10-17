/// <reference types="react" />
import { SelectionControl } from "./SelectionControl";
export declare class DatePicker extends SelectionControl<DatePickerProps, Survey.View.Value<string>> {
    onChange(date?: any): void;
    renderActiveView(): JSX.Element | any;
}
export interface DatePickerProps extends Survey.View.SelectionProps<string> {
}
