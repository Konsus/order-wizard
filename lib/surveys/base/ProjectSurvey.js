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
const SurveyView_1 = require("../../components/views/SurveyView");
const SelectionControl_1 = require("../../components/controls/SelectionControl");
const LoginPage_1 = require('../views/LoginPage');
const CreditCardPage_1 = require('../views/CreditCardPage');
const SummaryPage_1 = require('../views/SummaryPage');
const ctx = null;
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
        if (super.canMoveNext())
            return true;
        return this.state.pageType < ProjectSurveyPageType.Success;
    }
    moveNext() {
        if (!this.state.isPageDone)
            return false;
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
                if (!this.isPageDone(this.state.pageID))
                    return false;
                const nextPageID = this.selectNextPageID(this.state.pageID);
                this.setState(state => {
                    if (nextPageID >= 0) {
                        state.step++;
                        state.pageID = nextPageID;
                        state.activeSteps = this.countActiveSteps();
                    }
                    else {
                        state.pageType += 1;
                    }
                    return state;
                });
                return true;
            case ProjectSurveyPageType.Summary:
            case ProjectSurveyPageType.Login:
            case ProjectSurveyPageType.CreditCard:
                this.setState(state => {
                    state.pageType += 1;
                    return state;
                });
                return true;
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
                        state.step -= 1;
                        state.pageID = prevPageID;
                        return state;
                    });
                }
                else {
                    this.setState(state => {
                        state.pageType -= 1;
                        return state;
                    });
                }
                return true;
            case ProjectSurveyPageType.Summary:
            case ProjectSurveyPageType.Login:
            case ProjectSurveyPageType.CreditCard:
                this.setState(state => {
                    state.pageType -= 1;
                    return state;
                });
                return true;
        }
        return false;
    }
    summaryMoveNext(email) {
        this.setState(state => {
            state.email = email;
            state.pageType += 1;
            return state;
        });
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
        if (pages instanceof Array == false)
            if (pages == null)
                return true;
        // page is out of range
        if (pageID < 0)
            return true;
        if (pageID >= pages.length)
            return true;
        // not done if any question is not done
        const page = pages[pageID];
        const questions = page.questions;
        for (let i = 0; i < questions.length; i++)
            if (!flow.isQuestionDone(questions[i]))
                return false;
        return true;
    }
    onFormPropertyChanged(key) {
        this.forceUpdate();
    }
    countActiveSteps() {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (pages instanceof Array == false)
            return 0;
        let counter = 0;
        for (let i = 0; i < pages.length; i++)
            if (flow.isPageActive(pages[i]))
                counter++;
        return counter;
    }
    selectNextPageID(pageID) {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages)
            return -1;
        for (let i = Math.max(0, pageID + 1), max = pages.length; i < max; i++) {
            let page = pages[i];
            if (flow.isPageActive(page))
                return i;
        }
        return -1;
    }
    selectPrevPageID(pageID) {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages || pageID < 0)
            return -1;
        for (let i = Math.min(pageID - 1, pages.length); i >= 0; i--) {
            let page = pages[i];
            if (flow.isPageActive(page))
                return i;
        }
        return -1;
    }
    renderQuestionPage() {
        const questionnaire = this.props.flow.questionnaire;
        const page = questionnaire.pages[this.state.pageID];
        const state = this.props.flow.getPageView(page);
        if (state && state.render)
            return state.render(page);
        console.error("Page doesn't not provide render function!");
        this.moveNext();
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
                return React.createElement(SummaryPage_1.SummaryPage, __assign({}, this.props, this.context, {moveNext: this.summaryMoveNext, moveBack: this.moveBack}));
            case ProjectSurveyPageType.Login:
                return React.createElement(LoginPage_1.LoginPage, __assign({}, this.context, {email: this.state.email, moveNext: this.moveNext}));
            case ProjectSurveyPageType.CreditCard:
                return React.createElement(CreditCardPage_1.CreditCardPage, __assign({}, this.context, {moveNext: this.moveNext}));
            case ProjectSurveyPageType.Success:
                return this.renderSuccessPage();
        }
    }
    renderIntroPage() {
        return React.createElement("div", {className: "order-wizzard-cover"}, 
            React.createElement("div", {className: "order-wizzard-cover__logo"}), 
            React.createElement("div", {className: "order-wizzard-cover__info"}, 
                React.createElement("p", null, "We’re asking you a few questions to understand what we can do for you."), 
                React.createElement("p", null, "We will then come back to you with a quote – and you decide whether we should get started!")), 
            React.createElement("div", {className: "order-wizzard-cover__next"}, 
                React.createElement("a", {href: "#", className: "b-button", onClick: () => this.startSurvey()}, "Next")
            ));
    }
    renderSuccessPage() {
        return React.createElement("div", {className: "order-wizzard order-wizzard--login"}, 
            React.createElement("div", {className: "order-wizzard__header"}, 
                React.createElement("div", {className: "order-wizzard__title"}, "SUCCESS!"), 
                React.createElement("div", {className: "order-wizzard__sub-title"}, "Your quote will be with you shortly"))
        );
    }
}
ProjectSurvey.contextTypes = {
    [nameof(ctx.isLoggedIn)]: React.PropTypes.func.isRequired,
    [nameof(ctx.exists)]: React.PropTypes.func.isRequired,
    [nameof(ctx.login)]: React.PropTypes.func.isRequired,
    [nameof(ctx.register)]: React.PropTypes.func.isRequired,
    [nameof(ctx.hasPaymentMethod)]: React.PropTypes.func.isRequired,
    [nameof(ctx.addPaymentMethod)]: React.PropTypes.func.isRequired,
    [nameof(ctx.paymentToken)]: React.PropTypes.func.isRequired,
};
ProjectSurvey.childContextTypes = SelectionControl_1.SelectionControl.contextTypes;
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Boolean)
], ProjectSurvey.prototype, "moveNext", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Boolean)
], ProjectSurvey.prototype, "moveBack", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', void 0)
], ProjectSurvey.prototype, "summaryMoveNext", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], ProjectSurvey.prototype, "startProject", null);
exports.ProjectSurvey = ProjectSurvey;
(function (ProjectSurveyPageType) {
    /** Intro page with start survey button. */
    ProjectSurveyPageType[ProjectSurveyPageType["Intro"] = 1] = "Intro";
    /** Actual survey pages */
    ProjectSurveyPageType[ProjectSurveyPageType["Survey"] = 2] = "Survey";
    /** Summary page with results of survey and submission button. */
    ProjectSurveyPageType[ProjectSurveyPageType["Summary"] = 3] = "Summary";
    ProjectSurveyPageType[ProjectSurveyPageType["Login"] = 4] = "Login";
    ProjectSurveyPageType[ProjectSurveyPageType["CreditCard"] = 5] = "CreditCard";
    ProjectSurveyPageType[ProjectSurveyPageType["Success"] = 6] = "Success";
})(exports.ProjectSurveyPageType || (exports.ProjectSurveyPageType = {}));
var ProjectSurveyPageType = exports.ProjectSurveyPageType;
//# sourceMappingURL=ProjectSurvey.js.map