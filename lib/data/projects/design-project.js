"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var common_1 = require("../common");
exports.ServiceQuestion = {
    token: "service",
    title: "What sort of Graphic Design are you interested in?",
    options: [{ value: "logo-design", label: "Logo design" }, { value: "advertisements", label: "Advertisements" }, { value: "marketing", label: "Brochures and marketing material" }, { value: "branding", label: "Corporate branding" }, { value: "digitalization", label: "Digitalization of sketch" }, { value: "infographics", label: "Infographics" }],
    other: { label: "Other" }
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.DesignQuestion = {
    token: "design",
    title: "Are we making something completely new, or brushing up an existing design?",
    options: [{ value: "new", label: "New design" }, { value: "existing", label: "Existing design" }]
};
exports.DesignPage = {
    questions: [exports.DesignQuestion]
};
exports.StyleQuestion = {
    token: "style",
    title: "Directionally, what kind of style do you like?",
    options: [{ value: "serious", label: "Serious" }, { value: "playful", label: "Playful" }, { value: "inspirational", label: "Inspirational" }, { value: "dramatic", label: "Dramatic" }]
};
exports.StylePage = {
    questions: [exports.StyleQuestion],
    active: function active(form) {
        switch (form.design) {
            case "existing":
                return false;
        }
        return true;
    }
};
exports.FilesQuestion = {
    token: "files",
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    required: false
};
exports.FilesPage = {
    questions: [exports.FilesQuestion],
    active: function active(form) {
        switch (form.design) {
            case "new":
                return false;
        }
        return true;
    }
};

var DesignProjectSurvey = function DesignProjectSurvey() {
    _classCallCheck(this, DesignProjectSurvey);

    this.service = exports.ServicePage;
    this.design = exports.DesignPage;
    this.style = exports.StylePage;
    this.files = exports.FilesPage;
    this.deadline = common_1.DueDatePage;
    this.comments = common_1.CommentsPage;
    this.survey = {
        defaultRequired: true,
        pages: [this.service, this.design,
        //this.style,
        //this.files,
        this.deadline, this.comments]
    };
};

exports.DesignProjectSurvey = DesignProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new DesignProjectSurvey();
//# sourceMappingURL=design-project.js.map