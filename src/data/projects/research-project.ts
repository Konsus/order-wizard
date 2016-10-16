import Questionnaire = Survey.Questionnaire;
import ResearchProject = Survey.Forms.ResearchProject;
import {CommentsPage, DueDatePage} from "../common";

export const ServiceQuestion: Survey.Question = {
    token: nameof((null as ResearchProject).service),
    title: "What sort of task do you have in mind?",
    options: [
        {value: "company-research", label: "Company or financial research"},
        {value: "industry-research", label: "Market or industry research"},
        {value: "contacts", label: "Contact information from websites"},
        {value: "images", label: "Collecting images"},
    ],
    other: {label: "Other"},
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion]
};

export const FilesQuestion: Survey.Question = {
    token: nameof((null as ResearchProject).files),
    title: "Please provide any files or links, and a thorough description of the task including desired structure of output",
    required: false,
};

export const FilesPage: Survey.Page = {
    questions: [FilesQuestion],
};

export class ResearchProjectSurvey {
    service = ServicePage;
    files = FilesPage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
        defaultRequired: true,
        pages: [
            this.service,
            this.files,
            this.deadline,
            this.comments,
        ]
    };
}

export default new ResearchProjectSurvey();
