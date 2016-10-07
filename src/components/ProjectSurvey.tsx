import * as React from "react";
import {SurveyState, SurveyProps, SurveyPage} from "./SurveyPage";

/**
 * Base type for project creation survey, provides intro page.
 */
export abstract class ProjectSurvey<S extends ProjectSurveyState, F> extends SurveyPage<SurveyProps, S> implements Survey.SurveyForm {

    state: S = {} as S;
    form: F = {} as F;

    /** Move from initial page to actual survey. */
    public startSurvey() {
        this.setState(state => {
            state.page = ProjectSurveyPage.Survey;
            this.resetSurvey();
            return state;
        });
    }

    public getFormValue(key: React.Key): any {
        return (this.form as any)[key];
    }

    setFormValue(key: React.Key, value: any) {
        console.log("SET FORM VALUE: " + key + " >> " + value);
        (this.form as any)[key] = value;
    }

    canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.page < ProjectSurveyPage.Summary;
    }

    moveNext(): boolean {
        if (super.moveNext())
            return true;

        switch (this.state.page) {
            case ProjectSurveyPage.Summary:
                return false;
        }

        this.setState(state => {
            state.page += 1;
            if (state.page == ProjectSurveyPage.Survey)
                this.resetSurvey();
            return state;
        });

        return true;
    }

    moveBack(): boolean {
        if (super.moveBack())
            return true;

        switch (this.state.page) {
            case ProjectSurveyPage.Intro:
                return false;
        }

        this.setState(state => {
            state.page -= 1;
            return state;
        });

        return true;
    }

    componentWillMount(): void {
        super.componentWillMount();
        this.setState(state => {
            state.page = ProjectSurveyPage.Intro;
            return state;
        })
    }

    /** Render summary of the survey answers. */
    abstract renderSurveySummary(): JSX.Element|any;

    render(): JSX.Element|any {
        switch (this.state.page) {
            case ProjectSurveyPage.Intro:
                return this.renderIntroPage();
            case ProjectSurveyPage.Survey:
                return super.render();
            case ProjectSurveyPage.Summary:
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

export interface ProjectSurveyState extends SurveyState {
    page: ProjectSurveyPage;
}

export enum ProjectSurveyPage {
    /** Intro page with start survey button. */
    Intro = 1,
        /** Actual survey pages */
    Survey,
        /** Summary page with results of survey and submission button. */
    Summary,
}


