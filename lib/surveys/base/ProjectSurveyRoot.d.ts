/// <reference types="react" />
import * as React from "react";
export declare abstract class ProjectSurveyRoot<P, S> extends React.Component<P, S> implements React.ChildContextProvider<Survey.Project.Context> {
    static childContextTypes: {
        [x: string]: React.Validator<any>;
    };
    abstract getChildContext(): Survey.Project.Context;
    render(): JSX.Element | any;
}
