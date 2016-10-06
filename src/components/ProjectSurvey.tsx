import * as React from "react";
import {SurveyState, SurveyProps, Survey} from "./Survey";

/**
 * Base type for project creation survey, provides intro page.
 */
export abstract class ProjectSurvey<P extends SurveyProps, S extends ProjectSurveyState> extends Survey<P, S> {

    /** Move from initial page to actual survey. */
    startSurvey() {
        this.setState(state => {
            state.page = ProjectSurveyPage.Survey;
            this.resetSurvey();
            return state;
        });
    }

    public canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.page < ProjectSurveyPage.Summary;
    }

    public moveNext(): boolean {
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

    public moveBack(): boolean {
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

    /** Render summary of the survey answers. */
    protected abstract renderSurveySummary(): JSX.Element|any;

    componentWillMount(): void {
        super.componentWillMount();
        this.setState(state => {
            state.page = ProjectSurveyPage.Intro;
            return state;
        })
    }

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
            <div>
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


