/// <reference types="react" />
import * as React from "react";
/** Wraps questions of the survey. */
export declare class SurveyPage extends React.Component<SurveyPageProps, any> {
    title(): string;
    render(): JSX.Element | any;
}
export interface SurveyPageProps {
    id?: React.Key;
    title?: string;
    questions?: Survey.Question[];
}
