import * as React from "react";
import {SelectionControl} from "./SelectionControl";
import {autobind} from "core-decorators";
import * as ReactDatePicker from "react-datepicker";
require('react-datepicker/dist/react-datepicker.css');

export class DatePicker extends SelectionControl<DatePickerProps, Survey.View.Value<string>> {

    constructor(...args) {
        super(...args);
        this.state = {value: this.props.value};
    }

    @autobind
    onChange(date?: any) {
        this.setState(state => {
            state.value = date;
            this.onValueChange(state);
            return state;
        });
    }

    render() {
        return (
            <div className="order-wizzard__text-date">
                <label>{this.props.label}</label><br/>
                <ReactDatePicker className="form-control"
                                 todayButton={"Today!"}
                                 onChange={this.onChange}
                                 selected={this.state.value}
                                 placeholderText="select a date"/>
            </div>
        )
    }
}

export interface DatePickerProps extends Survey.View.InputProps<string> {
    value?: string;
}
