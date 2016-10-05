import React from 'react';
import Modal from 'react-modal';
import Wizzard from './Wizzard'

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.75)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background            : 'white',
        padding               : 0,
        borderRadius          : '4px',
    }
};


class Container extends React.Component {

    state = {
        modalIsOpen: false,
        startWizzard: false,
        stepCount: 0
    }

    stepCountPlusOne = () => {
        this.setState({stepCount: this.state.stepCount + 1});
    }

    stepCountMinusOne = () => {
        this.setState({stepCount: this.state.stepCount - 1});
    }

    startWizzard = () => {
        this.setState({startWizzard: true});
        this.stepCountPlusOne();
    }

    stoptWizzard = () => {
        this.setState({startWizzard: false});
        this.setState({stepCount: 0});
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    render() {
        const firstPage = this.renderFirstPage();
        const content = this.state.startWizzard ? <Wizzard stepCountMinusOne={this.stepCountMinusOne} stepCountPlusOne={this.stepCountPlusOne} stepCount={this.state.stepCount} stopWizzard={this.stoptWizzard}/> : firstPage;
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    {content}
                </Modal>
            </div>
        )
    }

    renderFirstPage() {
        return (
            <div className="order-wizzard-cover">
                <div className="order-wizzard-cover__logo">
                    <h2>KONSUS</h2>
                </div>

                <div className="order-wizzard-cover__info">
                    <p>We’re asking you a few questions to understand what we can do for you.</p>
                    <p>We will then come back to you with a quote – and you decide whether we should get started!</p>
                </div>

                <div className="order-wizzard-cover__next">
                    <a href="#" className="b-button" onClick={this.startWizzard}>NEXT</a>
                </div>
            </div>
        )
    }
}

export default Container