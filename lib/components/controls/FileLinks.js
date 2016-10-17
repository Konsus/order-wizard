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
const DropZone = require("react-dropzone");
const core_decorators_1 = require("core-decorators");
const SelectionControl_1 = require("./SelectionControl");
class FileLinks extends SelectionControl_1.SelectionControl {
    constructor(...args) {
        super(...args);
    }
    onChange(event) {
        event.persist();
        this.setState(state => {
            //const input = event.target as React.HTMLProps<HTMLTextAreaElement>;
            //state.value = input.value.toString();
            //this.onValueChange(state);
            return state;
        });
    }
    onDrop(files) {
        console.dir(files);
        this.setState(state => {
            state.files = files;
            return state;
        });
    }
    onOpenClick() {
        this.dropZone.open();
    }
    render() {
        const files = this.state.files;
        return React.createElement("div", null, React.createElement(DropZone, { ref: x => this.dropZone = x, onDrop: this.onDrop }, React.createElement("div", null, "Try dropping some files here, or click to select files to upload.")), React.createElement("button", { type: "button", onClick: this.onOpenClick }, "Open Dropzone"), files ? React.createElement("div", null, React.createElement("h2", null, "Uploading ", files.length, " files..."), React.createElement("div", null, files.map((file, index) => React.createElement("img", { key: index, src: file.preview })))) : null);
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], FileLinks.prototype, "onChange", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Array]), __metadata('design:returntype', void 0)], FileLinks.prototype, "onDrop", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], FileLinks.prototype, "onOpenClick", null);
exports.FileLinks = FileLinks;
//# sourceMappingURL=FileLinks.js.map