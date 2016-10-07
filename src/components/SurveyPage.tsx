import * as React from "react";
import {ProgressBar} from "react-bootstrap";

/**
 * Base type for any type of survey.
 */
export abstract class SurveyPage<P extends SurveyProps, S extends SurveyState> extends React.Component<P, S> {

    state: S = {} as S;

    /** Get normalized value of the survey progress [0-1]. */
    public progress(): number {
        return this.state.step / this.state.activeSteps;
    }

    /** Whether survey is complete and ready for submission. */
    public isComplete(): boolean {
        return !this.canMoveNext();
    }

    /** Whether has any next survey step. */
    public canMoveNext(): boolean {
        return this.state.step < this.countActiveSteps();
    }

    componentDidMount() {
        console.log('----', this.state);
    }

    public isQuestionDone(): boolean {
        return true;
    }

    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    public moveNext(): boolean {
        if (this.state.step >= this.countActiveSteps())
            return false;

        this.setState(state => {
            state.activeSteps = this.countActiveSteps();
            state.step = this.resolveNextStep();
            return state;
        });

        return true;
    }

    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    public moveBack(): boolean {
        if (this.state.step <= 1)
            return false;

        this.setState(state => {
            state.step--;
            return state;
        });

        return true;
    }

    /** Reset survey to first step. */
    public resetSurvey(): void {
        this.setState(state => {
            state.step = 1;
            state.activeSteps = this.countActiveSteps();
            return state;
        });
    }

    /** Render survey with questions. */
    protected abstract renderSurvey(): JSX.Element | null;

    /** Resolve next step to render. */
    protected abstract resolveNextStep(): number;

    /** Calculate total number of active steps. */
    protected abstract countActiveSteps(): number;

    componentWillMount(): void {
        this.resetSurvey();
    }

    render(): JSX.Element | null {

        if (this.state.step === 0)
            return null;

        return (
            <div className="order-wizzard">
                <div className="order-wizzard__progress">
                    <ProgressBar now={this.progress() * 100}/>
                </div>

                <div className="order-wizzard__step">
                    {this.renderSurvey()}
                </div>

                <div className="order-wizzard__controls clearfix">
                    <div className="order-wizzard__back pull-left">
                        <a onClick={() => this.moveBack()} href="#">&lang; Back</a>
                    </div>

                    <div className="order-wizzard__next pull-right">
                        {this.canMoveNext()
                            ?
                            this.isQuestionDone()
                                ?
                                <a href="#" className="b-button b-button--blue b-button--deactive">Next</a>
                                :
                                <a onClick={() => this.moveNext()} href="#" className="b-button b-button--blue">Next</a>
                            : null }
                    </div>
                </div>
            </div>
        )
    }
}

export interface SurveyProps {
    onExit?: Function;
}

export interface SurveyState {
    /** Current survey step. */
    step: number;
    /** Total count of visible steps. */
    activeSteps: number;
}
