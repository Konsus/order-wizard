import Questionnaire = Survey.Questionnaire;
import DataEntryProject = Survey.Forms.DataEntryProject;
import {CommentsPage, DueDatePage} from "../common";

export const ServiceTypeQuestion: Survey.Question = {
    token: nameof((null as DataEntryProject).service),
    title: "What sort of task do you have in mind?",
    options: [
        {value: "pdf", label: "Data entry from PDFs, pictures or a website"},
        {value: "linked-in", label: "Gathering contact information from LinkedIn"},
        {value: "cleaning", label: "Data Cleaning"},
    ],
};

export const ServiceTypePage: Survey.Page = {
    questions: [ServiceTypeQuestion]
};

export const DescriptionQuestion: Survey.Question = {
    token: nameof((null as DataEntryProject).description),
    title: "Existing company material (such as presentations, website) we should make it consistent with or use as inspiration",
    required: false,
};

export const DescriptionPage: Survey.Page = {
    title: "Please provide a thorough description of the task and any files or links, including desired structure of output",
    questions: [DescriptionQuestion],
};

export default new class DataEntryProjectSurvey {
    service = ServiceTypePage;
    description = DescriptionPage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
        defaultRequired: true,
        pages: [
            this.service,
            this.description,
            this.deadline,
            this.comments,
        ]
    };
};