/// <reference types="react" />
import * as React from "react";
import { SelectionControl } from "./SelectionControl";
export declare class RadioBox extends React.Component<RadioBoxProps, void> {
    private radio;
    onClick(e: React.MouseEvent<any>): void;
    onChange(): void;
    render(): JSX.Element;
}
export declare class RadioBoxOther extends React.Component<RadioBoxProps, RadioBoxOtherState> {
    private radio;
    private text;
    constructor(...args: any[]);
    checked(): boolean;
    onClick(e: React.MouseEvent<any>): void;
    onSelect(): void;
    onChange(): void;
    render(): JSX.Element;
}
export declare class RadioGroup extends SelectionControl<Survey.View.SelectionProps<any>, any> implements Survey.View.Group {
    checked(value: any): boolean;
    onChange(value: any): void;
    renderActiveView(): JSX.Element | any;
    renderOption(option: Survey.Option, index: number, active: boolean): JSX.Element | any;
}
export interface RadioBoxProps extends Survey.View.Element<any> {
    valueRef?: Survey.Ref<any>;
    checked: (value: any) => boolean;
    label?: string;
    defaultChecked?: boolean;
}
export interface RadioBoxOtherState extends Survey.View.Value<any> {
}
