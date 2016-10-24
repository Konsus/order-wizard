import * as React from "react";
import {SurveyView, SurveyPageState} from "../../components/views/SurveyView";
import {SurveyFlow} from "../../core/survey-flow";
import {SelectionControl} from "../../components/controls/SelectionControl";
import {autobind} from "core-decorators";
import "braintree-web";
var braintree = require('braintree-web');
var BraintreeDropIn = require('braintree-react').DropIn;
var testClientToken = require('braintree-react/example/dummy-client-token');
const c: Survey.Project.Context = null;

/** Base type for project creation survey, provides intro page. */
export class ProjectSurvey<P extends ProjectSurveyProps, S extends ProjectSurveyState> extends SurveyView<P, S & SurveyPageState> implements React.ChildContextProvider<Survey.Context> {

    public static contextTypes = {
        [nameof(c.isLoggedIn)]: React.PropTypes.func.isRequired,
        [nameof(c.isNewUser)]: React.PropTypes.func.isRequired,
        [nameof(c.hasCreditCard)]: React.PropTypes.func.isRequired,
    };

    public static childContextTypes = SelectionControl.contextTypes;

    context: Survey.Project.Context;

    constructor(...args) {
        super(...args);
        this.props.flow.form.onPropertyChanged.attach(this, this.onFormPropertyChanged);
        this.resetSurvey(this.state);
    }

    getChildContext(): Survey.Context {
        return this.props.flow.context;
    }

    isLoggedIn(): boolean {
        return this.context.isLoggedIn();
    }

    isNewUser(): boolean {
        return this.context.isNewUser();
    }

    hasCreditCard(): boolean {
        return this.context.hasCreditCard();
    }

    braintreeToken(): string {
        return testClientToken;
    }

    @autobind
    registerUser() {
        this.moveNext();
        console.error("#registerUser is not implemented yet!");
    }

    @autobind
    login() {
        console.error("#login is not implemented yet!");
        this.moveNext();
    }

    @autobind
    submitCreditCard() {
        console.error("#submitCreditCard is not implemented yet!");
        this.moveNext();
    }

    /** Move from initial page to actual survey. */
    startSurvey() {
        this.moveNext();
    }

    canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.pageType < ProjectSurveyPageType.Success;
    }

    moveNext(): boolean {
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
                    //noinspection FallThroughInSwitchStatementJS
                    switch (state.pageType) {
                        case ProjectSurveyPageType.Login:
                            // skip login page if user is logged in
                            if (this.isLoggedIn()) state.pageType += 1;
                        case ProjectSurveyPageType.CreditCard:
                            // skip credit card page if user already left credit card
                            if (this.hasCreditCard()) state.pageType += 1;
                            break
                    }
                    return state;
                });
                return true;

            default:
                return false;
        }
    }

    moveBack(): boolean {

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

    resetSurvey(state: S): void {
        super.resetSurvey(state);
        state.pageID = -1;
        state.isPageDone = true;
        state.pageType = ProjectSurveyPageType.Intro;
    }

    @autobind
    startProject() {
        console.log("START PROJECT: ", JSON.stringify(this.props.flow.form));
    }

    isPageDone(pageID: number): boolean {
        // done by default if no pages
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (pages instanceof Array == false)
            if (pages == null) return true;

        // page is out of range
        if (pageID < 0) return true;
        if (pageID >= pages.length) return true;

        // not done if any question is not done
        const page = pages[pageID];
        const questions = page.questions;
        for (let i = 0; i < questions.length; i++)
            if (!flow.isQuestionDone(questions[i]))
                return false;

        return true;
    }

    protected onFormPropertyChanged(key: string) {
        this.forceUpdate();
    }

    protected countActiveSteps(): number {
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

    protected selectNextPageID(pageID: number): number {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages) return -1;

        for (let i = Math.max(0, pageID + 1), max = pages.length; i < max; i++) {
            let page = pages[i];
            if (flow.isPageActive(page))
                return i;
        }

        return -1;
    }

    protected selectPrevPageID(pageID: number): number {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages || pageID < 0) return -1;

        for (let i = Math.min(pageID - 1, pages.length); i >= 0; i--) {
            let page = pages[i];
            if (flow.isPageActive(page))
                return i;
        }

        return -1;
    }

    protected renderQuestionPage(): JSX.Element|any {
        const questionnaire = this.props.flow.questionnaire;
        const page = questionnaire.pages[this.state.pageID];
        const state = this.props.flow.getPageView(page);

        if (state && state.render)
            return state.render(page);

        console.error("Page doesn't not provide render function!");
        this.moveNext();
        return null;
    }

    /** Render summary of the survey answers. */
    renderSurveySummary(): JSX.Element|any {
        return null;
    }

    componentWillUpdate(nextProps: P, nextState: S & SurveyPageState, nextContext: any): void {
        nextState.isPageDone = this.isPageDone(nextState.pageID);
    }

    render(): JSX.Element|any {
        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                return this.renderIntroPage();
            case ProjectSurveyPageType.Survey:
                return super.render();
            case ProjectSurveyPageType.Summary:
                return this.renderSummaryPage();
            case ProjectSurveyPageType.Login:
                return this.renderLoginPage();
            case ProjectSurveyPageType.CreditCard:
                return this.renderCreditCardPage();
            case ProjectSurveyPageType.Success:
                return this.renderSuccessPage();
        }
    }

    renderIntroPage() {
        return <div className="order-wizzard-cover">
            <div className="order-wizzard-cover__logo"></div>

            <div className="order-wizzard-cover__info">
                <p>We’re asking you a few questions to understand what we can do for you.</p>
                <p>We will then come back to you with a quote – and you decide whether we should get started!</p>
            </div>

            <div className="order-wizzard-cover__next">
                <a href="#" className="b-button" onClick={() => this.startSurvey()}>Next</a>
            </div>
        </div>
    }

    renderLoginPage() {
        const isNewUser = this.isNewUser();
        return isNewUser
            ? this.renderNewUserPage()
            : this.renderUserLoginPage();
    }

    renderNewUserPage() {
        return <div className="order-wizzard order-wizzard--login">
            <div className="order-wizzard__header">
                <div className="order-wizzard__title">SUCCESS!</div>
                <div className="order-wizzard__sub-title">Your quote will be with you shortly</div>
            </div>

            <div className="order-wizzard__login">
                <header>
                    Meanwhile, can you please complete your profile so we are <br/>
                    ready to go if you approve the quote:
                </header>

                <div className="order-wizzard__login-form order-wizzard__login-form__next-step">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-xs-6">
                                <input type="text" className="form-control" placeholder="First name*"/>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <input type="text" className="form-control" placeholder="Last name*"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Company name"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Set a password*"/>
                    </div>
                    <button type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.registerUser}>
                        Submit
                    </button>
                    <p>*Required</p></div>
            </div>
        </div>
    }

    renderUserLoginPage() {
        return <div className="order-wizzard order-wizzard--login">
            <div className="order-wizzard__header">
                <div className="order-wizzard__title">Thank you!</div>
                <div className="order-wizzard__sub-title">Please sign in and your quote will be with you shortly</div>
            </div>

            <div className="order-wizzard__login">
                <div className="order-wizzard__login-form">
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.login}> Log in
                    </button>
                </div>
            </div>
        </div>
    }

    renderCreditCardPage() {
        const clientToken = this.braintreeToken();
        return <div className="order-wizzard">
            <div className="order-wizzard__header">
                <div className="order-wizzard__sub-title">
                    Add your credit card details so we are ready to go if you approve the quote.
                </div>
            </div>
            <form>
                <BraintreeDropIn braintree={braintree}
                                 clientToken={clientToken}/>
            </form>
            <button type="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.submitCreditCard}> Submit
            </button>
        </div>
    }

    renderSummaryPage() {
        return (
            <div className="order-wizzard">
                <div className="order-wizzard__step-title">Summary of your task!</div>
                <div className="order-wizzard__step-survey">
                    <div className="order-wizzard__summary">
                        {this.renderSurveySummary()}
                    </div>
                </div>
                {this.renderSummaryPageNextButton()}
            </div>
        )
    }

    renderSummaryPageNextButton() {
        const loggedIn = this.isLoggedIn();
        const label = loggedIn ? "Submit" : "Next";
        return <div className="order-wizzard__cta text-center">
            <a href="#" className="b-button b-button--blue"
               onClick={() => this.moveNext()}>{label}</a>
        </div>
    }

    renderSuccessPage() {
        return <div className="order-wizzard order-wizzard--login">
            <div className="order-wizzard__header">
                <div className="order-wizzard__title">SUCCESS!</div>
                <div className="order-wizzard__sub-title">Your quote will be with you shortly</div>
            </div>
        </div>
    }
}

export interface ProjectSurveyProps {
    flow: SurveyFlow;
}

export interface ProjectSurveyState extends SurveyPageState {
    pageType: ProjectSurveyPageType;
    /** Zero-based index of questionnaire page.*/
    pageID: number;
}

export enum ProjectSurveyPageType {
    /** Intro page with start survey button. */
    Intro = 1,
        /** Actual survey pages */
    Survey,
        /** Summary page with results of survey and submission button. */
    Summary,
    Login,
    CreditCard,
    Success,
}


