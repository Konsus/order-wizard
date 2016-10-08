import * as React from "react";
import {SurveyPage} from "./SurveyPage";
import {SurveyForm} from "../core/survey-form";

/**
 * Base type for project creation survey, provides intro page.
 */
export abstract class ProjectSurvey<P, S> extends SurveyPage<P & ProjectSurveyProps, S & ProjectSurveyState> {

    static defaultProps = {
        form: new SurveyForm()
    };

    /** Move from initial page to actual survey. */
    public startSurvey() {
        this.setState(state => {
            state.pageType = ProjectSurveyPageType.Survey;
            this.resetSurvey();
            return state;
        });
    }

    canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.pageType < ProjectSurveyPageType.Summary;
    }

    moveNext(): boolean {
        if (super.moveNext())
            return true;

        switch (this.state.pageType) {
            case ProjectSurveyPageType.Summary:
                return false;
        }

        this.setState(state => {
            state.pageType += 1;
            if (state.pageType == ProjectSurveyPageType.Survey)
                this.resetSurvey();
            return state;
        });

        return true;
    }

    moveBack(): boolean {
        if (super.moveBack())
            return true;

        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                return false;
        }

        this.setState(state => {
            state.pageType -= 1;
            return state;
        });

        return true;
    }

    componentWillMount(): void {
        super.componentWillMount();
        this.setState(state => {
            state.pageType = ProjectSurveyPageType.Intro;
            return state;
        })
    }

    /** Render summary of the survey answers. */
    abstract renderSurveySummary(): JSX.Element|any;

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
                    <a href="#" className="b-button b-button--blue">Start project</a>
                </div>
            </div>
        )
    }
}

export interface ProjectSurveyProps {
    form: Survey.SurveyForm;
    questionnaire: Survey.Questionnaire;
}

export interface ProjectSurveyState {
    pageType: ProjectSurveyPageType;
}

export enum ProjectSurveyPageType {
    /** Intro page with start survey button. */
    Intro = 1,
        /** Actual survey pages */
    Survey,
        /** Summary page with results of survey and submission button. */
    Summary,
}


