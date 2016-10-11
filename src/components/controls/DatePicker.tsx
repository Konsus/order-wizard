import * as React from "react";
import {SelectionControl} from "./SelectionControl";
import {autobind} from "core-decorators";
var DatePickerControl = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

export class DatePicker extends SelectionControl<DatePickerProps, Survey.View.Value<string>, string> {

    constructor(...args) {
        super(...args);
        this.state = {value: this.props.value};
    }

    @autobind
    onChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>) {
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
                <label>{this.props.label}</label><br/>
                {/*<input type="date"
                       className="form-control"
                       name={this.props.token}
                       value={this.state.value}
                       placeholder="dd.mm.yyyy"
                       onChange={this.onChange}
                />*/}

                <DatePickerControl className="form-control"
                                   placeholderText="Click to select a date"/>
            </div>
        )
    }
}

export interface DatePickerProps extends Survey.View.InputProps<string> {
    value?: string;
}
