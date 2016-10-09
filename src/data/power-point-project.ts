const form: Survey.Forms.PowerPointProject = null;

export const ServiceTypeQuestion: Survey.Question = {
    token: nameof(form.service_type),
    title: "What sort of PowerPoint service are you interested in?",
    options: [
        {value: "style-format", label: "Professional formatting of existing presentation"},
        {value: "style-enhance", label: "Creative visual enhancement of existing presentation"},
        {value: "new-presentation", label: "New slide deck from scratch"},
        {value: "update-template", label: "Update Company Template"},
        {value: "new-template", label: "New Company Template"},
    ]
};

export const CompanyTemplateQuestion: Survey.Question = {
    token: nameof(form.template),
    title: "Do you have a template for Data Entry?",
    options: [
        {value: "yes", label: "Yes."},
        {value: "no", label: "No, but please include that as part of delivery."},
        {value: "embedded", label: "Use the template the presentation is currently in."}
    ]
};

export const StyleQuestion: Survey.Question = {
    token: nameof(form.style_type),
    title: "Directionally, what kind of style do you like?",
    options: [
        {value: "serious", label: "Serious"},
        {value: "playful", label: "Playful"},
        {value: "inspirational", label: "Inspirational"},
        {value: "dramatic", label: "Dramatic"},
    ]
};

export const FilesPage: Survey.QuestionPage = {
    title: "Can you please upload additional files, as well as carefully explain the use of each?",
    questions: [
        {title: "Existing company material (such as presentations, website) we should make it consistent with or use as inspiration"},
        {title: "Pictures, logos and artwork that we should include in the presentation "},
        {title: "Other graphics that you would like us to find or tailor make for you, and where these should be included"}
    ]
};

export const PurposeQuestion: Survey.Question = {
    token: nameof(form.purpose),
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

export const DeadlinePage: Survey.QuestionPage = {
    title: "Do you have a definite deadline?",
    questions: [{
        options: [
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ],
    }]
};

export const CommentsQuestion: Survey.Question = {
    title: "Anything else we should know before this information is submitted?",
    required: false
};

export const ServiceTypePage: Survey.QuestionPage = {
    questions: [ServiceTypeQuestion]
};

export const CompanyTemplatePage: Survey.QuestionPage = {
    questions: [CompanyTemplateQuestion]
};

export const StylePage: Survey.QuestionPage = {
    questions: [StyleQuestion]
};

export const PurposePage: Survey.QuestionPage = {
    questions: [PurposeQuestion]
};

export const CommentsPage: Survey.QuestionPage = {
    questions: [CommentsQuestion]
};

export const Questionnaire: Survey.Questionnaire = {
    pages: [
        ServiceTypePage,
        CompanyTemplatePage,
        StylePage,
        FilesPage,
        PurposePage,
        DeadlinePage,
        CommentsPage,
    ],
};

