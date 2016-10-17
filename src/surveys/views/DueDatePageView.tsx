import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "../../components/controls/SelectionControl";
import {RadioGroup} from "../../components/controls/RadioGroup";
import {SurveyPage} from "../../components/views/SurveyPage";
import {DatePicker} from "../../components/controls/DatePicker";
import {DueDateQuestion} from "../../data/common";

export class DueDatePageView extends SelectionControl<DueDateProps, DueDateState> {

    private datePicker: DatePicker;

    constructor(...args) {
        super(...args);
        const value = this.state.value;
        if (value != null && value != "no")
            this.state.visibleDate = true;
    }

    get token(): string|any {
        let token = super.token;
        if (token != null) return token;

        const questions = this.props.questions;
        if (questions != null && questions.length > 0)
            token = questions[0].token;

        if (token == null)
            token = DueDateQuestion.token;

        return token;
    }

    @autobind
    onSelect(value: any) {
        switch (value) {
            case "yes":
                this.setState(state => {
                    state.visibleDate = true;
                    state.value = value;
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
        }
    }

    @autobind
    onDate(value: any) {
        this.setState(state => {
            state.visibleDate = true;
            state.value = value;
            this.onValueChange(state);
            return state;
        });
    }

    render(): JSX.Element|any {
        let value = this.state.value;
        if (isFinite(value)) value = "yes";

        return (
            <SurveyPage {...this.props}>
                <RadioGroup {...this.props} options={DueDateQuestion.options}
                                            token={null}
                                            value={value}
                                            valueRef={this.onSelect}/>
                {this.renderDate()}
            </SurveyPage>
        );
    }

    renderDate(): JSX.Element|any {
        if (!this.state.visibleDate) return null;
        let value = this.state.value;
        if (isNaN(value)) value = null;

        return <DatePicker ref={x => this.datePicker = x}
                           label={"Date"}
                           value={value}
                           valueRef={this.onDate}/>
    }
}

export interface DueDateProps extends Survey.View.SelectionProps<string> {
    title?: string;
    questions: Survey.Question[];
}

export interface DueDateState extends Survey.View.Value<string> {
    visibleDate?: boolean;
}
