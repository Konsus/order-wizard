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
const File_1 = require("../../components/controls/File");
const Comment_1 = require("../../components/controls/Comment");
const RadioGroup_1 = require("../../components/controls/RadioGroup");
const CheckGroup_1 = require("../../components/controls/CheckGroup");
const SurveyPage_1 = require("../../components/views/SurveyPage");
const ProjectSurveyFlow_1 = require("../base/ProjectSurveyFlow");
const DueDatePageView_1 = require("../views/DueDatePageView");
const power_point_project_1 = require("../../data/projects/power-point-project");
class PowerPointProject extends ProjectSurveyFlow_1.ProjectSurveyFlow {
    constructor() {
        super(power_point_project_1.default.survey);
    }
    initFlow(flow) {
        flow.setPageView(power_point_project_1.default.service, { render: this.renderServiceTypePage });
        flow.setPageView(power_point_project_1.default.template, { render: this.renderCompanyTemplatePage });
        flow.setPageView(power_point_project_1.default.style, { render: this.renderStylePage });
        flow.setPageView(power_point_project_1.default.files, { render: this.renderFilesPage });
        flow.setPageView(power_point_project_1.default.purpose, { render: this.renderPurposePage });
        flow.setPageView(power_point_project_1.default.deadline, { render: this.renderDeadlinePage });
        flow.setPageView(power_point_project_1.default.comments, { render: this.renderCommentsPage });
    }
    renderServiceTypePage(page) {
        return (React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), 
            React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0]))
        ));
    }
    renderCompanyTemplatePage(page) {
        return (React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), 
            React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0]))
        ));
    }
    renderStylePage(page) {
        return (React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), 
            React.createElement(CheckGroup_1.CheckGroup, __assign({}, page.questions[0]))
        ));
    }
    renderFilesPage(page) {
        return (React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), 
            React.createElement(File_1.File, __assign({}, page.questions[0]))
        ));
    }
    renderPurposePage(page) {
        return (React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), 
            React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0]))
        ));
    }
    renderDeadlinePage(page) {
        return React.createElement(DueDatePageView_1.DueDatePageView, __assign({}, page));
    }
    renderCommentsPage(page) {
        return (React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), 
            React.createElement(Comment_1.Comment, __assign({}, page.questions[0]))
        ));
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderServiceTypePage", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderCompanyTemplatePage", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderStylePage", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderFilesPage", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderPurposePage", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderDeadlinePage", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], PowerPointProject.prototype, "renderCommentsPage", null);
exports.PowerPointProject = PowerPointProject;
//# sourceMappingURL=PowerPointProject.js.map