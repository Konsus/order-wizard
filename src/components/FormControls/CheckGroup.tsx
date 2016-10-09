import * as React from "react";
import {autobind} from "core-decorators";
import SurveyForm = Survey.SurveyForm;

export class CheckBox extends React.Component<Survey.View.CheckBox,void> {
    render() {
        return (
            <div className="order-wizzard__list-item order-wizzard__checkbox">
                <input
                    type="checkbox"
                    value={this.props.value}
                    label={this.props.label}
                    checked={this.props.group.checked(this.props.value)}/>
                <label>{this.props.label}</label>
            </div>
        )
    }
}

export class CheckGroup extends React.Component<CheckBoxGroupProps, Survey.View.Value<any[]>> implements Survey.View.Group {

    constructor() {
        super(...arguments);
        this.state = {value: []};
        console.log("STATE", this.state);
    }

    checked(value: any): boolean {
        return this.state.value.indexOf(value) >= 0;
    }

    @autobind
    onSelectionChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>) {
        event.persist();
        this.setState(state => {
            const input = event.target as React.HTMLProps<HTMLInputElement>;
            const index = state.value.indexOf(input.value);

            // add / remove item
            if (input.checked) {
                if (index < 0)
                    state.value.push(input.value);
            }
            else {
                if (index >= 0)
                    state.value.splice(index, 1);
            }

            if (this.props.form && this.props.token)
                this.props.form[this.props.token] = state.value;

            if (this.props.ref) this.props.ref(state.value);

            return state;
        });

    }

    render() {
        return (
            <div className="order-wizzard__checkbox-group" onChange={this.onSelectionChange}>
                {this.props.options.map((option, index) => {
                    return <CheckBox {...option} key={index} group={this}
                    />;
                })}
            </div>
        )
    }
}

export interface CheckBoxGroupProps {
    options: Survey.Option[];
    token?: React.Key;
    form?: SurveyForm;
    ref?: Survey.Ref<any>;
    defaultValue?: any;
}
