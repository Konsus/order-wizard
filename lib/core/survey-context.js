"use strict";

const survey_form_1 = require("./survey-form");
class SurveyContext {
    constructor(questionnaire, form) {
        this.questionnaire = questionnaire;
        this.form = form || new survey_form_1.SurveyForm();
    }
}
exports.SurveyContext = SurveyContext;
//# sourceMappingURL=survey-context.js.map