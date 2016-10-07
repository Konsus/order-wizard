import * as React from "react";
import {ProjectSurvey, ProjectSurveyState} from "./ProjectSurvey";
import {RadioGroup} from "./FormControls/RadioGroup";
import {CheckboxGroup} from "./FormControls/CheckboxGroup";
import {CommentField} from "./FormControls/CommentField";
import {FileUploading} from "./FormControls/FileUploading";
import {SurveyQuestion} from "./SurveyQuestion";

export class PowerPointProject extends ProjectSurvey<ProjectSurveyState, PowerPointProjectForm> {

    protected resolveNextStep(): number {
        return this.state.step + 1;
    }

    protected countActiveSteps(): number {
        return 3;
    }

    protected renderSurvey(): JSX.Element | null {
        switch (this.state.step) {
            case 1:
                return this.renderCompanyTemplate();
            case 2:
                return this.renderSecondStep();
            case 3:
                return this.renderThirdStep();
            default:
                return null;
        }
    }

    renderCompanyTemplate() {
        const question: Survey.Question = {
            form: this,
            token: nameof(this.form.template),
            title: "1. Do you have a template for Data Entry?",
            required: true,
            items: [
                {value: "yes", label: "Yes"},
                {value: "no", label: "No, but please include that as part of delivery"},
                {value: "embedded", label: "Use the template the presentation is currently in"},
            ]
        };
        return (
            <SurveyQuestion {...question}>
                <RadioGroup {...question}/>
            </SurveyQuestion>
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

    protected renderSurveySummary(): JSX.Element|any {
        return (
            <ul>
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
            </ul>
        )
    }
}

interface PowerPointProjectForm {
    template: string;
}
