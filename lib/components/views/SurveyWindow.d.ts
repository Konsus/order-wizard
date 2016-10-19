/// <reference types="react" />
import * as React from "react";
export declare abstract class SurveyWindow extends React.Component<SurveyWindowProps, SurveyWindowState> {
    constructor(...args: any[]);
    open(): void;
    close(): void;
    render(): JSX.Element | null;
    renderDebug(): JSX.Element | null;
}
export interface SurveyWindowProps {
    name?: string;
    debug?: boolean;
    visible?: boolean;
}
export interface SurveyWindowState {
    visible?: boolean;
    debug?: boolean;
}
