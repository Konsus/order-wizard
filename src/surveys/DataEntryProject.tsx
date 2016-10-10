import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../core/survey-flow";
import {File} from "../components/controls/File";
import {Comment} from "../components/controls/Comment";
import {RadioGroup} from "../components/controls/RadioGroup";
import {CheckGroup} from "../components/controls/CheckGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {ProjectSurveyFlow} from "../components/views/ProjectSurveyFlow";
import Q from "./../data/data-entry-project";

export class DataEntryProject extends ProjectSurveyFlow<Survey.Forms.DataEntryProject> {

    constructor() { super(Q); }

    protected initFlow(flow: SurveyFlow) {
        flow.setPageView(Q.serviceType, {render: this.renderServiceTypePage});
        flow.setPageView(Q.description, {render: this.renderDescriptionPage});
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
    renderDescriptionPage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <Comment {...page.questions[0]} />
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
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
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