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
    other: {label: "Other"},
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion]
};

export const TemplateQuestion: Survey.Question = {
    token: nameof((null as PowerPointProject).template),
    title: "Do you have an existing template we should use?",
    options: [
        {value: "yes", label: "Yes."}, {
            value: "no",
            label: "No, but please include that as part of delivery.",
            active: (form: PowerPointProject) => form.service != "new-presentation",
        },
        {value: "embedded", label: "Use the template the presentation is currently in."}
    ]
};

export const TemplatePage: Survey.Page = {
    questions: [TemplateQuestion],
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
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    questions: [
        {title: "The draft presentation or the basis for the structure and main content of your deck"},
        {title: "Other company material or website we should make it consistent with or use as inspiration"},
        {title: "Pictures, logos and artwork that we should include in the presentation (high quality)"},
        {title: "Other graphics that you would like us to find or tailor make for you"},
    ]
};

export const PurposeQuestion: Survey.Question = {
    token: nameof((null as PowerPointProject).purpose),
    title: "What will be the use of your presentation, and who will be the audience?",
    options: [
        {
            value: "graphics",
            label: "Mostly graphics combined with large size bullet points (for presenting to large audiences)"
        },
        {value: "tables", label: "Normal size text, tables, charts and some details (for reading and reports)"},
        {value: "both", label: "Combination of both"},
    ]
};

export const PurposePage: Survey.Page = {
    questions: [PurposeQuestion],
};

export class PowerPointProjectSurvey {
    service = ServicePage;
    template = TemplatePage;
    style = StylePage;
    files = FilesPage;
    purpose = PurposePage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
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

export default new PowerPointProjectSurvey();
