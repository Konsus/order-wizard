import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../core/survey-flow";
import {File} from "../components/controls/File";
import {Comment} from "../components/controls/Comment";
import {RadioGroup} from "../components/controls/RadioGroup";
import {CheckGroup} from "../components/controls/CheckGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {ProjectSurveyFlow} from "../components/views/ProjectSurveyFlow";
import {DueDatePageView} from "./DueDatePageView";
import Q from "./../data/power-point-project";

export class PowerPointProject extends ProjectSurveyFlow<Survey.Forms.PowerPointProject> {

    constructor() { super(Q.survey) }

    protected initFlow(flow: SurveyFlow) {
        flow.setPageView(Q.serviceType, {render: this.renderServiceTypePage});
        flow.setPageView(Q.companyTemplate, {render: this.renderCompanyTemplatePage});
        flow.setPageView(Q.style, {render: this.renderStylePage});
        flow.setPageView(Q.files, {render: this.renderFilesPage});
        flow.setPageView(Q.purpose, {render: this.renderPurposePage});
        flow.setPageView(Q.deadline, {render: this.renderDeadlinePage});
        flow.setPageView(Q.comments, {render: this.renderCommentsPage});
    }

    @autobind
    renderServiceTypePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderCompanyTemplatePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderStylePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <CheckGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderFilesPage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <File {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderPurposePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <CheckGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderDeadlinePage(page: Survey.Page) {
        return <DueDatePageView {...page} />
    }

    @autobind
    renderCommentsPage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <Comment {...page.questions[0]} />
            </SurveyPage>
        )
    }
}
