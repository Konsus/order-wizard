import * as React from "react";
import * as Modal from "react-modal";
import {autobind} from "core-decorators";

export abstract class SurveyWindow extends React.Component<SurveyWindowProps, SurveyWindowState> {

    state = {} as SurveyWindowState;

    componentWillMount(): void {
        this.state.visible = this.props.visible;
    }

    @autobind
    open() {
        this.setState(state => {
            state.visible = true;
            return state;
        })
    };

    @autobind
    close() {
        this.setState(state => {
            state.visible = false;
            return state;
        })
    };

    render() {
        return (
            <div>
                <button onClick={this.open}>{this.props.name || "Open Window"}</button>
                <Modal
                    isOpen={this.state.visible}
                    onRequestClose={this.close}
                    style={customStyles}
                >
                    <div className="modal-cross-close" onClick={this.close}></div>
                    {this.props.children}
                </Modal>
            </div>
        )
    }
}

export interface SurveyWindowProps {
    visible?: boolean;
    name?: string;
}

export interface SurveyWindowState {
    visible: boolean;
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },

    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: 0,
        borderRadius: '4px',
        border: 'none',
    }
};

