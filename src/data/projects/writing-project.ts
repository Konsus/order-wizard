import Questionnaire = Survey.Questionnaire;
import WritingProject = Survey.Forms.WritingProject;
import {CommentsPage, DueDatePage} from "../common";

export const ServiceQuestion: Survey.Question = {
    token: nameof((null as WritingProject).service),
    title: "What sort of writing are you interested in?",
    options: [
        {value: "blog-posts", label: "Blog posts"},
        {value: "website-content", label: "Content for website"},
        {value: "smm-content", label: "Social media content"},
        {value: "articles", label: "White papers or articles"},
        {value: "press-release", label: "Press releases"},
        {value: "proofreading", label: "Proofreading"},
        {value: "audio-transcription", label: "Audio transcription"},
    ],
    other: {label: "Other"},
};

export const ServicePage: Survey.Page = {
    questions: [ServiceQuestion]
};

export const TopicQuestion: Survey.Question = {
    token: nameof((null as WritingProject).topic),
    title: "Can you please describe the topic and length of the content, and who will be the audience?",
};

export const TopicPage: Survey.Page = {
    questions: [TopicQuestion],
    active: (form: WritingProject) => {
        switch (form.service) {
            case "proofreading":
            case "audio-transcription":
                return false;
        }
        return true;
    },
};

export const ContentQuestion: Survey.Question = {
    token: nameof((null as WritingProject).contents),
    title: "Please upload or provide any files or links and carefully explain the use of each one",
    required: false,
};

export const ContentComment: Survey.Question = {
    token: nameof((null as WritingProject).content_comment),
    title: "Total comment",
    required: false,
};

export const ContentPage: Survey.Page = {
    questions: [
        ContentQuestion,
        ContentComment,
    ],
    active: (form: WritingProject) => {
        switch (form.service) {
            case "proofreading":
            case "audio-transcription":
                return true;
        }
        return false;
    },
};

export const FilesQuestion: Survey.Question = {
    token: nameof((null as WritingProject).files),
    title: "Do you have any existing material that you would like us to use as starting point or inspiration?",
    required: false,
};

export const FilesPage: Survey.Page = {
    questions: [FilesQuestion],
    active: (form: WritingProject) => {
        switch (form.service) {
            case "proofreading":
            case "audio-transcription":
                return false;
        }
        return true;
    },
};

export default new class WritingProjectSurvey {
    service = ServicePage;
    topic = TopicPage;
    content = ContentPage;
    files = FilesPage;
    deadline = DueDatePage;
    comments = CommentsPage;

    survey: Survey.Questionnaire = {
        defaultRequired: true,
        pages: [
            this.service,
            this.topic,
            this.content,
            this.files,
            this.deadline,
            this.comments,
        ]
    };
}

