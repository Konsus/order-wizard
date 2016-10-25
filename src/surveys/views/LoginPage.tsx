import * as React from "react";
import {autobind} from "core-decorators";

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

    constructor(...args) {
        super(...args);
        this.state = {userState: UserState.None};
    }

    @autobind
    register() {
        const form: Survey.NewUserForm = {
            firstName: "aaa",
            lastName: "bbb",
            user: "aaa@aaa.com",
            pass: "bbb",
        };
        this.props.register(form).then(()=> {
            this.props.moveNext();
        }).catch(e => {
            console.error(e);
        });
    }

    @autobind
    login() {
        const form: Survey.AuthForm = {
            user: "aaa@aaa.com",
            pass: "bbb",
        };
        this.props.login(form).then(() => {
            this.setState(state => {
                state.userState = UserState.LoggedIn;
                this.props.moveNext();
                return state;
            });
        }).catch(e => {
            console.error(e);
        });
    }

    @autobind
    moveNext() {
        this.props.moveNext();
    }

    init(userState: UserState) {
        this.setState(state => {
            state.userState = userState;
            return state;
        })
    }

    componentWillMount(): void {
        // initialize state
        this.props.isLoggedIn().then(loggedIn => {
            if (loggedIn)
                return this.init(UserState.LoggedIn);

            // new user if username is empty
            const username = this.props.username;
            if (username == null || username == "")
                return this.init(UserState.New);

            // check whether user is new
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
                return null; // TODO: show loading process
            case UserState.New:
                return this.renderSignUpPage();
            case UserState.Existing:
                return this.renderLoginPage();
            case UserState.LoggedIn:
                this.moveNext();
                return null;
        }
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
                                <input type="text" className="form-control" placeholder="First name*"/>
                            </div>
                            <div className="col-md-6 col-xs-6">
                                <input type="text" className="form-control" placeholder="Last name*"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Company name"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1"
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
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit"
                            className="btn btn-primary btn-block"
                            onClick={this.login}> Log in
                    </button>
                </div>
            </div>
        </div>
    }
}

export interface LoginPageProps {
    username?: string;
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
