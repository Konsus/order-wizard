import * as React from "react";
import {ProjectSurvey} from "./ProjectSurvey";

export abstract class ProjectSurveyRoot<P, S> extends React.Component<P, S> implements React.ChildContextProvider<Survey.Project.Context> {

    public static childContextTypes = ProjectSurvey.contextTypes;

    abstract getChildContext(): Survey.Project.Context;

    render(): JSX.Element|any {
        return this.props.children;
    }
}
