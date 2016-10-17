"use strict";

const React = require("react");
/** Wraps questions of the survey. */
class SurveyPage extends React.Component {
    title() {
        let title = this.props.title;
        if (title) return title;
        const questions = this.props.questions;
        if (questions && questions[0]) return questions[0].title;
        return null;
    }
    render() {
        const title = this.title();
        return React.createElement("div", { key: this.props.id || title }, React.createElement("div", { className: "order-wizzard__step-title" }, title), React.createElement("div", { className: "order-wizzard__step-survey" }, this.props.children));
    }
}
exports.SurveyPage = SurveyPage;
//# sourceMappingURL=SurveyPage.js.map