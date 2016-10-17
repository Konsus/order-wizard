import * as React from "react";
const c: Survey.Context = null;

export abstract class SelectionControl<P extends Survey.View.SelectionProps<any>, S extends Survey.View.Value<any>> extends React.Component<P, S & SelectionControlState> {

    public static contextTypes = {
        [nameof(c.form)]: React.PropTypes.shape({
            [nameof(c.form.setValue)]: React.PropTypes.func.isRequired,
            [nameof(c.form.getValue)]: React.PropTypes.func.isRequired,
        }).isRequired,
        [nameof(c.questionnaire)]: React.PropTypes.object,
    };

    constructor(...args) {
        super(...args);
        this.state = {} as S & SelectionControlState;
        this.state.options = [];
        this.state.value = this.initialValue();
        this.updateOptionsState(this.state);
    }

    /** Context of the parent survey. */
    context: Survey.Context;

    /** Token of the form where to write data. */
    get token(): string | null {
        return this.props.token;
    }

    /** Whether question of this control is active. */
    isControlActive(): boolean {
        const active = this.props.active;
        if (active == null) return true;
        return active(this.context.form);
    }

    /**
     * Whether concrete option of control is active.
     * @param option - option to check.
     */
    isOptionActive(option: Survey.Option) {
        if (option == null) return false;
        if (option.active == null) return true;
        return option.active(this.context.form);
    }

    /** Get initial value of the form. {@link Survey.View.Value#value} */
    protected initialValue(): any {
        let value = this.props.value;
        if (value != null) return null;
        const token = this.props.token;
        if (token != null) value = this.context.form.getValue(token);
        return value;
    }

    /** Update state of each option. {@link SelectionControlState#options} */
    protected updateOptionsState(state: S & SelectionControlState): void {
        const options = this.props.options;
        if (options == null) return;
        options.forEach((option, index) => {
            state.options[index] = this.isOptionActive(option);
        });
    }

    /**
     * Handle change of the token value.
     * This method will notify listeners and will write value to the form.
     * @param state
     */
    protected onValueChange(state: S & SelectionControlState) {
        const key = this.token;
        if (this.props.valueRef) this.props.valueRef(state.value);
        if (key) this.context.form.setValue(key, state.value)
        this.updateOptionsState(state);
    }

    render(): JSX.Element|any {
        if (this.isControlActive())
            return this.renderActiveView();
        return null;
    }

    /** Render occurs when selection control points to active question. */
    renderActiveView(): JSX.Element|any {
        return <div>{this.renderOptions(this.props.options)}</div>
    }

    /**
     * Render one or more options.
     * @param options - one option on array.
     * @returns {any}
     */
    renderOptions(options: Survey.Option | Survey.Option[]) {
        if (options == null) return null;
        if (options instanceof Array) {
            return options.map((option, index) => {
                if (option == null) return null;
                return this.renderOption(option, index, this.isOptionActive(option));
            });
        }

        return this.renderOption(options as Survey.Option, 0, this.isOptionActive(options as Survey.Option));
    }

    /**
     * Render single option.
     * @param option - option from question.
     * @param index - zero-based index of an option.
     * @param active - whether option is active or not.
     */
    renderOption(option: Survey.Option, index: number, active: boolean): JSX.Element|any {
        if (active) return this.renderActiveOption(option, index);
    };

    /**
     * Render single option that is validated to be active on the page.
     * @param option - option from question
     * @param index - zero-based index of an option.
     */
    renderActiveOption(option: Survey.Option, index: number): JSX.Element|any {
        return (<label key={index}>{option.label || option.value}</label>)
    }

}

export interface SelectionControlState extends Survey.View.Value<any> {
    /** Options activity states. */
    options: boolean[];
}

