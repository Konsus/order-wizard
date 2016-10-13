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
        {value: "other", label: "Other"},
    ],
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion]
};

export const FilesQuestion: Survey.Question = {
    token: nameof((null as ResearchProject).files),
    title: "Please provide a thorough description of the task and any files or links, including desired structure of output",
    required: false,
};

export const FilesPage: Survey.Page = {
    questions: [FilesQuestion],
};

export default new class ResearchProjectSurvey {
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

