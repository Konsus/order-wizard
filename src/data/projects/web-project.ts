import Questionnaire = Survey.Questionnaire;
import WebProject = Survey.Forms.WebProject;
import {CommentsPage, DueDatePage} from "../common";

export const WebSiteQuestion: Survey.Question = {
    title: "What are you looking to do?",
    token: nameof((null as WebProject).website),
    options: [
        {value: "new", label: "Making a new website"},
        {value: "existing", label: "Improve an existing website"},
    ],
};

export const WebSiteLinkQuestion: Survey.Question = {
    title: "Link to website",
    token: nameof((null as WebProject).website_link),
    active: (form: WebProject) => form.website == "existing",
};

export const WebSitePage: Survey.Page = {
    questions: [
        WebSiteQuestion,
        WebSiteLinkQuestion
    ],
};

export const TechInfoQuestion: Survey.Question = {
    token: nameof((null as WebProject).tech_info),
    title: "On what technology is your current site built, and which integrations and modules are you using?",
};

export const TechInfoPage: Survey.Page = {
    questions: [TechInfoQuestion],
    active: (form: WebProject) => {
        switch (form.website) {
            case "existing":
                return false;
        }
        return true;
    },
};

export const ServiceQuestion: Survey.Question = {
    token: nameof((null as WebProject).service),
    title: "What could you use some help for?",
    options: [
        {value: "structure", label: "Layout and structure"},
        {value: "implementation", label: "Implementation"},
        {value: "content", label: "Content writing"},
        {value: "design", label: "Designing graphics, images and illustrations"},
        {value: "other", label: "Other"},
    ],
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion],
};

export const TechRequirementsQuestion: Survey.Question = {
    token: nameof((null as WebProject).tech_requirement),
    title: "Do you have a preference for which technology should be used?",
    options: [
        {value: "no", label: "No, please use the most suitable tech"},
        {value: "yes", label: "Yes"},
    ],
};

export const TechRequirementsPage: Survey.Page = {
    questions: [TechRequirementsQuestion],
    active: (form: WebProject) => {
        switch (form.website) {
            case "new":
                return true;
        }
        return false;
    },
};

export const TechPreferencesQuestion: Survey.Question = {
    token: nameof((null as WebProject).tech_preferences),
    title: "Which technology do you prefer?",
    options: [
        {value: "shopify", label: "Shopify"},
        {value: "wordpress", label: "Wordpress"},
        {value: "wix", label: "Wix.com"},
        {value: "squarespace", label: "Squarespace"},
        {value: "html-css", label: "Basic HTML/CSS"},
        {value: "other", label: "Other"},
    ],
};

export const TechPreferencesPage: Survey.Page = {
    questions: [TechPreferencesQuestion],
    active: (form: WebProject) => {
        switch (form.website) {
            case "existing":
                return false;
        }
        switch (form.tech_requirement) {
            case "no":
                return false;
        }
        const services = form.service;
        if (services instanceof Array) {
            if (services.indexOf("structure") >= 0) return true;
            if (services.indexOf("implementation") >= 0) return true;
            return false;
        }
        return true;
    },
};

export const PurposeQuestion: Survey.Question = {
    token: nameof((null as WebProject).purpose),
    title: "Can you please explain the purpose and audience for your website?",
};

export const PurposePage: Survey.Page = {
    questions: [PurposeQuestion],
};

export const FilesQuestion: Survey.Question = {
    token: nameof((null as WebProject).files),
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    options: [
        {value: "", label: "Any existing page design files"},
        {value: "", label: "Any existing text content or graphic content (high quality)"},
        {value: "", label: "Specific font types, color combinations or graphic elements you want to use"},
        {
            value: "",
            label: "Existing graphics or corporate material that we should make it consistent with, or websites we should use as inspiration"
        },
    ],
    required: false,
};

export const FilesPage: Survey.Page = {
    questions: [FilesQuestion],
};

export class WebProjectSurvey {
    website = WebSitePage;
    service = ServicePage;
    techInfo = TechInfoPage;
    techRequirements = TechRequirementsPage;
    techPreferences = TechPreferencesPage;
    purpose = PurposePage;
    files = FilesPage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
        defaultRequired: true,
        pages: [
            this.website,
            this.techInfo,
            this.service,
            this.techRequirements,
            this.techPreferences,
            this.purpose,
            this.files,
            this.deadline,
            this.comments,
        ]
    };
}

export default new WebProjectSurvey();
