/// <reference types="react" />
import { ProjectSurveyRoot } from "../surveys/base/ProjectSurveyRoot";
export declare class MockProjectRoot extends ProjectSurveyRoot<any, any> implements Survey.Project.Context {
    private childContext;
    constructor(...args: any[]);
    isLoggedIn(): Promise<boolean>;
    exists(username: string): Promise<boolean>;
    login(form: Survey.AuthForm): Promise<void>;
    register(form: Survey.NewUserForm): Promise<void>;
    hasPaymentMethod(): Promise<boolean>;
    addPaymentMethod(nonce: string): Promise<void>;
    paymentToken(): Promise<string>;
    getChildContext(): Survey.Project.Context;
    componentWillMount(): void;
    handleCheckBox(name: string, event: any): void;
    render(): JSX.Element | any;
}
