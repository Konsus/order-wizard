"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var survey_flow_1 = require("../../core/survey-flow");
var survey_form_1 = require("../../core/survey-form");
var survey_context_1 = require("../../core/survey-context");
var ProjectSurvey_1 = require("./ProjectSurvey");
/** Basic template for quick setup of project survey. */

var ProjectSurveyFlow = function (_React$Component) {
    _inherits(ProjectSurveyFlow, _React$Component);

    function ProjectSurveyFlow(questionnaire) {
        _classCallCheck(this, ProjectSurveyFlow);

        var _this = _possibleConstructorReturn(this, (ProjectSurveyFlow.__proto__ || Object.getPrototypeOf(ProjectSurveyFlow)).call(this));

        _this.form = new survey_form_1.SurveyForm();
        var context = new survey_context_1.SurveyContext(questionnaire, _this.form);
        _this.flow = new survey_flow_1.SurveyFlow(context);
        if (_this.initFlow) _this.initFlow(_this.flow);
        return _this;
    }

    _createClass(ProjectSurveyFlow, [{
        key: "render",
        value: function render() {
            return React.createElement(ProjectSurvey_1.ProjectSurvey, { flow: this.flow });
        }
    }]);

    return ProjectSurveyFlow;
}(React.Component);

exports.ProjectSurveyFlow = ProjectSurveyFlow;
//# sourceMappingURL=ProjectSurveyFlow.js.map