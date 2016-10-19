"use strict";

const React = require("react");
const SurveyView_1 = require("./SurveyView");
const SelectionControl_1 = require("../controls/SelectionControl");
/** Base type for project creation survey, provides intro page. */
class ProjectSurvey extends SurveyView_1.SurveyView {
    constructor(...args) {
        super(...args);
        this.props.flow.form.onPropertyChanged.attach(this, this.onFormPropertyChanged);
        this.resetSurvey(this.state);
    }
    getChildContext() {
        return this.props.flow.context;
    }
    /** Move from initial page to actual survey. */
    startSurvey() {
        this.moveNext();
    }
    canMoveNext() {
        if (super.canMoveNext()) return true;
        return this.state.pageType < ProjectSurveyPageType.Summary;
    }
    moveNext() {
        if (!this.state.isPageDone) return false;
        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                this.setState(state => {
                    this.resetSurvey(state);
                    state.pageID = this.selectNextPageID(this.state.pageID);
                    state.pageType += 1;
                    return state;
                });
                return true;
            case ProjectSurveyPageType.Survey:
                if (!this.isPageDone(this.state.pageID)) return false;
                const nextPageID = this.selectNextPageID(this.state.pageID);
                this.setState(state => {
                    if (nextPageID >= 0) {
                        state.step++;
                        state.pageID = nextPageID;
                        state.activeSteps = this.countActiveSteps();
                    } else {
                        state.pageType += 1;
                    }
                    return state;
                });
                return true;
            case ProjectSurveyPageType.Summary:
                return false;
            default:
                return false;
        }
    }
    moveBack() {
        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                return false;
            case ProjectSurveyPageType.Survey:
                const prevPageID = this.selectPrevPageID(this.state.pageID);
                if (prevPageID >= 0) {
                    this.setState(state => {
                        state.step--;
                        state.pageID = prevPageID;
                        return state;
                    });
                } else {
                    this.setState(state => {
                        state.pageType -= 1;
                        return state;
                    });
                }
                return true;
            case ProjectSurveyPageType.Summary:
                this.setState(state => {
                    state.pageType -= 1;
                    return state;
                });
                return true;
        }
        return false;
    }
    resetSurvey(state) {
        super.resetSurvey(state);
        state.pageID = -1;
        state.isPageDone = true;
        state.pageType = ProjectSurveyPageType.Intro;
    }
    startProject() {
        console.log("START PROJECT: ", JSON.stringify(this.props.flow.form));
    }
    isPageDone(pageID) {
        // done by default if no pages
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (pages instanceof Array == false) if (pages == null) return true;
        // page is out of range
        if (pageID < 0) return true;
        if (pageID >= pages.length) return true;
        // not done if any question is not done
        const page = pages[pageID];
        const questions = page.questions;
        for (let i = 0; i < questions.length; i++) if (!flow.isQuestionDone(questions[i])) return false;
        return true;
    }
    onFormPropertyChanged(key) {
        this.forceUpdate();
    }
    countActiveSteps() {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (pages instanceof Array == false) return 0;
        let counter = 0;
        for (let i = 0; i < pages.length; i++) if (flow.isPageActive(pages[i])) counter++;
        return counter;
    }
    selectNextPageID(pageID) {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages) return -1;
        for (let i = Math.max(0, pageID + 1), max = pages.length; i < max; i++) {
            let page = pages[i];
            if (flow.isPageActive(page)) return i;
        }
        return -1;
    }
    selectPrevPageID(pageID) {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages || pageID < 0) return -1;
        for (let i = Math.min(pageID - 1, pages.length); i >= 0; i--) {
            let page = pages[i];
            if (flow.isPageActive(page)) return i;
        }
        return -1;
    }
    renderQuestionPage() {
        const questionnaire = this.props.flow.questionnaire;
        const page = questionnaire.pages[this.state.pageID];
        const state = this.props.flow.getPageView(page);
        if (state && state.render) return state.render(page);
        console.error("Page doesn't not provide render function!");
        this.moveNext();
        return null;
    }
    /** Render summary of the survey answers. */
    renderSurveySummary() {
        return null;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        nextState.isPageDone = this.isPageDone(nextState.pageID);
    }
    render() {
        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                return this.renderIntroPage();
            case ProjectSurveyPageType.Survey:
                return super.render();
            case ProjectSurveyPageType.Summary:
                return this.renderSummaryPage();
        }
    }
    renderIntroPage() {
        return React.createElement("div", { className: "order-wizzard-cover" }, React.createElement("div", { className: "order-wizzard-cover__logo" }), React.createElement("div", { className: "order-wizzard-cover__info" }, React.createElement("p", null, "We’re asking you a few questions to understand what we can do for you."), React.createElement("p", null, "We will then come back to you with a quote – and you decide whether we should get started!")), React.createElement("div", { className: "order-wizzard-cover__next" }, React.createElement("a", { href: "#", className: "b-button", onClick: () => this.startSurvey() }, "Next")));
    }
    renderSummaryPage() {
        return (
            // <div className="order-wizzard">
            //     <div className="order-wizzard__step-title">Summary of your task!</div>
            //
            //     <div className="order-wizzard__step-survey">
            //         <div className="order-wizzard__summary">
            //             {this.renderSurveySummary()}
            //         </div>
            //     </div>
            //
            //     <div className="order-wizzard__cta text-center">
            //         <a href="#" className="b-button b-button--blue"
            //            onClick={() => this.startProject()}>Start project</a>
            //     </div>
            // </div>
            React.createElement("div", { className: "order-wizzard order-wizzard--login" }, React.createElement("div", { className: "order-wizzard__header" }, React.createElement("div", { className: "order-wizzard__title" }, "Thanks!"), React.createElement("div", { className: "order-wizzard__sub-title" }, "Please log in and your quote will be with you shortly")), React.createElement("div", { className: "order-wizzard__login" }, React.createElement("div", { className: "order-wizzard__login-form" }, React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "email", className: "form-control", id: "exampleInputEmail1", placeholder: "Email" })), React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "password", className: "form-control", id: "exampleInputPassword1", placeholder: "Password" })), React.createElement("div", { className: "form-group" }, React.createElement("a", { href: "#" }, "Forgot password?")), React.createElement("button", { type: "submit", className: "btn btn-primary btn-block" }, "Log in"))))
        );
    }
}
ProjectSurvey.childContextTypes = SelectionControl_1.SelectionControl.contextTypes;
exports.ProjectSurvey = ProjectSurvey;
(function (ProjectSurveyPageType) {
    /** Intro page with start survey button. */
    ProjectSurveyPageType[ProjectSurveyPageType["Intro"] = 1] = "Intro";
    /** Actual survey pages */
    ProjectSurveyPageType[ProjectSurveyPageType["Survey"] = 2] = "Survey";
    /** Summary page with results of survey and submission button. */
    ProjectSurveyPageType[ProjectSurveyPageType["Summary"] = 3] = "Summary";
})(exports.ProjectSurveyPageType || (exports.ProjectSurveyPageType = {}));
var ProjectSurveyPageType = exports.ProjectSurveyPageType;
//# sourceMappingURL=ProjectSurvey.js.map