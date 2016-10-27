import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../../core/survey-flow";
export class SummaryPage extends React.Component<SummaryPageProps, SummaryPageState> {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    @autobind
    moveNext() { this.props.moveNext(); }

    @autobind
    moveBack() { return this.props.moveBack(); }

    componentWillMount(): void {
        this.props.isLoggedIn().then(loggedIn => {
            this.setState({loggedIn: loggedIn});
        })
    }

    render(): JSX.Element|any {
        return <div className="order-wizzard">
            <div className="order-wizzard__step-title">Summary of your task!</div>
            <div className="order-wizzard__step-survey">
                <div className="order-wizzard__summary">
                    <ul className="order-wizzard__summary-list">
                        {this.renderAnswers()}
                    </ul>
                </div>
            </div>
            <div className="order-wizzard__controls clearfix">
                <div className="order-wizzard__back pull-left">
                    <a onClick={this.moveBack} href="#" className="b-button b-button--transparent">
                        <span className="b-button__icon-arrow"/> Back</a>
                </div>
                <div className="order-wizzard__next pull-right">
                    {this.renderNextButton()}
                </div>
            </div>
        </div>
    }

    renderNextButton() {
        const loggedIn = this.state.loggedIn;
        const label = loggedIn ? "Submit" : "Next";
        return <div className="order-wizzard__cta text-center">
            <a href="#" className="b-button b-button--blue"
               onClick={this.moveNext}>{label}</a>
        </div>
    }

    renderAnswers(): JSX.Element|any {
        const flow = this.props.flow;
        const qa = flow.joinQA();
        return qa.map((item) => {
            let label = item.answer.label;
            if (label == null) return null;
            return <li key={item.answer.token}>{label}</li>
        });
    }
}

export interface SummaryPageProps {
    flow: SurveyFlow;
    isLoggedIn(): Promise<boolean>;
    moveBack(): void;
    moveNext(): void;
}

export interface SummaryPageState {
    loggedIn?: boolean;
}