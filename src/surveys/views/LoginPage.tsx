import * as React from "react";
import {autobind} from "core-decorators";

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

    email: HTMLInputElement;
    password: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    companyName: HTMLInputElement;

    constructor(...args) {
        super(...args);
        this.state = {userState: UserState.None};
    }

    @autobind
    register() {
        const form: Survey.NewUserForm = {
            username: this.props.email,
            password: this.password.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
        };
        this.props.register(form).then(()=> {
            this.moveNext();
        }).catch(e => {
            console.error(e);
        });
    }

    @autobind
    login() {
        const form: Survey.AuthForm = {
            username: this.email.value,
            password: this.password.value,
        };
        this.props.login(form).then(() => {
            this.moveNext();
        }).catch(e => {
            console.error(e);
        });
    }

    @autobind
    moveNext() {
        this.props.moveNext();
    }

    init(userState: UserState) {
        // move next page if logged in
        if (userState == UserState.LoggedIn) {
            this.moveNext();
            return;
        }

        this.setState(state => {
            state.userState = userState;
            return state;
        })
    }

    componentDidMount(): void {
        // initialize state
        this.props.isLoggedIn().then(loggedIn => {
            // move next page if logged in
            if (loggedIn) {
                this.init(UserState.LoggedIn);
                return;
            }
            // check whether user is new
            const username = this.props.email;
            return this.props.exists(username).then(exists => {
                this.init(exists ? UserState.Existing : UserState.New);
            });
        }).catch(e => {
            console.error(e);
            this.init(UserState.Existing);
        });
    }

    render(): JSX.Element|any {
        switch (this.state.userState) {
            case UserState.None:
                return this.renderLoadingPage();
            case UserState.New:
                return this.renderSignUpPage();
            case UserState.Existing:
                return this.renderLoginPage();
        }
    }

    renderLoadingPage() {
        // TODO: show loading process
        return <div className="order-wizzard order-wizzard--login">
        </div>
    }

    renderSignUpPage() {
        return <div className="order-wizzard order-wizzard--login">
            <div className="order-wizzard__header">
                <div className="order-wizzard__title">SUCCESS!</div>
                <div className="order-wizzard__sub-title">Your quote will be with you shortly</div>
            </div>

            <div className="order-wizzard__login">
                <header>
                    Meanwhile, can you please complete your profile so we are <br/>
                    ready to go if you approve the quote:
                </header>

                <div className="order-wizzard__login-form order-wizzard__login-form__next-step">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-xs-6">
                                <input type="text" className="form-control"
                                       ref={x => this.firstName = x}
                                       placeholder="First name*"/>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <input type="text" className="form-control"
                                       ref={x => this.lastName = x}
                                       placeholder="Last name*"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control"
                               ref={x => this.companyName = x}
                               placeholder="Company name"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"
                               ref={x => this.password = x}
                               placeholder="Set a password*"/>
                    </div>
                    <button type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.register}>
                        Submit
                    </button>
                    <p>*Required</p></div>
            </div>
        </div>
    }

    renderLoginPage() {
        return <div className="order-wizzard order-wizzard--login">
            <div className="order-wizzard__header">
                <div className="order-wizzard__title">Thank you!</div>
                <div className="order-wizzard__sub-title">Please sign in and your quote will be with you shortly</div>
            </div>

            <div className="order-wizzard__login">
                <div className="order-wizzard__login-form">
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <input type="email" className="form-control"
                                   ref={x => this.email = x}
                                   placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control"
                                   ref={x => this.password = x}
                                   placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit"
                                className="btn btn-primary btn-block"
                                onClick={this.login}> Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}

export interface LoginPageProps {
    email?: string;
    isLoggedIn(): Promise<boolean>;
    exists(username: string): Promise<boolean>;
    login(form: Survey.AuthForm): Promise<void>;
    register(form: Survey.NewUserForm): Promise<void>;
    moveNext();
}

export interface LoginPageState {
    userState: UserState;
}

export enum UserState {
    None,
    New,
    Existing,
    LoggedIn,
}
