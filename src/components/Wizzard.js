import React from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

class Wizzard extends React.Component {

    render() {
        const stopWizzard = this.props.stopWizzard;
        const stepCountPlusOne = this.props.stepCountPlusOne;
        const stepCountMinusOne = this.props.stepCountMinusOne;

        const stepsSum = 3;
        const stepCount = this.props.stepCount;

        var step;
        switch (stepCount) {
            case 1:
                step = this.renderFisrtStep();
                break;
            case 2:
                step = this.renderSecondStep();
                break;
            case 3:
                step = this.renderThirdStep();
                break;
            default:
                step = null;
                break;
        }

        return (
            <div className="order-wizzard">
                <div className="order-wizzard__progress">
                    <ProgressBar now={(stepCount*100)/stepsSum} />
                </div>

                <div className="order-wizzard__step">
                    {step}
                </div>

                <div className="order-wizzard__controls clearfix">
                    <div className="order-wizzard__back pull-left">
                        <a onClick={(stepCount == 1) ? stopWizzard : stepCountMinusOne} href="#">&lang; Back</a>
                    </div>

                    <div className="order-wizzard__next pull-right">
                        {(stepsSum == stepCount) ? null : <a onClick={stepCountPlusOne} href="#" className="b-button b-button--blue">Next</a>}
                    </div>
                </div>
            </div>
        )
    }

    renderFisrtStep() {
        return (
            <div>
                <div className="order-wizzard__step-title">1. Do you have a template for Data Entry?</div>

                <div className="order-wizzard__step-survey">
                    <div className="order-wizzard__radio">
                        <input id="test-radio-1" name="test-radio" type="radio"/>
                        <label htmlFor="test-radio-1">Yes</label>
                    </div>

                    <div className="order-wizzard__radio">
                        <input id="test-radio-2" name="test-radio" type="radio"/>
                        <label htmlFor="test-radio-2">No</label>
                    </div>
                </div>
            </div>
        )
    }

    renderSecondStep() {
        return (
            <div>
                <div className="order-wizzard__step-title">2. Some question here</div>

                <div className="order-wizzard__step-survey">
                    <div className="order-wizzard__text-comment">
                        <textarea placeholder="Type you comment here" id="formControlsTextarea" className="form-control"></textarea>
                    </div>
                </div>
            </div>
        )
    }

    renderThirdStep() {
        return (
            <div>
                <div className="order-wizzard__step-title">Summary of your task!</div>

                <div className="order-wizzard__step-survey">
                    <div className="order-wizzard__summary">
                        <ul>
                            <li>One</li>
                            <li>Two</li>
                            <li>Three</li>
                        </ul>
                    </div>
                </div>

                {/*<div className="order-wizzard__cta text-center">*/}
                    {/*<a href="#" className="b-button">Start project</a>*/}
                {/*</div>*/}
            </div>
        )
    }

}

export default Wizzard;