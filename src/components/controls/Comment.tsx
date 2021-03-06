import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class Comment extends SelectionControl<CommentProps, Survey.View.Value<string>> {

    private readonly style;

    constructor(...args) {
        super(...args);
        this.style = {};
        if (this.props.resize != null)
            this.style.resize = this.props.resize;
    }

    @autobind
    onChange(event: React.FormEvent<React.HTMLProps<HTMLTextAreaElement>>) {
        event.persist();
        this.setState(state => {
            const input = event.target as React.HTMLProps<HTMLTextAreaElement>;
            state.value = input.value.toString();
            this.onValueChange(state);
            return state;
        });
    }

    renderActiveView(): JSX.Element|any {
        const token = this.token;
        const value = this.state.value;
        const label = this.props.label;
        return <div className="order-wizzard__text-comment"
                    key={this.props.id || token}>
            <label>{label}</label>
            <textarea className="form-control" style={this.style}
                      name={token}
                      value={value}
                      placeholder={this.props.placeholder}
                      rows={this.props.rows}
                      onChange={this.onChange}/>
        </div>
    }
}

export interface CommentProps extends Survey.View.SelectionProps<string> {
    rows?: number;
    resize?: "none" | "horizontal" | "vertical" | "both";
}
