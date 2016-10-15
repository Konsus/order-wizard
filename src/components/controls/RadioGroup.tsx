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
            <div key={this.props.id || this.props.value}
                 className="order-wizzard__list-item order-wizzard__radio"
                 onClick={this.onClick}>
                <input type="radio"
                       ref={x => this.input = x}
                       value={this.props.value}
                       label={this.props.label}
                       checked={this.props.group.checked(this.props.value)}
                       onChange={() => {}}
                />
                <label><span>{this.props.label || this.props.value}</span></label>
            </div>
        )
    }
}

export class RadioGroup extends SelectionControl<Survey.View.SelectionProps<any>, any> implements Survey.View.Group {

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

    renderActiveView(): JSX.Element|any {
        return <div key={this.props.id || this.token}
                    className="order-wizzard__radio-group"
                    onChange={this.onChange}>
            {this.renderOptions(this.props.options)}
        </div>
    }

    renderOption(option: Survey.Option, index: number, active: boolean): JSX.Element|any {
        return <RadioBox {...option} key={`${this.token}.${option.value}`}
                                     group={this}/>;
    }
}
