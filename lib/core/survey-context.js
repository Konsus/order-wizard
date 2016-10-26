"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var survey_form_1 = require("./survey-form");

var SurveyContext = function SurveyContext(questionnaire, form) {
    _classCallCheck(this, SurveyContext);

    this.questionnaire = questionnaire;
    this.form = form || new survey_form_1.SurveyForm();
};

exports.SurveyContext = SurveyContext;
//# sourceMappingURL=survey-context.js.map