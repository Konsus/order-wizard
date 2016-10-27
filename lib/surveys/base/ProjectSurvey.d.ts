/// <reference types="react" />
import * as React from "react";
import { SurveyView, SurveyPageState } from "../../components/views/SurveyView";
import { SurveyFlow } from "../../core/survey-flow";
/** Base type for project creation survey, provides intro page. */
export declare class ProjectSurvey<P extends ProjectSurveyProps, S extends ProjectSurveyState> extends SurveyView<P, S & SurveyPageState> implements React.ChildContextProvider<Survey.Context> {
    static contextTypes: {
        [x: string]: React.Validator<any>;
    };
    static childContextTypes: {
        [x: string]: React.Validator<any>;
    };
    context: Survey.Project.Context;
    constructor(...args: any[]);
    getChildContext(): Survey.Context;
    /** Move from initial page to actual survey. */
    startSurvey(): void;
    canMoveNext(): boolean;
    moveNext(): boolean;
    moveBack(): boolean;
    summaryMoveNext(email: string): void;
    resetSurvey(state: S): void;
    startProject(): void;
    isPageDone(pageID: number): boolean;
    protected onFormPropertyChanged(key: string): void;
    protected countActiveSteps(): number;
    protected selectNextPageID(pageID: number): number;
    protected selectPrevPageID(pageID: number): number;
    protected renderQuestionPage(): JSX.Element | any;
    componentWillUpdate(nextProps: P, nextState: S & SurveyPageState, nextContext: any): void;
    render(): JSX.Element | any;
    renderIntroPage(): JSX.Element;
    renderSuccessPage(): JSX.Element;
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
export declare enum ProjectSurveyPageType {
    /** Intro page with start survey button. */
    Intro = 1,
    /** Actual survey pages */
    Survey = 2,
    /** Summary page with results of survey and submission button. */
    Summary = 3,
    Login = 4,
    CreditCard = 5,
    Success = 6,
}
