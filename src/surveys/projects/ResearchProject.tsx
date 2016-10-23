import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../../core/survey-flow";
import {Comment} from "../../components/controls/Comment";
import {File} from "../../components/controls/File";
import {RadioGroup} from "../../components/controls/RadioGroup";
import {SurveyPage} from "../../components/views/SurveyPage";
import {ProjectSurveyFlow} from "../base/ProjectSurveyFlow";
import {DueDatePageView} from "../views/DueDatePageView";
import Q from "../../data/projects/research-project";

export class ResearchProject extends ProjectSurveyFlow<Survey.Forms.ResearchProject> {

    constructor() { super(Q.survey); }

    protected initFlow(flow: SurveyFlow) {
        flow.setPageView(Q.service, {render: this.renderServiceTypePage});
        flow.setPageView(Q.files, {render: this.renderFilesPage});
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
