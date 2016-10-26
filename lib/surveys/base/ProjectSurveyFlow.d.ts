/// <reference types="react" />
import * as React from "react";
import { SurveyFlow } from "../../core/survey-flow";
/** Basic template for quick setup of project survey. */
export declare abstract class ProjectSurveyFlow<F extends Survey.SurveyForm> extends React.Component<any, any> {
    /** Form that contains answers. */
    readonly form: F & Survey.SurveyForm;
    /** Flow of the survey. */
    readonly flow: SurveyFlow;
    constructor(questionnaire: Survey.Questionnaire);
    /**
     * Initialize render of survey pages.
     * @param flow defines flow of the survey.
     */
    protected abstract initFlow(flow: SurveyFlow): any;
    render(): JSX.Element | any;
}
