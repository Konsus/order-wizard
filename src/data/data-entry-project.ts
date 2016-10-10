import DataEntryProject = Survey.Forms.DataEntryProject;
import {CommentsPage, DueDatePage} from "./common";
import Questionnaire = Survey.Questionnaire;

export const ServiceTypeQuestion: Survey.Question = {
    token: nameof((null as DataEntryProject).service),
    title: "What sort of task do you have in mind?",
    options: [
        {value: "pdf", label: "Data entry from PDFs, pictures or a website"},
        {value: "linked-in", label: "Gathering contact information from LinkedIn"},
        {value: "cleaning", label: "Data Cleaning"},
    ]
};

export const DescriptionPage: Survey.Page = {
    title: "Please provide a thorough description of the task and any files or links, including desired structure of output",
    questions: [
        {title: "Existing company material (such as presentations, website) we should make it consistent with or use as inspiration"},
    ]
};

export const ServiceTypePage: Survey.Page = {
    questions: [ServiceTypeQuestion]
};

export default new class DataEntryProjectSurvey implements Survey.Questionnaire {
    serviceType = ServiceTypePage;
    description = DescriptionPage;
    deadline = DueDatePage;
    comments = CommentsPage;

    pages = [
        this.serviceType,
        this.description,
        this.deadline,
        this.comments,
    ];
}

