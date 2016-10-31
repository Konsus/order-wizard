"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var common_1 = require("../common");
exports.WebSiteQuestion = {
    title: "What are you looking to do?",
    token: "website",
    options: [{ value: "new", label: "Make a new website" }, { value: "existing", label: "Improve an existing website" }]
};
exports.WebSiteLinkQuestion = {
    title: "Link to website",
    token: "website_link",
    active: function active(form) {
        return form.website == "existing";
    },
    resize: "none",
    rows: 1
};
exports.WebSitePage = {
    questions: [exports.WebSiteQuestion, exports.WebSiteLinkQuestion]
};
exports.TechInfoQuestion = {
    token: "tech_info",
    title: "On what technology is your current site built, and which integrations and modules are you using?"
};
exports.TechInfoPage = {
    questions: [exports.TechInfoQuestion],
    active: function active(form) {
        switch (form.website) {
            case "existing":
                return false;
        }
        return true;
    }
};
exports.ServiceQuestion = {
    token: "service",
    title: "What could you use some help for?",
    options: [{ value: "structure", label: "Layout and structure" }, { value: "implementation", label: "Implementation" }, { value: "content", label: "Content writing" }, { value: "design", label: "Designing graphics, images and illustrations" }, { value: "other", label: "Other" }]
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.TechRequirementsQuestion = {
    token: "tech_requirement",
    title: "Do you have a preference for which technology should be used?",
    options: [{ value: "no", label: "No, please use the most suitable tech" }, { value: "yes", label: "Yes, I do" }]
};
exports.TechRequirementsPage = {
    questions: [exports.TechRequirementsQuestion],
    active: function active(form) {
        switch (form.website) {
            case "new":
                return true;
        }
        return false;
    }
};
exports.TechPreferencesQuestion = {
    token: "tech_preferences",
    title: "Which technology do you prefer?",
    options: [{ value: "shopify", label: "Shopify" }, { value: "wordpress", label: "Wordpress" }, { value: "wix", label: "Wix.com" }, { value: "squarespace", label: "Squarespace" }, { value: "html-css", label: "Basic HTML/CSS" }, { value: "other", label: "Other" }]
};
exports.TechPreferencesPage = {
    questions: [exports.TechPreferencesQuestion],
    active: function active(form) {
        switch (form.website) {
            case "existing":
                return false;
        }
        switch (form.tech_requirement) {
            case "no":
                return false;
        }
        var services = form.service;
        if (services instanceof Array) {
            if (services.indexOf("structure") >= 0) return true;
            if (services.indexOf("implementation") >= 0) return true;
            return false;
        }
        return true;
    }
};
exports.PurposeQuestion = {
    token: "purpose",
    title: "Can you please explain the purpose and audience for your website?"
};
exports.PurposePage = {
    questions: [exports.PurposeQuestion]
};
exports.FilesQuestion = {
    token: "files",
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    options: [{ value: "", label: "Any existing page design files" }, { value: "", label: "Any existing text content or graphic content (high quality)" }, { value: "", label: "Specific font types, color combinations or graphic elements you want to use" }, {
        value: "",
        label: "Existing graphics or corporate material that we should make it consistent with, or websites we should use as inspiration"
    }],
    required: false
};
exports.FilesPage = {
    questions: [exports.FilesQuestion]
};

var WebProjectSurvey = function WebProjectSurvey() {
    _classCallCheck(this, WebProjectSurvey);

    this.website = exports.WebSitePage;
    this.service = exports.ServicePage;
    this.techInfo = exports.TechInfoPage;
    this.techRequirements = exports.TechRequirementsPage;
    this.techPreferences = exports.TechPreferencesPage;
    this.purpose = exports.PurposePage;
    this.files = exports.FilesPage;
    this.deadline = common_1.DueDatePage;
    this.comments = common_1.CommentsPage;
    this.survey = {
        defaultRequired: true,
        pages: [this.website, this.techInfo, this.service, this.techRequirements, this.techPreferences, this.purpose, this.files, this.deadline, this.comments]
    };
};

exports.WebProjectSurvey = WebProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new WebProjectSurvey();
//# sourceMappingURL=web-project.js.map
