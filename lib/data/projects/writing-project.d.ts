export declare const ServiceQuestion: Survey.Question;
export declare const ServicePage: Survey.Page;
export declare const TopicQuestion: Survey.Question;
export declare const TopicPage: Survey.Page;
export declare const ContentQuestion: Survey.Question;
export declare const ContentComment: Survey.Question;
export declare const ContentPage: Survey.Page;
export declare const FilesQuestion: Survey.Question;
export declare const FilesPage: Survey.Page;
export declare class WritingProjectSurvey {
    service: Survey.Page;
    topic: Survey.Page;
    content: Survey.Page;
    files: Survey.Page;
    deadline: Survey.Page;
    comments: Survey.Page;
    survey: Survey.Questionnaire;
}
declare var _default: WritingProjectSurvey;
export default _default;
