/// <reference types="react" />
import * as React from "react";
export declare class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    email: HTMLInputElement;
    password: HTMLInputElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    companyName: HTMLInputElement;
    constructor(...args: any[]);
    register(): void;
    login(): void;
    moveNext(): void;
    init(userState: UserState): void;
    componentDidMount(): void;
    render(): JSX.Element | any;
    renderLoadingPage(): JSX.Element;
    renderSignUpPage(): JSX.Element;
    renderLoginPage(): JSX.Element;
}
export interface LoginPageProps {
    email?: string;
    isLoggedIn(): Promise<boolean>;
    exists(username: string): Promise<boolean>;
    login(form: Survey.AuthForm): Promise<void>;
    register(form: Survey.NewUserForm): Promise<void>;
    moveNext(): any;
}
export interface LoginPageState {
    userState: UserState;
}
export declare enum UserState {
    None = 0,
    New = 1,
    Existing = 2,
    LoggedIn = 3,
}
