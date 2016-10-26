/// <reference types="react" />
import { SurveyFlow } from "../../core/survey-flow";
import { ProjectSurveyFlow } from "../base/ProjectSurveyFlow";
export declare class ResearchProject extends ProjectSurveyFlow<Survey.Forms.ResearchProject> {
    constructor();
    protected initFlow(flow: SurveyFlow): void;
    renderServiceTypePage(page: Survey.Page): JSX.Element;
    renderFilesPage(page: Survey.Page): JSX.Element;
    renderDeadlinePage(page: Survey.Page): JSX.Element;
    renderCommentsPage(page: Survey.Page): JSX.Element;
}
