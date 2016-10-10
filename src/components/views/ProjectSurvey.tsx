import * as React from "react";
import {SurveyView, SurveyPageState} from "./SurveyView";
import {SurveyState} from "../../core/question-states";
import {SurveyContext} from "../../core/survey-context";
import {SelectionControl} from "../controls/SelectionControl";

/**
 * Base type for project creation survey, provides intro page.
 */
export class ProjectSurvey<P extends ProjectSurveyProps, S extends ProjectSurveyState> extends SurveyView<P, S & SurveyPageState> implements React.ChildContextProvider<Survey.SurveyContext> {

    public static childContextTypes = SelectionControl.contextTypes;

    private survey: SurveyContext;

    getChildContext(): Survey.SurveyContext {
        this.survey = new SurveyContext(this.props.questionnaire, this.props.form);
        return this.survey;
    }

    /** Move from initial page to actual survey. */
    startSurvey() {
        this.moveNext();
    }

    canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.pageType < ProjectSurveyPageType.Summary;
    }

    moveNext(): boolean {
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
                return false;

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
        state.pageType = ProjectSurveyPageType.Intro;
    }

    startProject() {
        console.log("START PROJECT: ", this.props.form);
    }

    protected countActiveSteps(): number {
        const surveyState = this.props.surveyState;
        const questionnaire = this.props.questionnaire;
        if (!questionnaire) return 0;

        let counter = 0;
        for (var page of questionnaire.pages) {

            if (surveyState.isPageActive(page, this.survey))
                counter++;
        }

        return counter;
    }

    protected selectNextPageID(pageID: number): number {
        const surveyState = this.props.surveyState;
        const questionnaire = this.props.questionnaire;
        const pages = questionnaire && questionnaire.pages;
        if (!pages) return -1;

        for (let i = Math.max(0, pageID + 1), max = pages.length; i < max; i++) {
            let page = pages[i];
            if (surveyState.isPageActive(page, this.survey))
                return i;
        }

        return -1;
    }

    protected selectPrevPageID(pageID: number): number {
        const surveyState = this.props.surveyState;
        const questionnaire = this.props.questionnaire;
        const pages = questionnaire && questionnaire.pages;
        if (!pages || pageID < 0) return -1;

        for (let i = Math.min(pageID - 1, pages.length); i >= 0; i--) {
            let page = pages[i];
            if (surveyState.isPageActive(page, this.survey))
                return i;
        }

        return -1;
    }

    protected renderQuestionPage(): JSX.Element|any {
        const questionnaire = this.props.questionnaire;
        if (!questionnaire) return null;

        const page = questionnaire.pages[this.state.pageID];
        const state = this.props.surveyState.getPageState(page);

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

    render(): JSX.Element|any {
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
        return (
            <div className="order-wizzard-cover">
                <div className="order-wizzard-cover__logo">
                    <h2>KONSUS</h2>
                </div>

                <div className="order-wizzard-cover__info">
                    <p>We’re asking you a few questions to understand what we can do for you.</p>
                    <p>We will then come back to you with a quote – and you decide whether we should get started!</p>
                </div>

                <div className="order-wizzard-cover__next">
                    <a href="#" className="b-button" onClick={() => this.startSurvey()}>NEXT</a>
                </div>
            </div>
        )
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

                <div className="order-wizzard__cta text-center">
                    <a href="#" className="b-button b-button--blue"
                       onClick={() => this.startProject()}>Start project</a>
                </div>
            </div>
        )
    }
}

export interface ProjectSurveyProps {
    form?: Survey.SurveyForm,
    surveyState: SurveyState;
    questionnaire: Survey.Questionnaire;
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
}


