import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../core/survey-flow";
import {Comment} from "../components/controls/Comment";
import {RadioGroup} from "../components/controls/RadioGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {ProjectSurveyFlow} from "../components/views/ProjectSurveyFlow";
import Q from "./../data/data-entry-project";
import {DueDatePageView} from "./DueDatePageView";

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
