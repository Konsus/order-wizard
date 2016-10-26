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
var Comment_1 = require("../../components/controls/Comment");
var RadioGroup_1 = require("../../components/controls/RadioGroup");
var SurveyPage_1 = require("../../components/views/SurveyPage");
var ProjectSurveyFlow_1 = require("../base/ProjectSurveyFlow");
var DueDatePageView_1 = require("../views/DueDatePageView");
var data_entry_project_1 = require("../../data/projects/data-entry-project");

var DataEntryProject = function (_ProjectSurveyFlow_1$) {
    _inherits(DataEntryProject, _ProjectSurveyFlow_1$);

    function DataEntryProject() {
        _classCallCheck(this, DataEntryProject);

        return _possibleConstructorReturn(this, (DataEntryProject.__proto__ || Object.getPrototypeOf(DataEntryProject)).call(this, data_entry_project_1.default.survey));
    }

    _createClass(DataEntryProject, [{
        key: "initFlow",
        value: function initFlow(flow) {
            flow.setPageView(data_entry_project_1.default.service, { render: this.renderServiceTypePage });
            flow.setPageView(data_entry_project_1.default.description, { render: this.renderDescriptionPage });
            flow.setPageView(data_entry_project_1.default.deadline, { render: this.renderDeadlinePage });
            flow.setPageView(data_entry_project_1.default.comments, { render: this.renderCommentsPage });
        }
    }, {
        key: "renderServiceTypePage",
        value: function renderServiceTypePage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(RadioGroup_1.RadioGroup, __assign({}, page.questions[0])));
        }
    }, {
        key: "renderDescriptionPage",
        value: function renderDescriptionPage(page) {
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, page), React.createElement(Comment_1.Comment, __assign({}, page.questions[0])));
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

    return DataEntryProject;
}(ProjectSurveyFlow_1.ProjectSurveyFlow);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DataEntryProject.prototype, "renderServiceTypePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DataEntryProject.prototype, "renderDescriptionPage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DataEntryProject.prototype, "renderDeadlinePage", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DataEntryProject.prototype, "renderCommentsPage", null);
exports.DataEntryProject = DataEntryProject;
//# sourceMappingURL=DataEntryProject.js.map