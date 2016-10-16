import Questionnaire = Survey.Questionnaire;
import DesignProject = Survey.Forms.DesignProject;
import {CommentsPage, DueDatePage} from "../common";

export const ServiceQuestion: Survey.Question = {
    token: nameof((null as DesignProject).service),
    title: "What sort of Graphic Design are you interested in?",
    options: [
        {value: "logo-design", label: "Logo design"},
        {value: "advertisements", label: "Advertisements"},
        {value: "marketing", label: "Brochures and marketing material"},
        {value: "branding", label: "Corporate branding"},
        {value: "other", label: "Other illustrations or infographics"},
    ],
    other: {label: "Other"},
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion]
};

export const DesignQuestion: Survey.Question = {
    token: nameof((null as DesignProject).design),
    title: "Are we making something completely new, or brushing up an existing design?",
    options: [
        {value: "new", label: "New design"},
        {value: "existing", label: "Existing design"},
    ]
};

export const DesignPage: Survey.Page = {
    questions: [DesignQuestion],
};

export const StyleQuestion: Survey.Question = {
    token: nameof((null as DesignProject).style),
    title: "Directionally, what kind of style do you like?",
    options: [
        {value: "serious", label: "Serious"},
        {value: "playful", label: "Playful"},
        {value: "inspirational", label: "Inspirational"},
        {value: "dramatic", label: "Dramatic"},
    ],
};

export const StylePage: Survey.Page = {
    questions: [StyleQuestion],
    active: (form: DesignProject) => {
        switch (form.design) {
            case "existing":
                return false;
        }
        return true;
    },
};

export const FilesQuestion: Survey.Question = {
    token: nameof((null as DesignProject).files),
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    required: false,
};

export const FilesPage: Survey.Page = {
    questions: [FilesQuestion],
    active: (form: DesignProject) => {
        switch (form.design) {
            case "new":
                return false;
        }
        return true;
    },
};

export class DesignProjectSurvey {
    service = ServicePage;
    design = DesignPage;
    style = StylePage;
    files = FilesPage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
        defaultRequired: true,
        pages: [
            this.service,
            this.design,
            this.style,
            this.files,
            this.deadline,
            this.comments,
        ]
    };
}

export default new DesignProjectSurvey();
