import * as React from "react";
import {SelectionControl} from "./SelectionControl";
import {autobind} from "core-decorators";

export class DatePicker extends SelectionControl<DatePickerProps, Survey.View.Value<string>, string> {

    constructor(...args) {
        super(...args);
        this.state = {value: this.props.value};
    }

    @autobind
    onChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>) {
        event.persist();
        this.setState(state => {
            const input = event.target as React.HTMLProps<HTMLInputElement>;
            state.value = input.value.toString();
            this.onValueChange(state);
            return state;
        });
    }

    render() {
        return (
            <div className="order-wizzard__text-date">
                <label>{this.props.label}</label>
                <input type="date"
                       className="form-control"
                       name={this.props.token}
                       value={this.state.value}
                       placeholder="dd.mm.yyyy"
                       onChange={this.onChange}
                />
            </div>
        )
    }
}

export interface DatePickerProps extends Survey.View.InputProps<string> {
    value?: string;
}
