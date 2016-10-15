import * as React from "react";
import {autobind} from "core-decorators";
import {SelectionControl} from "./SelectionControl";

export class File extends SelectionControl<FileProps, Survey.View.Value<string>> {

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
        let basefilename = this.state.value;
        return (
            <div className="order-wizzard__file-uploading">
                { this.state.value ?
                    <div className="order-wizzard__file-name">{basefilename.replace(/^.*\\/, "")}</div> :
                    null }
                <label>{this.props.label}</label>

                <div className="fileUpload b-button b-button--ghost">
                    <span>Upload</span>
                    <input type="file" name={this.props.token} onChange={this.onChange} className="upload"/>
                </div>
            </div>
        )
    }
}

export interface FileProps extends Survey.View.SelectionProps<string> {

}
