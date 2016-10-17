/// <reference types="react" />
import * as React from "react";
/**
 * Base type for any type of survey.
 */
export declare abstract class SurveyView<P, S extends SurveyPageState> extends React.Component<P, S> {
    constructor(...args: any[]);
    /** Get normalized value of the survey progress [0-1]. */
    progress(): number;
    /** Whether survey is complete and ready for submission. */
    isComplete(): boolean;
    /** Whether has any next survey step. */
    canMoveNext(): boolean;
    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    moveNext(): boolean;
    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    moveBack(): boolean;
    /** Reset survey to first step. */
    resetSurvey(state: S): void;
    /** Render survey with questions. */
    protected abstract renderQuestionPage(): JSX.Element | null;
    /** Calculate total number of active steps. */
    protected abstract countActiveSteps(): number;
    componentWillMount(): void;
    render(): JSX.Element | null;
    renderMoveNext(): JSX.Element;
}
export interface SurveyPageState {
    /** Current survey step. */
    step: number;
    /** Total count of visible steps. */
    activeSteps: number;
    /** Whether question on page are complete. */
    isPageDone: boolean;
}
