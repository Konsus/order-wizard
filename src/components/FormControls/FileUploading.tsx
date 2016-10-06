import * as React from "react";

export class FileUploading extends React.Component<any, any> {

    render() {
        const fileLabel = this.props.fileLabel;
        return (
            <div className="order-wizzard__file-uploading">
                <label>{fileLabel}</label>
                <input type="file"/>
            </div>
        )
    }
}

