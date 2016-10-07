import * as React from "react";
import {autobind} from "core-decorators";

export class RadioElement extends React.Component<RadioElementProps, void> {

    render() {
        return (
            <div className="order-wizzard__list-item order-wizzard__radio">
                <input type="radio"
                       value={this.props.value}
                       defaultChecked={this.props.defaultChecked}
                       checked={this.props.group.value == this.props.value}/>
                <label>{this.props.label}</label>
            </div>
        )
    }
}

export class RadioGroup extends React.Component<Survey.Group, Survey.Value> {

    state: Survey.Value = {} as Survey.Value;

    @autobind
    onSelectionChange(event: React.FormEvent<any>) {
        event.persist();
        const value = (event.target as any).value;
        this.setState(state => state.value = value);
        this.props.form.setFormValue(this.props.token, value);
    }

    render() {
        return (
            <div className="order-wizzard__radio-group" onChange={this.onSelectionChange}>
                {this.props.items.map((item, index) => {
                    return <RadioElement key={index} group={this.state} {...item}/>;
                })}
            </div>
        )
    }
}

interface RadioElementProps extends Survey.Checkbox {
    group: Survey.Value
}
