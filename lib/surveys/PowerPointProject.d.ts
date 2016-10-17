/// <reference types="react" />
import { SurveyFlow } from "../core/survey-flow";
import { ProjectSurveyFlow } from "../components/views/ProjectSurveyFlow";
export declare class PowerPointProject extends ProjectSurveyFlow<Survey.Forms.PowerPointProject> {
    constructor();
    protected initFlow(flow: SurveyFlow): void;
    renderServiceTypePage(page: Survey.Page): JSX.Element;
    renderCompanyTemplatePage(page: Survey.Page): JSX.Element;
    renderStylePage(page: Survey.Page): JSX.Element;
    renderFilesPage(page: Survey.Page): JSX.Element;
    renderPurposePage(page: Survey.Page): JSX.Element;
    renderDeadlinePage(page: Survey.Page): JSX.Element;
    renderCommentsPage(page: Survey.Page): JSX.Element;
}
