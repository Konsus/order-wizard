import * as React from "react";
import {SurveyProps} from "./Survey";
import {ProjectSurvey, ProjectSurveyState} from "./ProjectSurvey";
import RadioGroup from "./FormControls/RadioGroup";
import CheckboxGroup from "./FormControls/CheckboxGroup";

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

        //статичный сет с данными
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

                <RadioGroup data={data}/>
            </div>
        )
    }

    renderSecondStep() {
        return (
            <div>
                <div className="order-wizzard__step-title">2. Some question here</div>

                <div className="order-wizzard__step-survey">
                    <div className="order-wizzard__text-comment">
                        <textarea placeholder="Type you comment here" id="formControlsTextarea"
                                  className="form-control"></textarea>
                    </div>
                </div>
            </div>
        )
    }

    renderThirdStep() {
        return (
            <div>
                <div className="order-wizzard__step-title">3. Some question again?</div>

                <div className="order-wizzard__step-survey">
                    <div className="order-wizzard__list-item order-wizzard__checkbox">
                        <input id="test-checkbox-1" name="test-checkbox-1" type="checkbox"/>
                        <label htmlFor="test-checkbox-1">One</label>
                    </div>

                    <div className="order-wizzard__list-item order-wizzard__checkbox">
                        <input id="test-checkbox-2" name="test-checkbox-2" type="checkbox"/>
                        <label htmlFor="test-checkbox-2">Two</label>
                    </div>

                    <div className="order-wizzard__list-item order-wizzard__checkbox">
                        <input id="test-checkbox-3" name="test-checkbox-3" type="checkbox"/>
                        <label htmlFor="test-checkbox-3">Three</label>
                    </div>
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

