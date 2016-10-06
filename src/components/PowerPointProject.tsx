import * as React from "react";
import {SurveyProps} from "./Survey";
import {ProjectSurvey, ProjectSurveyState} from "./ProjectSurvey";
import {RadioGroup} from "./FormControls/RadioGroup";
import {CheckboxGroup} from "./FormControls/CheckboxGroup";
import {CommentField} from "./FormControls/CommentField";
import {FileUploading} from "./FormControls/FileUploading";

export class PowerPointProject extends ProjectSurvey<SurveyProps, ProjectSurveyState> {

    protected resolveNextStep(): number {
        return this.state.step + 1;
    }

    protected countActiveSteps(): number {
        return 3;
    }

    protected renderSurvey(): JSX.Element | null {
        switch (this.state.step) {
            case 1:
                return this.renderFisrtStep();
            case 2:
                return this.renderSecondStep();
            case 3:
                return this.renderThirdStep();
            default:
                return null;
        }
    }

    renderFisrtStep() {

        const data = [
            {
                radioId: 123,
                radioName: "some-name",
                radioLabel: "yes"
            },
            {
                radioId: 456,
                radioName: "some-name",
                radioLabel: "no"
            },
            {
                radioId: 789,
                radioName: "some-name",
                radioLabel: "maybe"
            }
        ];

        return (
            <div>
                <div className="order-wizzard__step-title">1. Do you have a template for Data Entry?</div>

                <div className="order-wizzard__step-survey">
                    <RadioGroup data={data}/>
                </div>
            </div>
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

