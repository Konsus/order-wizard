import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class File extends SelectionControl<FileProps, Survey.View.Value<string>, string> {

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
            <div className="order-wizzard__file-uploading">
                <label>{this.props.label}</label>
                <input type="file"
                       name={this.props.token}
                       onChange={this.onChange}/>
            </div>
        )
    }
}

export interface FileProps extends Survey.View.InputProps<string> { }
