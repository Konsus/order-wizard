"use strict";

const common_1 = require("../common");
exports.ServiceQuestion = {
    token: "service",
    title: "What sort of task do you have in mind?",
    options: [{ value: "company-research", label: "Company or financial research" }, { value: "industry-research", label: "Market or industry research" }, { value: "contacts", label: "Contact information from websites" }, { value: "images", label: "Collecting images" }],
    other: { label: "Other" }
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.FilesQuestion = {
    token: "files",
    title: "Please provide any files or links, and a thorough description of the task including desired structure of output",
    required: false
};
exports.FilesPage = {
    questions: [exports.FilesQuestion]
};
class ResearchProjectSurvey {
    constructor() {
        this.service = exports.ServicePage;
        this.files = exports.FilesPage;
        this.deadline = common_1.DueDatePage;
        this.comments = common_1.CommentsPage;
        this.survey = {
            defaultRequired: true,
            pages: [this.service, this.files, this.deadline, this.comments]
        };
    }
}
exports.ResearchProjectSurvey = ResearchProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new ResearchProjectSurvey();
//# sourceMappingURL=research-project.js.map