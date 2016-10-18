import * as React from "react";
import * as Modal from "react-modal";
import {autobind} from "core-decorators";

export abstract class SurveyWindow extends React.Component<SurveyWindowProps, SurveyWindowState> {

    constructor(...args) {
        super(...args);
        this.state = {
            visible: this.props.visible,
            debug: this.props.debug,
        };
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

    render(): JSX.Element | null {
        return (
            <div>
                {this.state.debug ? this.renderDebug() : null}
                <Modal
                    isOpen={this.state.visible}
                    onRequestClose={this.close}
                    style={customStyles}>
                    <div className="modal-cross-close"
                         onClick={this.close}></div>
                    {this.props.children}
                </Modal>
            </div>
        )
    }

    renderDebug(): JSX.Element | null {
        return <button onClick={this.open}>
            {this.props.name || "Open Window"}
        </button>
    }
}

export interface SurveyWindowProps {
    name?: string;
    debug?: boolean;
    visible?: boolean;
}

export interface SurveyWindowState {
    visible?: boolean;
    debug?: boolean;
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

