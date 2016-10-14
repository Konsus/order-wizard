import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../core/survey-flow";
import {File} from "../components/controls/File";
import {Comment} from "../components/controls/Comment";
import {RadioGroup} from "../components/controls/RadioGroup";
import {CheckGroup} from "../components/controls/CheckGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {ProjectSurveyFlow} from "../components/views/ProjectSurveyFlow";
import {DueDatePageView} from "./views/DueDatePageView";
import Q from "../data/projects/web-project";

export class WebProject extends ProjectSurveyFlow<Survey.Forms.WebProject> {

    constructor() { super(Q.survey) }

    protected initFlow(flow: SurveyFlow) {
        flow.setPageView(Q.website, {render: this.renderWebSitePage});
        flow.setPageView(Q.service, {render: this.renderServicePage});
        flow.setPageView(Q.techInfo, {render: this.renderTechInfoPage});
        flow.setPageView(Q.techRequirements, {render: this.renderTechRequirementsPage});
        flow.setPageView(Q.techPreferences, {render: this.renderTechPreferencesPage});
        flow.setPageView(Q.purpose, {render: this.renderPurposePage});
        flow.setPageView(Q.files, {render: this.renderFilesPage});
        flow.setPageView(Q.deadline, {render: this.renderDeadlinePage});
        flow.setPageView(Q.comments, {render: this.renderCommentsPage});
    }

    @autobind
    renderWebSitePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderServicePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <CheckGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderTechInfoPage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <Comment {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderTechRequirementsPage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]}/>
            </SurveyPage>
        )
    }

    @autobind
    renderTechPreferencesPage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]}/>
            </SurveyPage>
        )
    }

    @autobind
    renderPurposePage(page: Survey.Page) {
        return (
            <SurveyPage {...page} >
                <Comment {...page.questions[0]} />
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
