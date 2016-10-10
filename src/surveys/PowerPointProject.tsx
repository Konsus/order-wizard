import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyForm} from "../core/survey-form";
import {SurveyState} from "../core/question-states";
import {File} from "../components/controls/File";
import {Comment} from "../components/controls/Comment";
import {RadioGroup} from "../components/controls/RadioGroup";
import {CheckGroup} from "../components/controls/CheckGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {ProjectSurvey} from "../components/views/ProjectSurvey";
import Q from "./../data/power-point-project";

export class PowerPointProject extends React.Component<any,any> {

    public readonly form: Survey.Forms.PowerPointProject;

    constructor(public surveyState: SurveyState,) {
        super();
        this.form = new SurveyForm();
        this.surveyState = new SurveyState();
        this.initSurveyState(this.surveyState);
    }

    protected initSurveyState(state: SurveyState) {
        state.setPageState(Q.serviceType, {render: this.renderServiceTypePage});
        state.setPageState(Q.companyTemplate, {render: this.renderCompanyTemplatePage});
        state.setPageState(Q.style, {render: this.renderStylePage});
        state.setPageState(Q.files, {render: this.renderFilesPage});
        state.setPageState(Q.purpose, {render: this.renderPurposePage});
        state.setPageState(Q.deadline, {render: this.renderDeadlinePage});
        state.setPageState(Q.comments, {render: this.renderCommentsPage});
    }

    @autobind
    renderServiceTypePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderCompanyTemplatePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderStylePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <CheckGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderFilesPage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <File {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderPurposePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <CheckGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderDeadlinePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} />
            </SurveyPage>
        )
    }

    @autobind
    renderCommentsPage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <Comment {...page.questions[0]} />
            </SurveyPage>
        )
    }

    render(): JSX.Element|any {
        return (
            <ProjectSurvey questionnaire={Q}
                           surveyState={this.surveyState}
                           form={this.form}/>
        )
    }
}
