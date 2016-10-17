"use strict";

const common_1 = require("../common");
exports.ServiceQuestion = {
    token: "service",
    title: "What sort of writing are you interested in?",
    options: [{ value: "blog-posts", label: "Blog posts" }, { value: "website-content", label: "Content for website" }, { value: "smm-content", label: "Social media content" }, { value: "articles", label: "White papers or articles" }, { value: "press-release", label: "Press releases" }, { value: "proofreading", label: "Proofreading" }, { value: "audio-transcription", label: "Audio transcription" }],
    other: { label: "Other" }
};
exports.ServicePage = {
    questions: [exports.ServiceQuestion]
};
exports.TopicQuestion = {
    token: "topic",
    title: "Can you please describe the topic and length of the content, and who will be the audience?"
};
exports.TopicPage = {
    questions: [exports.TopicQuestion],
    active: form => {
        switch (form.service) {
            case "proofreading":
            case "audio-transcription":
                return false;
        }
        return true;
    }
};
exports.ContentQuestion = {
    token: "contents",
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    required: false
};
exports.ContentComment = {
    token: "content_comment",
    title: "Total comment",
    required: false
};
exports.ContentPage = {
    questions: [exports.ContentQuestion, exports.ContentComment],
    active: form => {
        switch (form.service) {
            case "proofreading":
            case "audio-transcription":
                return true;
        }
        return false;
    }
};
exports.FilesQuestion = {
    token: "files",
    title: "Do you have any existing material that you would like us to use as starting point or inspiration?",
    required: false
};
exports.FilesPage = {
    questions: [exports.FilesQuestion],
    active: form => {
        switch (form.service) {
            case "proofreading":
            case "audio-transcription":
                return false;
        }
        return true;
    }
};
class WritingProjectSurvey {
    constructor() {
        this.service = exports.ServicePage;
        this.topic = exports.TopicPage;
        this.content = exports.ContentPage;
        this.files = exports.FilesPage;
        this.deadline = common_1.DueDatePage;
        this.comments = common_1.CommentsPage;
        this.survey = {
            defaultRequired: true,
            pages: [this.service, this.topic, this.content, this.files, this.deadline, this.comments]
        };
    }
}
exports.WritingProjectSurvey = WritingProjectSurvey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new WritingProjectSurvey();
//# sourceMappingURL=writing-project.js.map