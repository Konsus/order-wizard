import * as React from "react";
import {autobind} from "core-decorators";
import {SurveyFlow} from "../../core/survey-flow";
var validator = require("email-validator");
export class SummaryPage extends React.Component<SummaryPageProps, SummaryPageState> {

    email: HTMLInputElement;

    constructor(...args) {
        super(...args);
        this.state = {validEmail: false};
    }

    @autobind
    moveNext(e) {
        if(e) e.preventDefault();
        if(!this.state.loggedIn && !this.validEmail()) return;
        const email = this.state.loggedIn ? null : this.email.value;
        this.props.moveNext(email);
    }

    @autobind
    validEmail(){
        var validEmail = this.email && this.email.value && validator.validate(this.email.value);
        this.setState({validEmail:  validEmail});
        return validEmail;
    }

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
                <div className="order-wizzard__next">
                    {this.renderNextButton()}
                </div>
            </div>
        </div>
    }

    renderNextButton() {
        const loggedIn = this.state.loggedIn;
        const label = loggedIn ? "Submit" : "Next";
        return <div className="order-wizzard__cta text-center">
            <div className="row">
                {loggedIn ? <a href="#" className="b-button b-button--blue" onClick={this.moveNext}>{label}</a> :
                    <div>
                        <div className="form-inline order-wizzard__email-sender">
                            <div className="form-group">
                                <input type="text" className="form-control" ref={x => this.email = x} onKeyDown={()=>{this.validEmail()}} placeholder="Enter your email"/>
                            </div>
                            <div className="form-group">
                                <a href="#" className="btn btn-primary" style={(!this.state.validEmail?{opacity: 0.7}:{})} onClick={this.moveNext}>{label}</a>
                            </div>
                        </div>
                        <br/>
                        <p className="text-primary text-center">Strictly confidential, no commitments</p>
                    </div>
                }
            </div>
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
    moveNext(email: string): void;
}

export interface SummaryPageState {
    validEmail?: boolean;
    loggedIn?: boolean;
}
