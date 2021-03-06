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
var web_project_1 = require("../../data/projects/web-project");

var WebProject = function (_ProjectSurveyFlow_1$) {
    _inherits(WebProject, _ProjectSurveyFlow_1$);

    function WebProject() {
        _classCallCheck(this, WebProject);

        return _possibleConstructorReturn(this, (WebProject.__proto__ || Object.getPrototypeOf(WebProject)).call(this, web_project_1.default.survey));
    }

    _createClass(WebProject, [{
        key: "initFlow",
        value: function initFlow(flow) {
            flow.setPageView(web_project_1.default.website, { render: this.renderWebSitePage });
            flow.setPageView(web_project_1.default.service, { render: this.renderServicePage });
            flow.setPageView(web_project_1.default.techInfo, { render: this.renderTechInfoPage });
            flow.setPageView(web_project_1.default.techRequirements, { render: this.renderTechRequirementsPage });
            flow.setPageView(web_project_1.default.techPreferences, { render: this.renderTechPreferencesPage });
            flow.setPageView(web_project_1.default.purpose, { render: this.renderPurposePage });
            flow.setPageView(web_project_1.default.files, { render: this.renderFilesPage });
            flow.setPageView(web_project_1.default.deadline, { render: this.renderDeadlinePage });
            flow.setPageView(web_project_1.default.comments, { render: this.renderCommentsPage });
        }
    }, {
        key: "renderWebSitePage",
        value: function renderWebSitePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])), React.createElement(Comment_1.Comment, __assign({}, page.questions[1])));
        }
    }, {
        key: "renderServicePage",
        value: function renderServicePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(CheckGroup_1.CheckGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderTechInfoPage",
        value: function renderTechInfoPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(Comment_1.Comment, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderTechRequirementsPage",
        value: function renderTechRequirementsPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderTechPreferencesPage",
        value: function renderTechPreferencesPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderPurposePage",
        value: function renderPurposePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(Comment_1.Comment, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderFilesPage",
        value: function renderFilesPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(File_1.File, __assign({}, page.questions[0])));
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

    return WebProject;
}(ProjectSurveyFlow_1.ProjectSurveyFlow);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderWebSitePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderServicePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderTechInfoPage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderTechRequirementsPage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderTechPreferencesPage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderPurposePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderFilesPage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderDeadlinePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], WebProject.prototype, "renderCommentsPage", null);
exports.WebProject = WebProject;
//# sourceMappingURL=WebProject.js.map