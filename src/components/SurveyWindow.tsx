import * as React from "react";
import * as Modal from "react-modal";

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
    }
};

export abstract class SurveyWindow extends React.Component<any,any> {

    state = {
        open: false,
    };

    open() { this.setState({open: true}); };

    close() { this.setState({open: false}); };

    render() {
        return (
            <div>
                <button onClick={() => this.open()}>Open Modal</button>
                <Modal
                    isOpen={this.state.open}
                    onRequestClose={() => this.close()}
                    style={customStyles}
                >
                    {this.props.children}
                </Modal>
            </div>
        )
    }
}

