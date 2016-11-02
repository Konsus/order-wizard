"use strict";
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
/**
 * Base type for any type of survey.
 */
class SurveyView extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.state.isPageDone = true;
    }
    /** Get normalized value of the survey progress [0-1]. */
    progress() {
        return this.state.step / this.state.activeSteps;
    }
    /** Whether survey is complete and ready for submission. */
    isComplete() {
        return !this.canMoveNext();
    }
    /** Whether has any next survey step. */
    canMoveNext() {
        return this.state.step < this.countActiveSteps();
    }
    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    moveNext() {
        if (this.state.step >= this.countActiveSteps())
            return false;
        this.setState(state => {
            state.activeSteps = this.countActiveSteps();
            state.step++;
            return state;
        });
        return true;
    }
    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    moveBack() {
        if (this.state.step <= 1)
            return false;
        this.setState(state => {
            state.step--;
            return state;
        });
        return true;
    }
    /** Reset survey to first step. */
    resetSurvey(state) {
        state.step = 1;
        state.activeSteps = this.countActiveSteps();
    }
    componentWillMount() {
        this.resetSurvey(this.state);
    }
    render() {
        if (this.state.step === 0)
            return null;
        return (React.createElement("div", {className: "order-wizzard"}, 
            React.createElement("div", {className: "order-wizzard__progress"}, 
                React.createElement(react_bootstrap_1.ProgressBar, {now: this.progress() * 100})
            ), 
            React.createElement("div", {className: "order-wizzard__step"}, this.renderQuestionPage()), 
            React.createElement("div", {className: "order-wizzard__controls clearfix"}, 
                React.createElement("div", {className: "order-wizzard__back pull-left"}, 
                    React.createElement("a", {onClick: () => this.moveBack(), href: "#", className: "b-button b-button--transparent"}, 
                        React.createElement("span", {className: "b-button__icon-arrow"}), 
                        " Back")
                ), 
                React.createElement("div", {className: "order-wizzard__next pull-right"}, this.renderMoveNext()))));
    }
    renderMoveNext() {
        if (!this.canMoveNext())
            return null;
        if (this.state.isPageDone)
            return React.createElement("a", {onClick: () => this.moveNext(), href: "#", className: "b-button b-button--blue"}, "Next");
        return React.createElement("a", {href: "#", className: "b-button b-button--blue b-button--deactive"}, "Next");
    }
}
exports.SurveyView = SurveyView;
//# sourceMappingURL=SurveyView.js.map