/// <reference types="react" />
import { SurveyFlow } from "../../core/survey-flow";
import { ProjectSurveyFlow } from "../base/ProjectSurveyFlow";
export declare class DesignProject extends ProjectSurveyFlow<Survey.Forms.DesignProject> {
    constructor();
    protected initFlow(flow: SurveyFlow): void;
    renderServicePage(page: Survey.Page): JSX.Element;
    renderDesignPage(page: Survey.Page): JSX.Element;
    renderStylePage(page: Survey.Page): JSX.Element;
    renderFilesPage(page: Survey.Page): JSX.Element;
    renderDeadlinePage(page: Survey.Page): JSX.Element;
    renderCommentsPage(page: Survey.Page): JSX.Element;
}
