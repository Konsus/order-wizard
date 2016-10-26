/// <reference types="react" />
import { SurveyFlow } from "../../core/survey-flow";
import { ProjectSurveyFlow } from "../base/ProjectSurveyFlow";
export declare class WebProject extends ProjectSurveyFlow<Survey.Forms.WebProject> {
    constructor();
    protected initFlow(flow: SurveyFlow): void;
    renderWebSitePage(page: Survey.Page): JSX.Element;
    renderServicePage(page: Survey.Page): JSX.Element;
    renderTechInfoPage(page: Survey.Page): JSX.Element;
    renderTechRequirementsPage(page: Survey.Page): JSX.Element;
    renderTechPreferencesPage(page: Survey.Page): JSX.Element;
    renderPurposePage(page: Survey.Page): JSX.Element;
    renderFilesPage(page: Survey.Page): JSX.Element;
    renderDeadlinePage(page: Survey.Page): JSX.Element;
    renderCommentsPage(page: Survey.Page): JSX.Element;
}
