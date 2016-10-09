import * as React from "react";
import {autobind} from "core-decorators";
import SurveyForm = Survey.SurveyForm;

export class RadioBox extends React.Component<Survey.View.CheckBox, void> {
    render() {
        return (
            <div className="order-wizzard__list-item order-wizzard__radio">
                <input
                    type="radio"
                    value={this.props.value}
                    label={this.props.label}
                    checked={this.props.group.checked(this.props.value)}/>
                <label>{this.props.label}</label>
            </div>
        )
    }
}

export class RadioGroup extends React.Component<RadioGroupProps, Survey.View.Value<any>> implements Survey.View.Group {

    constructor() {
        super(...arguments);
        this.state = {}
    }

    checked(value: any): boolean {
        return this.state.value == value;
    }

    @autobind
    onSelectionChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>) {
        event.persist();
        this.setState(state => {
            const input = event.target as React.HTMLProps<HTMLInputElement>;
            state.value = input.value;

            if (this.props.ref) this.props.ref(state.value);
            if (this.props.form && this.props.token)
                this.props.form[this.props.token] = state.value;

            return state;
        });
    }

    render() {
        return (
            <div className="order-wizzard__radio-group" onChange={this.onSelectionChange}>
                {this.props.options.map((option, index) => {
                    return <RadioBox {...option} key={index} group={this}
                    />;
                })}
            </div>
        )
    }
}

export interface RadioGroupProps {
    options: Survey.Option[];
    token?: React.Key;
    form?: SurveyForm;
    ref?: Survey.Ref<any>;
    defaultValue?: any;
}
