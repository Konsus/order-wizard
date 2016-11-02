"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const core_decorators_1 = require("core-decorators");
const SelectionControl_1 = require("./SelectionControl");
class CheckBox extends React.Component {
    onClick(e) {
        if (e.target != this.input)
            this.input.click();
    }
    onChange() {
    }
    render() {
        const label = this.props.label;
        const value = this.props.value;
        const checked = this.props.group.checked(value);
        return React.createElement("div", {className: "order-wizzard__list-item order-wizzard__checkbox", key: this.props.id || value, onClick: this.onClick}, 
            React.createElement("input", {type: "checkbox", ref: x => this.input = x, value: value, label: label, checked: checked, onChange: this.onChange}), 
            React.createElement("label", null, 
                React.createElement("span", null, label || value)
            ));
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], CheckBox.prototype, "onClick", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], CheckBox.prototype, "onChange", null);
exports.CheckBox = CheckBox;
class CheckGroup extends SelectionControl_1.SelectionControl {
    checked(value) {
        return this.state.value.indexOf(value) >= 0;
    }
    onChange(event) {
        event.persist();
        this.setState(state => {
            const input = event.target;
            const index = state.value.indexOf(input.value);
            // add / remove item
            if (input.checked) {
                if (index < 0)
                    state.value.push(input.value);
            }
            else {
                if (index >= 0)
                    state.value.splice(index, 1);
            }
            // do not send empty array to form
            const value = state.value;
            if (value.length < 1)
                state.value = null;
            this.onValueChange(state);
            state.value = value;
            return state;
        });
    }
    initialValue() {
        return super.initialValue() || [];
    }
    renderActiveView() {
        return React.createElement("div", {key: this.props.id || this.token, onChange: this.onChange, className: "order-wizzard__checkbox-group"}, this.renderOptions(this.props.options));
    }
    renderActiveOption(option, index) {
        return React.createElement(CheckBox, __assign({}, option, {key: `${this.token}.${option.value}`, group: this}));
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], CheckGroup.prototype, "onChange", null);
exports.CheckGroup = CheckGroup;
//# sourceMappingURL=CheckGroup.js.map