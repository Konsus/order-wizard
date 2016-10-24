import * as React from "react";
import {ProjectSurvey} from "./ProjectSurvey";

export class ProjectSurveyRoot<P, S> extends React.Component<P, S> implements React.ChildContextProvider<Survey.Project.Context> {

    public static childContextTypes = ProjectSurvey.contextTypes;
    public readonly projectContext: Survey.Project.Context;

    constructor(projectContext: Survey.Project.Context, ...args) {
        super(...args);
        this.projectContext = projectContext;
    }

    getChildContext(): Survey.Project.Context {
        return this.projectContext;
    }

    render(): JSX.Element|any {
        return this.props.children;
    }
}
