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
const SelectionControl_1 = require("./SelectionControl");
class RadioBox extends React.Component {
    onClick(e) {
        if (e.target != this.radio) this.radio.click();
    }
    onChange() {
        this.props.valueRef(this.radio.value);
    }
    render() {
        const value = this.props.value;
        const label = this.props.label;
        const checked = this.props.checked(value);
        return React.createElement("div", { key: this.props.id || value, className: "order-wizzard__list-item order-wizzard__radio", onClick: this.onClick }, React.createElement("input", { type: "radio", ref: x => this.radio = x, value: value, label: label, checked: checked, onChange: this.onChange }), React.createElement("label", null, React.createElement("span", null, label || value)));
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioBox.prototype, "onClick", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioBox.prototype, "onChange", null);
exports.RadioBox = RadioBox;
class RadioBoxOther extends React.Component {
    constructor(...args) {
        super(...args);
    }
    checked() {
        if (this.text && this.text.value != "") return this.props.checked(this.text.value);
        if (this.props.value != null) return this.props.checked(this.props.value);
        return this.props.checked("other");
    }
    onClick(e) {
        if (e.target == this.text) return;
        if (e.target == this.radio) return;
        this.onChange();
    }
    onSelect() {
        this.onChange();
        this.forceUpdate();
    }
    onChange() {
        let value;
        if (this.text) value = this.text.value;
        if (value == null) value = this.props.value;
        if (value == null) value = "other";
        this.props.valueRef(value);
    }
    render() {
        const label = this.props.label;
        const checked = this.checked();
        return React.createElement("div", { key: this.props.id || "other", className: "order-wizzard__list-item order-wizzard__radio order-wizzard__radio-other", onClick: this.onClick }, React.createElement("input", { type: "radio", ref: x => this.radio = x, label: label, checked: checked, onChange: this.onSelect }), React.createElement("label", null, React.createElement("span", null, label || "Other")), checked ? React.createElement("input", { type: "text", className: "form-control", ref: x => this.text = x, value: this.props.value, label: label, checked: checked, onChange: this.onChange }) : null);
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioBoxOther.prototype, "onClick", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioBoxOther.prototype, "onSelect", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioBoxOther.prototype, "onChange", null);
exports.RadioBoxOther = RadioBoxOther;
class RadioGroup extends SelectionControl_1.SelectionControl {
    checked(value) {
        return this.state.value == value;
    }
    onChange(value) {
        this.setState(state => {
            state.value = value;
            this.onValueChange(state);
            return state;
        });
    }
    renderActiveView() {
        const token = this.token;
        const other = this.props.other;
        return React.createElement("div", { key: this.props.id || token, name: token, className: "order-wizzard__radio-group" }, this.renderOptions(this.props.options), other ? React.createElement(RadioBoxOther, __assign({}, other, { key: `${ this.token }.other`, valueRef: this.onChange, checked: this.checked })) : null);
    }
    renderOption(option, index, active) {
        return React.createElement(RadioBox, __assign({}, option, { key: `${ this.token }.${ option.value }`, valueRef: this.onChange, checked: this.checked }));
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', Boolean)], RadioGroup.prototype, "checked", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioGroup.prototype, "onChange", null);
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=RadioGroup.js.map