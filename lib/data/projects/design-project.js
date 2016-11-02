"use strict";
const common_1 = require("../common");
exports.ServiceQuestion = {
    token: nameof(null.service),
    title: "What sort of Graphic Design are you interested in?",
    options: [
        { value: "logo-design", label: "Logo design" },
        { value: "advertisements", label: "Advertisements" },
        { value: "marketing", label: "Brochures and marketing material" },
        { value: "branding", label: "Corporate branding" },
        { value: "digitalization", label: "Digitalization of sketch" },
        { value: "infographics", label: "Infographics" },
    ],
    other: { label: "Other" },
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.DesignQuestion = {
    token: nameof(null.design),
    title: "Are we making something completely new, or brushing up an existing design?",
    options: [
        { value: "new", label: "New design" },
        { value: "existing", label: "Existing design" },
    ]
};
exports.DesignPage = {
    questions: [exports.DesignQuestion],
};
exports.StyleQuestion = {
    token: nameof(null.style),
    title: "Directionally, what kind of style do you like?",
    options: [
        { value: "serious", label: "Serious" },
        { value: "playful", label: "Playful" },
        { value: "inspirational", label: "Inspirational" },
        { value: "dramatic", label: "Dramatic" },
    ],
};
exports.StylePage = {
    questions: [exports.StyleQuestion],
    active: (form) => {
        switch (form.design) {
            case "existing":
                return false;
        }
        return true;
    },
};
exports.FilesQuestion = {
    token: nameof(null.files),
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    required: false,
};
exports.FilesPage = {
    questions: [exports.FilesQuestion],
    active: (form) => {
        switch (form.design) {
            case "new":
                return false;
        }
        return true;
    },
};
class DesignProjectSurvey {
    constructor() {
        this.service = exports.ServicePage;
        this.design = exports.DesignPage;
        this.style = exports.StylePage;
        this.files = exports.FilesPage;
        this.deadline = common_1.DueDatePage;
        this.comments = common_1.CommentsPage;
        this.survey = {
            defaultRequired: true,
            pages: [
                this.service,
                this.design,
                //this.style,
                //this.files,
                this.deadline,
                this.comments,
            ]
        };
    }
}
exports.DesignProjectSurvey = DesignProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new DesignProjectSurvey();
//# sourceMappingURL=design-project.js.map