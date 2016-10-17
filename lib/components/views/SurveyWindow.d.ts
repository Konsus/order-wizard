/// <reference types="react" />
import * as React from "react";
export declare abstract class SurveyWindow extends React.Component<SurveyWindowProps, SurveyWindowState> {
    state: SurveyWindowState;
    componentWillMount(): void;
    open(): void;
    close(): void;
    render(): JSX.Element;
}
export interface SurveyWindowProps {
    visible?: boolean;
    name?: string;
}
export interface SurveyWindowState {
    visible: boolean;
}
