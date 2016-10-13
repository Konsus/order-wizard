import Questionnaire = Survey.Questionnaire;
import PowerPointProject = Survey.Forms.PowerPointProject;
import {CommentsPage, DueDatePage} from "../common";

export const ServiceQuestion: Survey.Question = {
    token: nameof((null as PowerPointProject).service),
    title: "What sort of PowerPoint service are you interested in?",
    options: [
        {value: "style-format", label: "Professional formatting of existing presentation"},
        {value: "style-enhance", label: "Creative visual enhancement of existing presentation"},
        {value: "new-presentation", label: "New slide deck from scratch"},
        {value: "update-template", label: "Update Company Template"},
        {value: "new-template", label: "New Company Template"},
    ],
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion]
};

export const CompanyTemplateQuestion: Survey.Question = {
    token: nameof((null as PowerPointProject).template),
    title: "Do you have a template for Data Entry?",
    options: [
        {value: "yes", label: "Yes."},
        {value: "no", label: "No, but please include that as part of delivery."},
        {value: "embedded", label: "Use the template the presentation is currently in."}
    ]
};

export const CompanyTemplatePage: Survey.Page = {
    questions: [CompanyTemplateQuestion],
    active: (form: PowerPointProject) => {
        switch (form.service) {
            case "update-template":
            case "new-template":
                return false;
        }
        return true;
    },
};

export const StyleQuestion: Survey.Question = {
    token: nameof((null as PowerPointProject).style),
    title: "Directionally, what kind of style do you like?",
    options: [
        {value: "serious", label: "Serious"},
        {value: "playful", label: "Playful"},
        {value: "inspirational", label: "Inspirational"},
        {value: "dramatic", label: "Dramatic"},
    ]
};

export const StylePage: Survey.Page = {
    questions: [StyleQuestion],
    active: (form: PowerPointProject) => {
        switch (form.template) {
            case "yes":
            case "embedded":
                return false;
        }
        return true;
    },
};

export const FilesPage: Survey.Page = {
    title: "Can you please upload additional files, as well as carefully explain the use of each?",
    questions: [
        {title: "Existing company material (such as presentations, website) we should make it consistent with or use as inspiration"},
        {title: "Pictures, logos and artwork that we should include in the presentation "},
        {title: "Other graphics that you would like us to find or tailor make for you, and where these should be included"}
    ]
};

export const PurposeQuestion: Survey.Question = {
    token: nameof((null as PowerPointProject).purpose),
    title: "What will be the main type of presentations you will make from your new template?",
    options: [
        {
            value: "graphics",
            label: "Graphics combined with large size bullet points (for presenting to large audiences)"
        },
        {value: "tables"},
        {value: "charts"},
    ]
};

export const PurposePage: Survey.Page = {
    questions: [PurposeQuestion],
    active: (form: PowerPointProject) => {
        switch (form.service) {
            case "style-format":
            case "style-enhance":
            case "new-presentation":
                return false;
        }
        switch (form.template) {
            case "yes":
            case "embedded":
                return false;
        }
        return true;
    },
};

export default new class PowerPointProjectSurvey {
    service = ServicePage;
    companyTemplate = CompanyTemplatePage;
    style = StylePage;
    files = FilesPage;
    purpose = PurposePage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
        defaultRequired: true,
        pages: [
            this.service,
            this.companyTemplate,
            this.style,
            this.files,
            this.purpose,
            this.deadline,
            this.comments,
        ]
    };
}

