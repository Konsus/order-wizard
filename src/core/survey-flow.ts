const keyName = "#keyID";
var keyUID = 0;

export class Keys {
    static questionKey(question: Survey.Question, define: boolean) {
        let key = question[keyName];
        if (typeof key !== "undefined") return key;
        if (!define) return null;
        Object.defineProperty(question, keyName, {
            enumerable: false,
            value: ++keyUID,
        });
        return keyUID;
    }

    static pageKey(question: Survey.Page, define: boolean) {
        let key = question[keyName];
        if (typeof key !== "undefined") return key;
        if (!define) return null;
        Object.defineProperty(question, keyName, {
            enumerable: false,
            value: ++keyUID,
        });
        return keyUID;
    }

    static key(instance: any, define: boolean) {
        let key = instance[keyName];
        if (typeof key !== "undefined") return key;
        if (!define) return null;
        Object.defineProperty(instance, keyName, {
            enumerable: false,
            value: ++keyUID,
        });
        return keyUID;
    }
}

export class SurveyFlow {

    private _pages: Object = {};
    private _questions: Object = {};

    constructor(public context: Survey.Context) { }

    get form(): Survey.SurveyForm {
        return this.context.form;
    }

    get questionnaire(): Survey.Questionnaire {
        return this.context.questionnaire;
    }

    public setQuestionView(question: Survey.Question, state: Survey.QuestionView): void {
        const key = Keys.key(question, true);
        this._questions[key] = state;
    }

    public getQuestionView(question: Survey.Question): Survey.QuestionView {
        const key = Keys.key(question, false);
        if (key == null) return null;
        return this._questions[key];
    }

    public removeQuestionView(question: Survey.Question): void {
        const key = Keys.key(question, false);
        if (key == null) return null;
        const state = this._questions[key];
        delete this._questions[key];
        return state;
    }

    public setPageView(page: Survey.Page, state: Survey.PageView): void {
        const key = Keys.key(page, true);
        this._pages[key] = state;
    }

    public getPageView(page: Survey.Question): Survey.PageView {
        const key = Keys.key(page, false);
        return key && this._pages[key];
    }

    public isPageActive(page: Survey.Page) {
        // null pages should not be active
        if (!page) return false;

        // check embedded
        if (page.active)
            if (!page.active(this.context.form))
                return false;

        // check state
        const state = this.getPageView(page);
        if (state && state.active)
            if (!state.active(page))
                return false;

        // active by default
        return true;
    }

    public isRequiredQuestion(question: Survey.Question) {

        // check question
        if (!question) return false;

        // check question setup
        if (question.required != null)
            return question.required;

        // check default survey options
        if (this.context.questionnaire.defaultRequired)
            return true;

        // not required by default
        return false
    }

    /**
     * Whether question is answered or not required.
     * @param question
     */
    public isQuestionDone(question: Survey.Question): boolean {
        // null question are always done
        if (!question) return true;

        // questions without token can't be checked
        if (!question.token) return true;

        // check if question is active (disabled question are not required)
        if (question.active != null)
            if (!question.active(this.form))
                return true;

        // check if answer is not null
        const answer = this.context.form.getValue(question.token);
        if (answer != null) return true;

        // required question can't have null value
        if (this.isRequiredQuestion(question))
            return false;

        return true;
    }
}


