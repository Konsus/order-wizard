"use strict";

var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const core_decorators_1 = require("core-decorators");
const SelectionControl_1 = require("../../components/controls/SelectionControl");
const RadioGroup_1 = require("../../components/controls/RadioGroup");
const SurveyPage_1 = require("../../components/views/SurveyPage");
const common_1 = require("../../data/common");
const moment = require("moment-timezone");
require("react-date-picker/index.css");
require("react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css");
const ReactDatePicker = require("react-date-picker");
const Calendar = ReactDatePicker.Calendar;
const DateField = ReactDatePicker.DateField;
const DateFormatSpinnerInput = ReactDatePicker.DateFormatSpinnerInput;
const TimezonePicker = require("react-bootstrap-timezone-picker").default;
const momentTz = moment.tz;
class DueDatePageView extends SelectionControl_1.SelectionControl {
    constructor(...args) {
        super(...args);
        const value = this.state.value;
        if (value != null && value != "no") this.state.visibleDate = true;
        this.state.timezone = momentTz.guess();
    }
    get token() {
        let token = super.token;
        if (token != null) return token;
        const questions = this.props.questions;
        if (questions != null && questions.length > 0) token = questions[0].token;
        if (token == null) token = common_1.DueDateQuestion.token;
        return token;
    }
    get defaultTimeUtc() {
        let retVal = moment().utc();
        retVal.add(1, 'day');
        retVal.minute(0);
        retVal.second(0);
        return retVal;
    }
    get defaultTimeByZone() {
        return momentTz(this.defaultTimeUtc, this.state.timezone);
    }
    get dateValueOrDefault() {
        if (this.state.value == "yes") return this.defaultTimeByZone;
        const value = momentTz(this.state.value, this.state.timezone);
        if (value.isValid()) return value;
        return this.defaultTimeByZone;
    }
    onSelect(value) {
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
    onSetDate(dateString, { dateMoment }) {
        const select = moment(dateMoment);
        let value = this.dateValueOrDefault;
        value.year(select.year());
        value.month(select.month());
        value.day(select.day());
        value = momentTz(value, this.state.timezone);
        this.setValue(value);
    }
    onSetTime(dateString, { dateMoment }) {
        const select = moment(dateMoment);
        let value = this.dateValueOrDefault;
        value.hour(select.hour());
        value.minute(select.minute());
        value.second(select.second());
        value = momentTz(value, this.state.timezone);
        this.setValue(value);
    }
    onSetZone(zoneName) {
        const value = momentTz(this.dateValueOrDefault, zoneName);
        this.setState(state => {
            state.timezone = zoneName;
            state.value = value.format();
            this.onValueChange(state);
            return state;
        });
    }
    setValue(value) {
        this.setState(state => {
            state.value = value.format();
            this.onValueChange(state);
            return state;
        });
    }
    render() {
        let value = this.state.value;
        if (isFinite(value)) value = "yes";
        return React.createElement(SurveyPage_1.SurveyPage, __assign({}, this.props), React.createElement(RadioGroup_1.RadioGroup, __assign({}, this.props, { options: common_1.DueDateQuestion.options, token: null, value: value, valueRef: this.onSelect })), this.renderDate());
    }
    renderDate() {
        if (!this.state.visibleDate) return null;
        const value = this.dateValueOrDefault;
        return React.createElement("div", { className: "order-wizzard__date-group" }, React.createElement("span", null, this.renderDateView(value)), React.createElement("span", null, this.renderTimeView(value)), React.createElement("span", null, this.renderZoneView(value)));
    }
    renderDateView(date) {
        return React.createElement(DateField, { value: date, forceValidDate: true, updateOnDateClick: true, dateFormat: "YYYY-MM-DD", onChange: this.onSetDate }, React.createElement(Calendar, { style: { padding: 10 } }));
    }
    renderTimeView(date) {
        return React.createElement(DateFormatSpinnerInput, { value: date, isDateInput: false, dateFormat: "HH:mm:ss", onChange: this.onSetTime });
    }
    renderZoneView(date) {
        return React.createElement(TimezonePicker, { defaultValue: this.state.timezone, onChange: this.onSetZone });
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSelect", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object, Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSetDate", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object, Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSetTime", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSetZone", null);
exports.DueDatePageView = DueDatePageView;
//# sourceMappingURL=DueDatePageView.js.map