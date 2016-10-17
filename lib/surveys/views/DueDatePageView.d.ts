/// <reference types="react" />
import { SelectionControl } from "../../components/controls/SelectionControl";
export declare class DueDatePageView extends SelectionControl<DueDateProps, DueDateState> {
    constructor(...args: any[]);
    readonly token: string | any;
    onSelect(value: any): void;
    render(): JSX.Element | any;
    renderDate(): JSX.Element | any;
}
export interface DueDateProps extends Survey.View.SelectionProps<string> {
    title?: string;
    questions: Survey.Question[];
}
export interface DueDateState extends Survey.View.Value<string> {
    visibleDate?: boolean;
    date?: string;
}
