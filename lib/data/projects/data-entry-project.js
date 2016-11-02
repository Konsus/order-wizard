"use strict";
const common_1 = require("../common");
exports.ServiceTypeQuestion = {
    token: nameof(null.service),
    title: "What sort of task do you have in mind?",
    options: [
        { value: "from-pdf", label: "PDF to Excel, Word or similar" },
        { value: "from-img", label: "Image to Excel, Word or similar" },
        { value: "from-web", label: "Website to Excel, Word or similar" },
        { value: "linked-in", label: "Gathering contact information from LinkedIn" },
        { value: "cleaning", label: "Data Cleaning" },
    ],
    other: { label: "Other" }
};
exports.ServiceTypePage = {
    questions: [exports.ServiceTypeQuestion]
};
exports.DescriptionQuestion = {
    token: nameof(null.description),
    title: "Existing company material (such as presentations, website) we should make it consistent with or use as inspiration",
    required: false,
};
exports.DescriptionPage = {
    title: "Please provide any files or links, and a thorough description of the task including desired structure of output",
    questions: [exports.DescriptionQuestion],
};
class DataEntryProjectSurvey {
    constructor() {
        this.service = exports.ServiceTypePage;
        this.description = exports.DescriptionPage;
        this.deadline = common_1.DueDatePage;
        this.comments = common_1.CommentsPage;
        this.survey = {
            defaultRequired: true,
            pages: [
                this.service,
                this.description,
                this.deadline,
                this.comments,
            ]
        };
    }
}
exports.DataEntryProjectSurvey = DataEntryProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new DataEntryProjectSurvey();
//# sourceMappingURL=data-entry-project.js.map