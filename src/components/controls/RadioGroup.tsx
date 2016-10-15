import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class RadioBox extends React.Component<RadioBoxProps, void> {
    private radio: HTMLInputElement;

    @autobind
    onClick(e: React.MouseEvent<any>) {
        if (e.target != this.radio)
            this.radio.click();
    }

    @autobind
    onChange() {
        this.props.valueRef(this.radio.value);
    }

    render() {
        const value = this.props.value;
        const label = this.props.label;
        const checked = this.props.checked(value);
        return (
            <div key={this.props.id || value}
                 className="order-wizzard__list-item order-wizzard__radio"
                 onClick={this.onClick}>
                <input type="radio"
                       ref={x => this.radio = x}
                       value={value}
                       label={label}
                       checked={checked}
                       onChange={this.onChange}
                />
                <label><span>{label || value}</span></label>
            </div>
        )
    }
}

export class RadioBoxOther extends React.Component<RadioBoxProps, RadioBoxOtherState> {
    private radio: HTMLInputElement;
    private text: HTMLInputElement;

    constructor(...args) {
        super(...args);
    }

    checked(): boolean {
        if (this.text && this.text.value != "")
            return this.props.checked(this.text.value);

        if (this.props.value != null)
            return this.props.checked(this.props.value);

        return this.props.checked("other");
    }

    @autobind
    onClick(e: React.MouseEvent<any>) {
        if (e.target == this.text) return;
        if (e.target == this.radio) return;
        this.onChange();
    }

    @autobind
    onSelect() {
        this.onChange();
        this.forceUpdate();
    }

    @autobind
    onChange() {
        let value;
        if (this.text) value = this.text.value;
        if (value == null) value = this.props.value;
        if (value == null) value = "other";
        this.props.valueRef(value);
    }

    render() {
        const label = this.props.label;
        const checked = this.checked();
        return (
            <div key={this.props.id || "other"}
                 className="order-wizzard__list-item order-wizzard__radio"
                 onClick={this.onClick}>
                <input type="radio"
                       ref={x => this.radio = x}
                       label={label}
                       checked={checked}
                       onChange={this.onSelect}
                />
                <label><span>{label || "Other"}</span></label>
                { checked
                    ? <input type="text"
                             ref={x => this.text = x}
                             value={this.props.value}
                             label={label}
                             checked={checked}
                             onChange={this.onChange}/>
                    : null
                }
            </div>
        )
    }
}

export class RadioGroup extends SelectionControl<Survey.View.SelectionProps<any>, any> implements Survey.View.Group {

    @autobind
    checked(value: any): boolean {
        return this.state.value == value;
    }

    @autobind
    onChange(value: any) {
        this.setState(state => {
            state.value = value;
            this.onValueChange(state);
            return state;
        });
    }

    renderActiveView(): JSX.Element|any {
        const token = this.token;
        const other = this.props.other;
        return <div key={this.props.id || token}
                    name={token}
                    className="order-wizzard__radio-group">
            {this.renderOptions(this.props.options)}
            {other
                ? <RadioBoxOther {...other} key={`${this.token}.other`}
                                            valueRef={this.onChange}
                                            checked={this.checked}/>
                : null}
        </div>
    }

    renderOption(option: Survey.Option, index: number, active: boolean): JSX.Element|any {
        return <RadioBox {...option} key={`${this.token}.${option.value}`}
                                     valueRef={this.onChange}
                                     checked={this.checked}/>;
    }
}

export interface RadioBoxProps extends Survey.View.Element<any> {
    valueRef?: Survey.Ref<any>;
    checked: (value: any) => boolean;
    label?: string;
    defaultChecked?: boolean;
}

export interface RadioBoxOtherState extends Survey.View.Value<any> {

}
