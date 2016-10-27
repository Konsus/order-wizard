import * as React from "react";
import {ProjectSurveyRoot} from "../surveys/base/ProjectSurveyRoot";
import {autobind} from "core-decorators";
const ulrQuery = require('url-query');
const dummyToken = require('braintree-react/example/dummy-client-token');

export class MockProjectRoot extends ProjectSurveyRoot<any, any> implements Survey.Project.Context {

    private childContext: Survey.Project.Context;

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    @autobind
    isLoggedIn(): Promise<boolean> {
        console.log("isLoggedIn", this.state.loggedIn);
        return Promise.resolve(this.state.loggedIn);
    }

    @autobind
    exists(username: string): Promise<boolean> {
        console.log("exists", username, !this.state.newUser);
        return Promise.resolve(!this.state.newUser);
    }

    @autobind
    login(form: Survey.AuthForm): Promise<void> {
        console.log("login", form);
        return new Promise<void>(resolve => {
            this.setState(state => {
                state.loggedIn = true;
                resolve();
                return state;
            })
        })
    }

    @autobind
    register(form: Survey.NewUserForm): Promise<void> {
        console.log("register", form);
        return Promise.resolve();
    }

    @autobind
    hasPaymentMethod(): Promise<boolean> {
        console.log("hasPaymentMethod", this.state.creditCard);
        return Promise.resolve(this.state.creditCard);
    }

    @autobind
    paymentToken(): Promise<string> {
        console.log("paymentToken", dummyToken);
        return Promise.resolve(dummyToken);
    }

    getChildContext(): Survey.Project.Context {
        if (this.childContext == null)
            this.childContext = {
                isLoggedIn: this.isLoggedIn,
                exists: this.exists,
                login: this.login,
                register: this.register,
                hasPaymentMethod: this.hasPaymentMethod,
                paymentToken: this.paymentToken,
            };
        return this.childContext;
    }

    componentWillMount(): void {
        this.setState(state => {

            try {
                var query = ulrQuery();
                state.loggedIn = Boolean(query['logged_in']);
                state.newUser = Boolean(query['new_user']);
                state.creditCard = Boolean(query['credit_card']);
            }
            catch (e) {

            }
            return state;
        })
    }

    handleCheckBox(name: string, event: any) {
        console.log("CHANGE: " + event);
        event.persist();
        this.setState(state => {
            state[name] = event.target && event.target.checked;
            return state;
        })
    }

    render(): JSX.Element|any {
        return <div>
            <div style={{margin :2}}>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   checked={this.state.loggedIn}
                                   onChange={e => this.handleCheckBox("loggedIn", e)}/>
                        Logged In</label>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   checked={this.state.newUser}
                                   onChange={e => this.handleCheckBox("newUser", e)}/>
                        New User</label>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   checked={this.state.creditCard}
                                   onChange={e => this.handleCheckBox("creditCard", e)}/>
                        Has Credit Card</label>
                </div>
            </div>
            {super.render()}
        </div>
    }
}
