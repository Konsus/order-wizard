/// <reference types="react" />
import * as React from "react";
import { SelectionControl } from "./SelectionControl";
export declare class CheckBox extends React.Component<Survey.View.CheckBox, void> {
    private input;
    onClick(e: React.MouseEvent<any>): void;
    onChange(): void;
    render(): JSX.Element;
}
export declare class CheckGroup extends SelectionControl<CheckGroupProps, Survey.View.Value<any[]>> implements Survey.View.Group {
    checked(value: any): boolean;
    onChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>): void;
    protected initialValue(): any;
    renderActiveView(): JSX.Element | any;
    renderActiveOption(option: Survey.Option, index: number): JSX.Element | any;
}
export interface CheckGroupProps extends Survey.View.SelectionProps<any[]> {
}
