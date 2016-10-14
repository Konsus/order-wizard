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

    render() {
        return (
            <div className="order-wizzard__text-comment">
                        <textarea className="form-control"
                                  name={this.props.token}
                                  placeholder={this.props.placeholder}
                                  onChange={this.onChange}
                        />
            </div>
        )
    }
}

export interface CommentProps extends Survey.View.InputProps<string> {
    placeholder?: string;
}
