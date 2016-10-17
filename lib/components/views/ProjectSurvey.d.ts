/// <reference types="react" />
import * as React from "react";
import { SurveyView, SurveyPageState } from "./SurveyView";
import { SurveyFlow } from "../../core/survey-flow";
/** Base type for project creation survey, provides intro page. */
export declare class ProjectSurvey<P extends ProjectSurveyProps, S extends ProjectSurveyState> extends SurveyView<P, S & SurveyPageState> implements React.ChildContextProvider<Survey.Context> {
    static childContextTypes: {
        [x: string]: React.Validator<any>;
    };
    constructor(...args: any[]);
    getChildContext(): Survey.Context;
    /** Move from initial page to actual survey. */
    startSurvey(): void;
    canMoveNext(): boolean;
    moveNext(): boolean;
    moveBack(): boolean;
    resetSurvey(state: S): void;
    startProject(): void;
    isPageDone(pageID: number): boolean;
    protected onFormPropertyChanged(key: string): void;
    protected countActiveSteps(): number;
    protected selectNextPageID(pageID: number): number;
    protected selectPrevPageID(pageID: number): number;
    protected renderQuestionPage(): JSX.Element | any;
    /** Render summary of the survey answers. */
    renderSurveySummary(): JSX.Element | any;
    componentWillUpdate(nextProps: P, nextState: S & SurveyPageState, nextContext: any): void;
    render(): JSX.Element | any;
    renderIntroPage(): JSX.Element;
    renderSummaryPage(): JSX.Element;
}
export interface ProjectSurveyProps {
    flow: SurveyFlow;
}
export interface ProjectSurveyState extends SurveyPageState {
    pageType: ProjectSurveyPageType;
    /** Zero-based index of questionnaire page.*/
    pageID: number;
}
export declare enum ProjectSurveyPageType {
    /** Intro page with start survey button. */
    Intro = 1,
    /** Actual survey pages */
    Survey = 2,
    /** Summary page with results of survey and submission button. */
    Summary = 3,
}
