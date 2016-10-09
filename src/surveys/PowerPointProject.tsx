import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyState} from "../core/question-states";
import {File} from "../components/controls/File";
import {Comment} from "../components/controls/Comment";
import {RadioGroup} from "../components/controls/RadioGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {ProjectSurvey} from "../components/views/ProjectSurvey";
import {
    Questionnaire,
    ServiceTypePage,
    CompanyTemplatePage,
    StylePage,
    FilesPage,
    PurposePage,
    DeadlinePage,
    CommentsPage
} from "./../data/power-point-project";

export class PowerPointProject extends React.Component<any,any> {

    constructor(public surveyState: SurveyState,
                public form: Survey.Forms.PowerPointProject) {
        super();
        this.form = {};
        this.surveyState = new SurveyState();
        this.initSurveyState(this.surveyState);
    }

    protected initSurveyState(state: SurveyState) {
        state.setPageState(ServiceTypePage, {render: this.renderServiceTypePage});
        state.setPageState(CompanyTemplatePage, {
            render: this.renderCompanyTemplatePage,
            active: this.isCompanyTemplatePageActive,
        });
        state.setPageState(StylePage, {
            render: this.renderStylePage,
            active: this.isStylePageActive,
        });
        state.setPageState(FilesPage, {render: this.renderFilesPage});
        state.setPageState(PurposePage, {
            render: this.renderPurposePage,
            active: this.isPurposePageActive,
        });
        state.setPageState(DeadlinePage, {render: this.renderDeadlinePage});
        state.setPageState(CommentsPage, {render: this.renderCommentsPage});
    }

    @autobind
    isCompanyTemplatePageActive() {
        switch (this.form.service_type) {
            case "update-template":
            case "new-template":
                return false;
        }
        return true;
    }

    @autobind
    isStylePageActive() {
        switch (this.form.template) {
            case "yes":
            case "embedded":
                return false;
        }
        return true;
    }

    @autobind
    isPurposePageActive() {
        switch (this.form.service_type) {
            case "style-format":
            case "style-enhance":
            case "new-presentation":
                return false;
        }

        switch (this.form.template) {
            case "yes":
            case "embedded":
                return false;
        }

        return true;
    }

    @autobind
    renderServiceTypePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    @autobind
    renderCompanyTemplatePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    @autobind
    renderStylePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <CheckGroup {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    @autobind
    renderFilesPage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <File {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    @autobind
    renderPurposePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    @autobind
    renderDeadlinePage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <RadioGroup {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    @autobind
    renderCommentsPage(page: Survey.QuestionPage) {
        return (
            <SurveyPage {...page} >
                <Comment {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    render(): JSX.Element|any {
        return (
            <ProjectSurvey questionnaire={Questionnaire}
                           surveyState={this.surveyState}
                           form={this.form}/>
        )
    }
}
