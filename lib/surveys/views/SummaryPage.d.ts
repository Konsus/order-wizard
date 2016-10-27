/// <reference types="react" />
import * as React from "react";
import { SurveyFlow } from "../../core/survey-flow";
export declare class SummaryPage extends React.Component<SummaryPageProps, SummaryPageState> {
    email: HTMLInputElement;
    constructor(...args: any[]);
    moveNext(): void;
    moveBack(): void;
    componentWillMount(): void;
    render(): JSX.Element | any;
    renderNextButton(): JSX.Element;
    renderAnswers(): JSX.Element | any;
}
export interface SummaryPageProps {
    flow: SurveyFlow;
    isLoggedIn(): Promise<boolean>;
    moveBack(): void;
    moveNext(email: string): void;
}
export interface SummaryPageState {
    loggedIn?: boolean;
}
