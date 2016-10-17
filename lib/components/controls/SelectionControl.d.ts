/// <reference types="react" />
import * as React from "react";
export declare abstract class SelectionControl<P extends Survey.View.SelectionProps<any>, S extends Survey.View.Value<any>> extends React.Component<P, S & SelectionControlState> {
    static contextTypes: {
        [x: string]: React.Validator<any>;
    };
    constructor(...args: any[]);
    /** Context of the parent survey. */
    context: Survey.Context;
    /** Token of the form where to write data. */
    readonly token: string | null;
    /** Whether question of this control is active. */
    isControlActive(): boolean;
    /**
     * Whether concrete option of control is active.
     * @param option - option to check.
     */
    isOptionActive(option: Survey.Option): boolean;
    /** Get initial value of the form. {@link Survey.View.Value#value} */
    protected initialValue(): any;
    /** Update state of each option. {@link SelectionControlState#options} */
    protected updateOptionsState(state: S & SelectionControlState): void;
    /**
     * Handle change of the token value.
     * This method will notify listeners and will write value to the form.
     * @param state
     */
    protected onValueChange(state: S & SelectionControlState): void;
    render(): JSX.Element | any;
    /** Render occurs when selection control points to active question. */
    renderActiveView(): JSX.Element | any;
    /**
     * Render one or more options.
     * @param options - one option on array.
     * @returns {any}
     */
    renderOptions(options: Survey.Option | Survey.Option[]): any;
    /**
     * Render single option.
     * @param option - option from question.
     * @param index - zero-based index of an option.
     * @param active - whether option is active or not.
     */
    renderOption(option: Survey.Option, index: number, active: boolean): JSX.Element | any;
}
export interface SelectionControlState extends Survey.View.Value<any> {
    /** Options activity states. */
    options: boolean[];
}
