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
const DatePicker_1 = require("../../components/controls/DatePicker");
const common_1 = require("../../data/common");
class DueDatePageView extends SelectionControl_1.SelectionControl {
    constructor(...args) {
        super(...args);
        this.state.value = "no";
        this.state.date = "";
    }
    get token() {
        return super.token || this.props.questions && this.props.questions[0].token;
    }
    onSelect(value) {
        switch (value) {
            case "yes":
                this.setState(state => {
                    state.visibleDate = value === "yes";
                    state.value = state.date || value;
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
            default:
                this.setState(state => {
                    state.value = value;
                    state.date = value;
                    this.onValueChange(state);
                    return state;
                });
                break;
        }
    }
    render() {
        return React.createElement(SurveyPage_1.SurveyPage, __assign({}, this.props), React.createElement(RadioGroup_1.RadioGroup, __assign({}, this.props, { options: common_1.DueDateQuestion.options, token: null, value: this.state.value, valueRef: this.onSelect })), this.renderDate());
    }
    renderDate() {
        if (!this.state.visibleDate) return null;
        return React.createElement(DatePicker_1.DatePicker, { label: "Date", value: this.state.date, valueRef: this.onSelect });
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSelect", null);
exports.DueDatePageView = DueDatePageView;
//# sourceMappingURL=DueDatePageView.js.map