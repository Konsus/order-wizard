"use strict";

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
class Comment extends SelectionControl_1.SelectionControl {
    onChange(event) {
        event.persist();
        this.setState(state => {
            const input = event.target;
            state.value = input.value.toString();
            this.onValueChange(state);
            return state;
        });
    }
    renderActiveView() {
        const token = this.token;
        const value = this.state.value;
        const label = this.props.label;
        return React.createElement("div", { className: "order-wizzard__text-comment", key: this.props.id || token }, React.createElement("label", null, label || value), React.createElement("textarea", { className: "form-control", name: token, value: value, placeholder: this.props.placeholder, onChange: this.onChange }));
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], Comment.prototype, "onChange", null);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map