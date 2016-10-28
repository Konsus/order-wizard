import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyView, SurveyPageState} from "../../components/views/SurveyView";
import {SurveyFlow} from "../../core/survey-flow";
import {SelectionControl} from "../../components/controls/SelectionControl";
import {LoginPage} from '../views/LoginPage';
import {CreditCardPage} from '../views/CreditCardPage';
import {SummaryPage} from '../views/SummaryPage';
const ctx: Survey.Project.Context = null;

/** Base type for project creation survey, provides intro page. */
export class ProjectSurvey<P extends ProjectSurveyProps, S extends ProjectSurveyState> extends SurveyView<P, S & SurveyPageState> implements React.ChildContextProvider<Survey.Context> {

    public static contextTypes = {
        [nameof(ctx.isLoggedIn)]: React.PropTypes.func.isRequired,
        [nameof(ctx.exists)]: React.PropTypes.func.isRequired,
        [nameof(ctx.login)]: React.PropTypes.func.isRequired,
        [nameof(ctx.register)]: React.PropTypes.func.isRequired,
        [nameof(ctx.hasPaymentMethod)]: React.PropTypes.func.isRequired,
        [nameof(ctx.paymentToken)]: React.PropTypes.func.isRequired,
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

    /** Move from initial page to actual survey. */
    startSurvey() {
        this.moveNext();
    }

    canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.pageType < ProjectSurveyPageType.Success;
    }

    @autobind
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
                    return state;
                });
                return true;

            default:
                return false;
        }
    }

    @autobind
    moveBack(): boolean {

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

    @autobind
    summaryMoveNext(email: string) {
        this.setState(state => {
            state.email = email;
            state.pageType += 1;
            return state;
        })
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
                return <SummaryPage {...this.props} {...this.context}
                    moveNext={this.summaryMoveNext}
                    moveBack={this.moveBack}/>;
            case ProjectSurveyPageType.Login:
                return <LoginPage {...this.context}
                    email={this.state.email}
                    moveNext={this.moveNext}/>;
            case ProjectSurveyPageType.CreditCard:
                return <CreditCardPage {...this.context}
                    moveNext={this.moveNext}/>;
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
    email?: string;
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


