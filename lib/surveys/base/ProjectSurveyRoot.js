"use strict";
const React = require("react");
const ProjectSurvey_1 = require("./ProjectSurvey");
class ProjectSurveyRoot extends React.Component {
    render() {
        return this.props.children;
    }
}
ProjectSurveyRoot.childContextTypes = ProjectSurvey_1.ProjectSurvey.contextTypes;
exports.ProjectSurveyRoot = ProjectSurveyRoot;
//# sourceMappingURL=ProjectSurveyRoot.js.map