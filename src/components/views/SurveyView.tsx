import * as React from "react";
import {ProgressBar} from "react-bootstrap";

/**
 * Base type for any type of survey.
 */
export abstract class SurveyView<P, S extends SurveyPageState> extends React.Component<P, S> {

    constructor(...args: any[]) {
        super(...args);
        this.state = {} as S;
        this.state.isPageDone = true;
    }

    /** Get normalized value of the survey progress [0-1]. */
    progress(): number {
        return this.state.step / this.state.activeSteps;
    }

    /** Whether survey is complete and ready for submission. */
    isComplete(): boolean {
        return !this.canMoveNext();
    }

    /** Whether has any next survey step. */
    canMoveNext(): boolean {
        return this.state.step < this.countActiveSteps();
    }

    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    moveNext(): boolean {
        if (this.state.step >= this.countActiveSteps())
            return false;

        this.setState(state => {
            state.activeSteps = this.countActiveSteps();
            state.step++;
            return state;
        });

        return true;
    }

    /**
     * Try move to previous survey step if possible.
     * @returns {boolean} true on success; otherwise false.
     */
    moveBack(): boolean {
        if (this.state.step <= 1)
            return false;

        this.setState(state => {
            state.step--;
            return state;
        });

        return true;
    }

    /** Reset survey to first step. */
    resetSurvey(state: S): void {
        state.step = 1;
        state.activeSteps = this.countActiveSteps();
    }

    /** Render survey with questions. */
    protected abstract renderQuestionPage(): JSX.Element | null;

    /** Calculate total number of active steps. */
    protected abstract countActiveSteps(): number;

    componentWillMount(): void {
        this.resetSurvey(this.state);
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
                    {this.renderQuestionPage()}
                </div>

                <div className="order-wizzard__controls clearfix">
                    <div className="order-wizzard__back pull-left">
                        <a onClick={() => this.moveBack()} href="#">&lang; Back</a>
                    </div>

                    <div className="order-wizzard__next pull-right">
                        {this.renderMoveNext()}
                    </div>
                </div>
            </div>
        )
    }

    renderMoveNext() {
        if (!this.canMoveNext())
            return null;

        if (this.state.isPageDone)
            return <a onClick={() => this.moveNext()} href="#" className="b-button b-button--blue">Next</a>;

        return <a href="#" className="b-button b-button--blue b-button--deactive">Next</a>;
    }
}

export interface SurveyPageState {
    /** Current survey step. */
    step: number;
    /** Total count of visible steps. */
    activeSteps: number;
    /** Whether question on page are complete. */
    isPageDone: boolean;
}
