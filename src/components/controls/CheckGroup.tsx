import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class CheckBox extends React.Component<Survey.View.CheckBox, void> {
    private input: HTMLInputElement;

    @autobind
    private onClick(e: React.MouseEvent<any>) {
        if (e.target != this.input)
            this.input.click();
    }

    render() {
        return (
            <div className="order-wizzard__list-item order-wizzard__checkbox"
                 onClick={this.onClick}>
                <input
                    type="checkbox"
                    ref={x => this.input = x}
                    value={this.props.value}
                    label={this.props.label}
                    checked={this.props.group.checked(this.props.value)}/>
                <label>{this.props.label || this.props.value}</label>
            </div>
        )
    }
}

export class CheckGroup extends SelectionControl<CheckBoxGroupProps, Survey.View.Value<any[]>> implements Survey.View.Group {

    constructor() {
        super(...arguments);
        this.state.value = [];
    }

    checked(value: any): boolean {
        return this.state.value.indexOf(value) >= 0;
    }

    @autobind
    onChange(event: React.FormEvent<React.HTMLProps<HTMLInputElement>>) {
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

            this.onValueChange(state);
            return state;
        });

    }

    render() {
        return (
            <div className="order-wizzard__checkbox-group" onChange={this.onChange}>
                {this.props.options.map((option, index) => {
                    return <CheckBox {...option} key={index} group={this}/>;
                })}
            </div>
        )
    }
}

export interface CheckBoxGroupProps extends Survey.View.SelectionProps<any> {
    options: Survey.Option[];
    defaultValue?: any;
}
