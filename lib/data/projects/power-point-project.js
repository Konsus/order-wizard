"use strict";
const common_1 = require("../common");
exports.ServiceQuestion = {
    token: nameof(null.service),
    title: "What sort of PowerPoint service are you interested in?",
    options: [
        { value: "style-format", label: "Professional formatting of existing presentation" },
        { value: "style-enhance", label: "Creative visual enhancement of existing presentation" },
        { value: "new-presentation", label: "New slide deck from scratch" },
        { value: "update-template", label: "Update Company Template" },
        { value: "new-template", label: "New Company Template" },
    ]
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.TemplateQuestion = {
    token: nameof(null.template),
    title: "Do you have an existing template we should use?",
    options: [
        { value: "yes", label: "Yes." },
        { value: "no", label: "No, but please include that as part of delivery." },
        {
            value: "embedded", label: "Use the template the presentation is currently in.",
            active: (form) => form.service != "new-presentation"
        }
    ]
};
exports.TemplatePage = {
    questions: [exports.TemplateQuestion],
    active: (form) => {
        switch (form.service) {
            case "update-template":
            case "new-template":
                return false;
        }
        return true;
    },
};
exports.StyleQuestion = {
    token: nameof(null.style),
    title: "Directionally, what kind of style do you like?",
    options: [
        { value: "serious", label: "Serious" },
        { value: "playful", label: "Playful" },
        { value: "inspirational", label: "Inspirational" },
        { value: "dramatic", label: "Dramatic" },
    ]
};
exports.StylePage = {
    questions: [exports.StyleQuestion],
    active: (form) => {
        switch (form.template) {
            case "yes":
            case "embedded":
                return false;
        }
        return true;
    },
};
exports.FilesPage = {
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    questions: [
        { title: "The draft presentation or the basis for the structure and main content of your deck" },
        { title: "Other company material or website we should make it consistent with or use as inspiration" },
        { title: "Pictures, logos and artwork that we should include in the presentation (high quality)" },
        { title: "Other graphics that you would like us to find or tailor make for you" },
    ]
};
exports.PurposeQuestion = {
    token: nameof(null.purpose),
    title: "What will be the use of your presentation, and who will be the audience?",
    options: [
        {
            value: "graphics",
            label: "Mostly graphics combined with large size bullet points (for presenting to large audiences)"
        },
        { value: "tables", label: "Normal size text, tables, charts and some details (for reading and reports)" },
        { value: "both", label: "Combination of both" },
    ]
};
exports.PurposePage = {
    questions: [exports.PurposeQuestion],
};
class PowerPointProjectSurvey {
    constructor() {
        this.service = exports.ServicePage;
        this.template = exports.TemplatePage;
        this.style = exports.StylePage;
        this.files = exports.FilesPage;
        this.purpose = exports.PurposePage;
        this.deadline = common_1.DueDatePage;
        this.comments = common_1.CommentsPage;
        this.survey = {
            defaultRequired: true,
            pages: [
                this.service,
                this.template,
                //this.style,
                //this.files,
                this.purpose,
                this.deadline,
                this.comments,
            ]
        };
    }
}
exports.PowerPointProjectSurvey = PowerPointProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new PowerPointProjectSurvey();
//# sourceMappingURL=power-point-project.js.map