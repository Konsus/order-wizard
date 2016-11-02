"use strict";
const React = require("react");
const survey_flow_1 = require("../../core/survey-flow");
const survey_form_1 = require("../../core/survey-form");
const survey_context_1 = require("../../core/survey-context");
const ProjectSurvey_1 = require("./ProjectSurvey");
/** Basic template for quick setup of project survey. */
class ProjectSurveyFlow extends React.Component {
    constructor(questionnaire) {
        super();
        this.form = new survey_form_1.SurveyForm();
        const context = new survey_context_1.SurveyContext(questionnaire, this.form);
        this.flow = new survey_flow_1.SurveyFlow(context);
        if (this.initFlow)
            this.initFlow(this.flow);
    }
    render() {
        return React.createElement(ProjectSurvey_1.ProjectSurvey, {flow: this.flow});
    }
}
exports.ProjectSurveyFlow = ProjectSurveyFlow;
//# sourceMappingURL=ProjectSurveyFlow.js.map