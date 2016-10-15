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
        const checked = this.props.group.checked(this.props.value);
        return <div key={this.props.id || this.props.value}
                    className="order-wizzard__list-item order-wizzard__checkbox"
                    onClick={this.onClick}>
            <input type="checkbox"
                   ref={x => this.input = x}
                   value={this.props.value}
                   label={this.props.label}
                   checked={checked}
                   onChange={() => {}}
            />
            <label><span>{this.props.label || this.props.value}</span></label>
        </div>

    }
}

export class CheckGroup extends SelectionControl<Survey.View.SelectionProps<any[]>, Survey.View.Value<any[]>> implements Survey.View.Group {

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

    protected initialValue(): any {
        return super.initialValue() || [];
    }

    renderActiveView(): JSX.Element|any {
        return <div key={this.props.id || this.token}
                    className="order-wizzard__checkbox-group"
                    onChange={this.onChange}>
            {this.renderOptions(this.props.options)}
        </div>

    }

    renderOption(option: Survey.Option, index: number, active: boolean): JSX.Element|any {
        return <CheckBox {...option} key={`${this.token}.${option.value}`}
                                     group={this}/>;
    }
}

