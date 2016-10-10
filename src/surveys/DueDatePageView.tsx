import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "../components/controls/SelectionControl";
import {RadioGroup} from "../components/controls/RadioGroup";
import {SurveyPage} from "../components/views/SurveyPage";
import {DatePicker} from "../components/controls/DatePicker";
import {DueDateQuestion} from "../data/common";

export class DueDatePageView extends SelectionControl<DueDateProps, DueDateState, string> {

    constructor(...args) {
        super(...args);

        this.state = {
            value: "no",
            date: "",
        };

        if (!this.token && this.props.questions)
            this.token = this.props.questions[0].token;

    }

    @autobind
    onSelect(value: any) {

        switch (value) {
            case "yes":
                this.setState(state => {
                    state.visibleDate = value === "yes";
                    state.value = state.date || value;
                    this.onValueChange(state);
                    return state;
                });
                break;

            case "no":
                this.setState(state => {
                    state.visibleDate = false;
                    state.value = value;
                    this.onValueChange(state);
                    return state;
                });
                break;

            default:
                this.setState(state => {
                    state.value = value;
                    state.date = value;
                    this.onValueChange(state);
                    return state;
                });
                break
        }

    }

    render(): JSX.Element|any {
        return (
            <SurveyPage {...this.props}>
                <RadioGroup {...this.props} options={DueDateQuestion.options}
                                            token={null}
                                            value={this.state.value}
                                            valueRef={this.onSelect}/>
                {this.renderDate()}
            </SurveyPage>
        );
    }

    renderDate(): JSX.Element|any {
        if (!this.state.visibleDate) return null;
        return <DatePicker label={"Date"}
                           value={this.state.date}
                           valueRef={this.onSelect}/>
    }
}

export interface DueDateProps extends Survey.View.SelectionProps<string> {
    title?: string;
    questions: Survey.Question[];
}

export interface DueDateState extends Survey.View.Value<string> {
    visibleDate?: boolean;
    date?: string;
}
