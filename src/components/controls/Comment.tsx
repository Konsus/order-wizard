import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class Comment extends SelectionControl<CommentProps, Survey.View.Value<string>> {

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
            <textarea className="form-control"
                      name={token}
                      value={value}
                      placeholder={this.props.placeholder}
                      onChange={this.onChange}/>
        </div>
    }
}

export interface CommentProps extends Survey.View.SelectionProps<string> {

}
