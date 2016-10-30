"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var common_1 = require("../common");
exports.ServiceQuestion = {
    token: "service",
    title: "What sort of PowerPoint service are you interested in?",
    options: [{ value: "style-format", label: "Professional formatting of existing presentation" }, { value: "style-enhance", label: "Creative visual enhancement of existing presentation" }, { value: "new-presentation", label: "New slide deck from scratch" }, { value: "update-template", label: "Update Company Template" }, { value: "new-template", label: "New Company Template" }]
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.TemplateQuestion = {
    token: "template",
    title: "Do you have an existing template we should use?",
    options: [{ value: "yes", label: "Yes, I do" }, { value: "no", label: "No, but please include that as part of delivery" }, {
        value: "embedded", label: "Use the current template of the presentation",
        active: function active(form) {
            return form.service != "new-presentation";
        }
    }]
};
exports.TemplatePage = {
    questions: [exports.TemplateQuestion],
    active: function active(form) {
        switch (form.service) {
            case "update-template":
            case "new-template":
                return false;
        }
        return true;
    }
};
exports.StyleQuestion = {
    token: "style",
    title: "Directionally, what kind of style do you like?",
    options: [{ value: "serious", label: "Serious" }, { value: "playful", label: "Playful" }, { value: "inspirational", label: "Inspirational" }, { value: "dramatic", label: "Dramatic" }]
};
exports.StylePage = {
    questions: [exports.StyleQuestion],
    active: function active(form) {
        switch (form.template) {
            case "yes":
            case "embedded":
                return false;
        }
        return true;
    }
};
exports.FilesPage = {
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    questions: [{ title: "The draft presentation or the basis for the structure and main content of your deck" }, { title: "Other company material or website we should make it consistent with or use as inspiration" }, { title: "Pictures, logos and artwork that we should include in the presentation (high quality)" }, { title: "Other graphics that you would like us to find or tailor make for you" }]
};
exports.PurposeQuestion = {
    token: "purpose",
    title: "What will be the use of your presentation?",
    options: [{
        value: "graphics",
        label: "Presenting to an audience (large fonts and graphics)"
    }, { value: "tables", label: "Reports and reading (more text and details)" }, { value: "both", label: "Combination of both" }]
};
exports.PurposePage = {
    questions: [exports.PurposeQuestion]
};

var PowerPointProjectSurvey = function PowerPointProjectSurvey() {
    _classCallCheck(this, PowerPointProjectSurvey);

    this.service = exports.ServicePage;
    this.template = exports.TemplatePage;
    this.style = exports.StylePage;
    this.files = exports.FilesPage;
    this.purpose = exports.PurposePage;
    this.deadline = common_1.DueDatePage;
    this.comments = common_1.CommentsPage;
    this.survey = {
        defaultRequired: true,
        pages: [this.service, this.template,
        //this.style,
        //this.files,
        this.purpose, this.deadline, this.comments]
    };
};

exports.PowerPointProjectSurvey = PowerPointProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new PowerPointProjectSurvey();
//# sourceMappingURL=power-point-project.js.map
