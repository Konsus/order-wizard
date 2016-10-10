import {SurveyForm} from "./survey-form";
export class SurveyContext implements Survey.Context {

    public form: Survey.SurveyForm;
    public questionnaire: Survey.Questionnaire;

    constructor(questionnaire: Survey.Questionnaire, form: Survey.SurveyForm) {
        this.questionnaire = questionnaire;
        this.form = form || new SurveyForm();
    }
}

