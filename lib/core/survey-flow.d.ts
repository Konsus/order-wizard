export declare class Keys {
    static questionKey(question: Survey.Question, define: boolean): any;
    static pageKey(question: Survey.Page, define: boolean): any;
    static key(instance: any, define: boolean): any;
}
export declare class SurveyFlow {
    context: Survey.Context;
    private _pages;
    private _questions;
    constructor(context: Survey.Context);
    readonly form: Survey.SurveyForm;
    readonly questionnaire: Survey.Questionnaire;
    setQuestionView(question: Survey.Question, state: Survey.QuestionView): void;
    getQuestionView(question: Survey.Question): Survey.QuestionView;
    removeQuestionView(question: Survey.Question): void;
    setPageView(page: Survey.Page, state: Survey.PageView): void;
    getPageView(page: Survey.Question): Survey.PageView;
    isPageActive(page: Survey.Page): boolean;
    isRequiredQuestion(question: Survey.Question): boolean;
    /**
     * Whether question is answered or not required.
     * @param question
     */
    isQuestionDone(question: Survey.Question): boolean;
}
