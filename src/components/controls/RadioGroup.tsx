import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class RadioBox extends React.Component<Survey.View.CheckBox, void> {
    private input: HTMLInputElement;

    @autobind
    private onClick(e: React.MouseEvent<any>) {
        if (e.target != this.input)
            this.input.click();
    }

    render() {
        return (
            <div className="order-wizzard__list-item order-wizzard__radio"
                 onClick={this.onClick}>
                <input
                    type="radio"
                    ref={x => this.input = x}
                    value={this.props.value}
                    label={this.props.label}
                    checked={this.props.group.checked(this.props.value)}/>
                <label>{this.props.label || this.props.value}</label>
            </div>
        )
    }
}

export class RadioGroup extends SelectionControl<RadioGroupProps, Survey.View.Value<any>, any> implements Survey.View.Group {

    constructor() {
        super(...arguments);
        this.state = {value: this.props.defaultValue}
    }

    checked(value: any): boolean {
        return this.state.value == value;
    }

    @autobind
    onChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>) {
        event.persist();
        this.setState(state => {
            const input = event.target as React.HTMLProps<HTMLInputElement>;
            state.value = input.value;
            this.onValueChange(state);
            return state;
        });
    }

    render() {
        return (
            <div className="order-wizzard__radio-group" onChange={this.onChange}>
                {this.props.options.map((option, index) => {
                    return <RadioBox {...option} key={index} group={this}/>;
                })}
            </div>
        )
    }
}

export interface RadioGroupProps extends Survey.View.SelectionProps<any> {
    options: Survey.Option[];
    defaultValue?: any;
}
