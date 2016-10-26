/// <reference types="react" />
import { SurveyFlow } from "../../core/survey-flow";
import { ProjectSurveyFlow } from "../base/ProjectSurveyFlow";
export declare class DataEntryProject extends ProjectSurveyFlow<Survey.Forms.DataEntryProject> {
    constructor();
    protected initFlow(flow: SurveyFlow): void;
    renderServiceTypePage(page: Survey.Page): JSX.Element;
    renderDescriptionPage(page: Survey.Page): JSX.Element;
    renderDeadlinePage(page: Survey.Page): JSX.Element;
    renderCommentsPage(page: Survey.Page): JSX.Element;
}
