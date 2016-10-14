import * as React from "react";
import {SurveyFlow} from "../../core/survey-flow";
import {SurveyForm} from "../../core/survey-form";
import {ProjectSurvey} from "./ProjectSurvey";
import {SurveyContext} from "../../core/survey-context";

/** Basic template for quick setup of project survey. */
export abstract class ProjectSurveyFlow<F extends Survey.SurveyForm> extends React.Component<any, any> {

    /** Form that contains answers. */
    public readonly form: F & Survey.SurveyForm;

    /** Flow of the survey. */
    public readonly flow: SurveyFlow;

    constructor(questionnaire: Survey.Questionnaire) {
        super();
        this.form = new SurveyForm() as any as F;
        const context = new SurveyContext(questionnaire, this.form);
        this.flow = new SurveyFlow(context);
        if (this.initFlow) this.initFlow(this.flow);
    }

    /**
     * Initialize render of survey pages.
     * @param flow defines flow of the survey.
     */
    protected abstract initFlow(flow: SurveyFlow);

    render(): JSX.Element|any {
        return <ProjectSurvey flow={this.flow}/>
    }
}
