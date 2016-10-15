import * as React from "react";
import * as ReactDatePicker from "react-datepicker";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";
require('react-datepicker/dist/react-datepicker.css');

export class DatePicker extends SelectionControl<DatePickerProps, Survey.View.Value<string>> {

    @autobind
    onChange(date?: any) {
        this.setState(state => {
            state.value = date;
            this.onValueChange(state);
            return state;
        });
    }

    renderActiveView(): JSX.Element|any {
        const token = this.token;
        const value = this.state.value;
        const label = this.props.label;
        return <div className="order-wizzard__text-date"
                    key={this.props.id || token}>
            <label>{label || value}</label><br/>
            <ReactDatePicker className="form-control"
                             name={token}
                             selected={value}
                             todayButton={"Today!"}
                             onChange={this.onChange}
                             placeholderText={this.props.placeholder}/>
        </div>
    }
}

export interface DatePickerProps extends Survey.View.SelectionProps<string> {

}
