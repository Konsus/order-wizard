import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "../../components/controls/SelectionControl";
import {RadioGroup} from "../../components/controls/RadioGroup";
import {SurveyPage} from "../../components/views/SurveyPage";
import {DueDateQuestion} from "../../data/common";
import * as moment from "moment-timezone";
import {Moment} from "moment-timezone";
import "react-date-picker/index.css";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
//import * as moment from "moment";
//import "json!moment-timezone/data/packed/latest.json";

const ReactDatePicker = require("react-date-picker");
const Calendar = ReactDatePicker.Calendar;
const DateField = ReactDatePicker.DateField;
const TransitionView = ReactDatePicker.TransitionView;
const DateFormatSpinnerInput = ReactDatePicker.DateFormatSpinnerInput;
const TimezonePicker = require("react-bootstrap-timezone-picker").default;
const DateFormat = "YYYY-MM-DD HH:mm:ssZ";

export class DueDatePageView extends SelectionControl<DueDateProps, DueDateState> {

    constructor(...args) {
        super(...args);
        const value = this.state.value;
        if (value != null && value != "no")
            this.state.visibleDate = true;
        this.state.timezone = moment.tz.guess();
    }

    get token(): string|any {
        let token = super.token;
        if (token != null) return token;

        const questions = this.props.questions;
        if (questions != null && questions.length > 0)
            token = questions[0].token;

        if (token == null)
            token = DueDateQuestion.token;

        return token;
    }

    get defaultTime(): Moment {
        var retVal = moment().utc();
        retVal.add(1, 'day');
        return retVal;
    }

    @autobind
    onSelect(value: any) {
        switch (value) {
            case "yes":
                this.setState(state => {
                    state.visibleDate = true;
                    state.value = value;
                    this.onValueChange(state);
                    return state;
                });
                break;

            case "no":
                this.setState(state => {
                    state.visibleDate = false;
                    state.value = value;
                    this.onValueChange(state);
                    return state;
                });
                break;
        }
    }

    @autobind
    onSetDate(dateString, {dateMoment}) {

        let value = moment(this.state.value, DateFormat);
        if (!value.isValid()) value = this.defaultTime.startOf("day");

        const date = dateMoment as Moment;
        value.year(date.year());
        value.month(date.month());
        value.day(date.day());
        this.setValue(value);
    }

    @autobind
    onSetTime(dateString, {dateMoment}) {

        let value = moment(this.state.value, DateFormat);
        if (!value.isValid()) value = this.defaultTime.endOf("day");

        const date = (dateMoment as Moment).tz(this.state.timezone);
        value.hour(date.hour());
        value.minute(date.minute());
        value.second(date.second());
        this.setValue(value);
    }

    @autobind
    onSetZone(zoneName: string) {

        let value = moment(this.state.value, DateFormat);
        if (!value.isValid()) value = this.defaultTime.startOf("day");
        value = value.tz(this.state.timezone).tz(zoneName);

        this.setState(state => {
            state.timezone = zoneName;
            state.value = value.utc().format(DateFormat);
            this.onValueChange(state);
            return state;
        });
    }

    setValue(value: Moment) {
        this.setState(state => {
            state.value = value.utc().format(DateFormat);
            this.onValueChange(state);
            return state;
        });
    }

    render(): JSX.Element|any {
        let value = this.state.value;
        if (isFinite(value as number)) value = "yes";

        return (
            <SurveyPage {...this.props}>
                <RadioGroup {...this.props} options={DueDateQuestion.options}
                                            token={null}
                                            value={value}
                                            valueRef={this.onSelect}/>
                {this.renderDate()}
            </SurveyPage>
        );
    }

    renderDate(): JSX.Element|any {
        if (!this.state.visibleDate) return null;

        let value;
        switch (this.state.value) {
            case "yes":
            case "no":
                value = null;
                break;

            default:
                value = moment(this.state.value, DateFormat).local().toDate();
                break;
        }
        console.log("RENDER DATE: " + value + " value: " + this.state.value);

        return <div>
            <span>{this.renderDateView(value)}</span>
            <span>{this.renderTimeView(value)}</span>
            <span>{this.renderZoneView(value)}</span>
        </div>;
    }

    renderDateView(date: Date) {
        const defaultValue = this.defaultTime.startOf("day");
        return <DateField
            date={date}
            forceValidDate={true}
            updateOnDateClick={true}
            defaultValue={defaultValue}
            dateFormat="YYYY-MM-DD"
            onChange={this.onSetDate}>
            <TransitionView>
                <Calendar style={{padding: 10}}/>
            </TransitionView>
        </DateField>
    }

    renderTimeView(date: Date) {
        const defaultValue = this.defaultTime.endOf("day");
        defaultValue.min(0);
        defaultValue.second(0);
        return <DateFormatSpinnerInput
            value={date}
            dateFormat="HH:mm:ss"
            isDateInput={false}
            onChange={this.onSetTime}>
        </DateFormatSpinnerInput>
    }

    renderZoneView(date: Date) {
        return <TimezonePicker
            defaultValue={this.state.timezone}
            onChange={this.onSetZone}
        />;
    }
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
