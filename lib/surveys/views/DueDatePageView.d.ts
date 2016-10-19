/// <reference types="react" />
import { SelectionControl } from "../../components/controls/SelectionControl";
import { Moment } from "moment-timezone";
import "react-date-picker/index.css";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
export declare class DueDatePageView extends SelectionControl<DueDateProps, DueDateState> {
    constructor(...args: any[]);
    readonly token: string | any;
    readonly defaultTimeUtc: Moment;
    readonly defaultTimeByZone: Moment;
    readonly dateValueOrDefault: Moment;
    onSelect(value: any): void;
    onSetDate(dateString: any, {dateMoment}: {
        dateMoment: any;
    }): void;
    onSetTime(dateString: any, {dateMoment}: {
        dateMoment: any;
    }): void;
    onSetZone(zoneName: string): void;
    setValue(value: Moment): void;
    render(): JSX.Element | any;
    renderDate(): JSX.Element | any;
    renderDateView(date: Moment): JSX.Element;
    renderTimeView(date: Moment): JSX.Element;
    renderZoneView(date: Moment): JSX.Element;
}
export interface DueDateProps extends Survey.View.SelectionProps<string> {
    title?: string;
    questions: Survey.Question[];
}
export interface DueDateState extends Survey.View.Value<string> {
    visibleDate?: boolean;
    timezone?: string;
}
export interface DatePickerValues {
    dateMoment: Moment;
    timestamp: any;
}
