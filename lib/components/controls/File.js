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
class File extends SelectionControl_1.SelectionControl {
    onChange(event) {
        event.persist();
        this.setState(state => {
            const input = event.target;
            state.value = input.value.toString();
            this.onValueChange(state);
            return state;
        });
    }
    render() {
        let basefilename = this.state.value;
        return React.createElement("div", { className: "order-wizzard__file-uploading" }, this.state.value ? React.createElement("div", { className: "order-wizzard__file-name" }, basefilename.replace(/^.*\\/, "")) : null, React.createElement("label", null, this.props.label), React.createElement("div", { className: "fileUpload b-button b-button--ghost" }, React.createElement("span", null, "Upload"), React.createElement("input", { type: "file", name: this.props.token, onChange: this.onChange, className: "upload" })));
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], File.prototype, "onChange", null);
exports.File = File;
//# sourceMappingURL=File.js.map