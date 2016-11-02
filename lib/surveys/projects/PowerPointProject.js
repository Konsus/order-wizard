"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var core_decorators_1 = require("core-decorators");
var File_1 = require("../../components/controls/File");
var Comment_1 = require("../../components/controls/Comment");
var RadioGroup_1 = require("../../components/controls/RadioGroup");
var CheckGroup_1 = require("../../components/controls/CheckGroup");
var SurveyPage_1 = require("../../components/views/SurveyPage");
var ProjectSurveyFlow_1 = require("../base/ProjectSurveyFlow");
var DueDatePageView_1 = require("../views/DueDatePageView");
var power_point_project_1 = require("../../data/projects/power-point-project");

var PowerPointProject = function (_ProjectSurveyFlow_1$) {
    _inherits(PowerPointProject, _ProjectSurveyFlow_1$);

    function PowerPointProject() {
        _classCallCheck(this, PowerPointProject);

        return _possibleConstructorReturn(this, (PowerPointProject.__proto__ || Object.getPrototypeOf(PowerPointProject)).call(this, power_point_project_1.default.survey));
    }

    _createClass(PowerPointProject, [{
        key: "initFlow",
        value: function initFlow(flow) {
            flow.setPageView(power_point_project_1.default.service, { render: this.renderServiceTypePage });
            flow.setPageView(power_point_project_1.default.template, { render: this.renderCompanyTemplatePage });
            flow.setPageView(power_point_project_1.default.style, { render: this.renderStylePage });
            flow.setPageView(power_point_project_1.default.files, { render: this.renderFilesPage });
            flow.setPageView(power_point_project_1.default.purpose, { render: this.renderPurposePage });
            flow.setPageView(power_point_project_1.default.deadline, { render: this.renderDeadlinePage });
            flow.setPageView(power_point_project_1.default.comments, { render: this.renderCommentsPage });
        }
    }, {
        key: "renderServiceTypePage",
        value: function renderServiceTypePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderCompanyTemplatePage",
        value: function renderCompanyTemplatePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderStylePage",
        value: function renderStylePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(CheckGroup_1.CheckGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderFilesPage",
        value: function renderFilesPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(File_1.File, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderPurposePage",
        value: function renderPurposePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderDeadlinePage",
        value: function renderDeadlinePage(page) {
            return React.createElement(DueDatePageView_1.DueDatePageView, __assign({}, page));
        }
    }, {
        key: "renderCommentsPage",
        value: function renderCommentsPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(Comment_1.Comment, __assign({}, page.questions[0])));
        }
    }]);

    return PowerPointProject;
}(ProjectSurveyFlow_1.ProjectSurveyFlow);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderServiceTypePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderCompanyTemplatePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderStylePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderFilesPage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderPurposePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderDeadlinePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PowerPointProject.prototype, "renderCommentsPage", null);
exports.PowerPointProject = PowerPointProject;
//# sourceMappingURL=PowerPointProject.js.map