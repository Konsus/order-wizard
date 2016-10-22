import "react-date-picker/index.css";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";

import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "../../components/controls/SelectionControl";
import {RadioGroup} from "../../components/controls/RadioGroup";
import {SurveyPage} from "../../components/views/SurveyPage";
import {DueDateQuestion} from "../../data/common";
import * as moment from "moment-timezone";
import {Moment} from "moment-timezone";

const ReactDatePicker = require("react-date-picker");
const Calendar = ReactDatePicker.Calendar;
const DateField = ReactDatePicker.DateField;
const DateFormatSpinnerInput = ReactDatePicker.DateFormatSpinnerInput;
const TimezonePicker = require("react-bootstrap-timezone-picker").default;
const momentTz = moment.tz as any;
var zoneJson = require("moment-timezone/data/packed/latest.json");
console.dir(zoneJson);
momentTz.load(zoneJson);

export class DueDatePageView extends SelectionControl<DueDateProps, DueDateState> {

    constructor(...args) {
        super(...args);
        const value = this.state.value;
        if (value != null && value != "no")
            this.state.visibleDate = true;
        this.state.timezone = momentTz.guess();
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

    get defaultTimeUtc(): Moment {
        let retVal: Moment = moment().utc();
        retVal.add(1, 'day');
        retVal.minute(0);
        retVal.second(0);
        return retVal;
    }

    get defaultTimeByZone(): Moment {
        return momentTz(this.defaultTimeUtc, this.state.timezone);
    }

    get dateValueOrDefault(): Moment {
        if (this.state.value == "yes")
            return this.defaultTimeByZone;

        const value: Moment = momentTz(this.state.value, this.state.timezone);
        if (value.isValid()) return value;

        return this.defaultTimeByZone;
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
        const select: Moment = moment(dateMoment);
        let value: Moment = this.dateValueOrDefault;
        value.year(select.year());
        value.month(select.month());
        value.day(select.day());
        value = momentTz(value, this.state.timezone);
        this.setValue(value);
    }

    @autobind
    onSetTime(dateString, {dateMoment}) {
        const select: Moment = moment(dateMoment);
        let value: Moment = this.dateValueOrDefault;
        value.hour(select.hour());
        value.minute(select.minute());
        value.second(select.second());
        value = momentTz(value, this.state.timezone);
        this.setValue(value);
    }

    @autobind
    onSetZone(zoneName: string) {
        const value: Moment = momentTz(this.dateValueOrDefault, zoneName);
        this.setState(state => {
            state.timezone = zoneName;
            state.value = value.format();
            this.onValueChange(state);
            return state;
        });
    }

    setValue(value: Moment) {
        this.setState(state => {
            state.value = value.format();
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
        const value = this.dateValueOrDefault;
        return <div className="order-wizzard__date-group">
            <span>{this.renderDateView(value)}</span>
            <span>{this.renderTimeView(value)}</span>
            <span>{this.renderZoneView(value)}</span>
        </div>;
    }

    renderDateView(date: Moment) {
        return <DateField value={date}
                          forceValidDate={true}
                          updateOnDateClick={true}
                          dateFormat="YYYY-MM-DD"
                          onChange={this.onSetDate}>
            <Calendar style={{padding: 10}}/>
        </DateField>
    }

    renderTimeView(date: Moment) {
        return <DateFormatSpinnerInput value={date}
                                       isDateInput={false}
                                       dateFormat="HH:mm:ss"
                                       onChange={this.onSetTime}/>
    }

    renderZoneView(date: Moment) {
        return <TimezonePicker defaultValue={this.state.timezone}
                               onChange={this.onSetZone}/>;
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
