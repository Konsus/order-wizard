import * as React from "react";
import {autobind} from "core-decorators";
import {RadioGroup} from "./FormControls/RadioGroup";
import {CheckboxGroup} from "./FormControls/CheckboxGroup";
import {CommentField} from "./FormControls/CommentField";
import {FileUploading} from "./FormControls/FileUploading";
import {SurveyPage} from "./SurveyQuestion";
import {SurveyState} from "../core/question-states";
import {ProjectSurvey} from "./ProjectSurvey";
import {Questionnaire, ServiceTypePage, CompanyTemplatePage, StylePage} from "./../data/power-point-project";

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
        state.setPageState(StylePage, {render: this.renderStylePage});
    }

    @autobind
    isCompanyTemplatePageActive() {
        switch (this.form.service_type) {
            case "update-template":
            case "new-template":
                return false;
            default:
                return true;
        }
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
                <RadioGroup {...page.questions[0]} form={this.form}/>
            </SurveyPage>
        )
    }

    render(): JSX.Element|any {
        return (
            <ProjectSurvey questionnaire={Questionnaire}
                           surveyState={this.surveyState}/>
        )
    }

    renderSecondStep() {

        const data = {
            commentPlaceholder: 'Put you comment here',
            commentId: 'some-comment-id'
        };

        return (
            <div>
                <div className="order-wizzard__step-title">2. Some question here</div>

                <div className="order-wizzard__step-survey">
                    <FileUploading fileLabel="Put your file here"/>
                    <CommentField data={data}/>
                </div>
            </div>
        )
    }

    renderThirdStep() {

        const data = [
            {
                checkboxId: 321,
                checkboxName: "name1",
                checkboxLabel: "Choose me"
            },
            {
                checkboxId: 654,
                checkboxName: "name2",
                checkboxLabel: "And me"
            },
            {
                checkboxId: 987,
                checkboxName: "name3",
                checkboxLabel: "Don't touch"
            }
        ];

        return (
            <div>
                <div className="order-wizzard__step-title">3. Some question again?</div>

                <div className="order-wizzard__step-survey">
                    <CheckboxGroup data={data}/>
                </div>
            </div>
        )
    }

    renderSurveySummary(): JSX.Element|any {
        return (
            <ul>
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
            </ul>
        )
    }
}
