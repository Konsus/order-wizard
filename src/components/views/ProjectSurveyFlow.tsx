import * as React from "react";
import {SurveyFlow} from "../../core/survey-flow";
import {SurveyForm} from "../../core/survey-form";
import {ProjectSurvey} from "./ProjectSurvey";

/** Basic template for quick setup of project survey. */
export abstract class ProjectSurveyFlow<F extends Survey.SurveyForm> extends React.Component<any, any> {

    /** Form that contains answers. */
    public readonly form: F;

    /** Flow of the survey. */
    public readonly flow: SurveyFlow;

    constructor(survey: Survey.Questionnaire) {
        super();
        this.form = new SurveyForm() as F;
        this.flow = new SurveyFlow(survey);
        this.initFlow(this.flow);
    }

    /**
     * Initialize render of survey pages.
     * @param flow defines flow of the survey.
     */
    protected abstract initFlow(flow: SurveyFlow);

    render(): JSX.Element|any {
        return (
            <ProjectSurvey flow={this.flow}
                           form={this.form}/>
        )
    }
}
