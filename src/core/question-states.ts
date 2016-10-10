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

    static pageKey(question: Survey.QuestionPage, define: boolean) {
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

export class SurveyState {

    private _pages: Object = {};
    private _questions: Object = {};

    public setQuestionState(question: Survey.Question, state: Survey.QuestionState): void {
        const key = Keys.key(question, true);
        this._questions[key] = state;
    }

    public getQuestionState(question: Survey.Question): Survey.QuestionState {
        const key = Keys.key(question, false);
        if (key == null) return null;
        return this._questions[key];
    }

    public removeQuestionState(question: Survey.Question): void {
        const key = Keys.key(question, false);
        if (key == null) return null;
        const state = this._questions[key];
        delete this._questions[key];
        return state;
    }

    public setPageState(page: Survey.QuestionPage, state: Survey.PageState): void {
        const key = Keys.key(page, true);
        this._pages[key] = state;
    }

    public getPageState(page: Survey.Question): Survey.PageState {
        const key = Keys.key(page, false);
        return key && this._pages[key];
    }

    public isPageActive(page: Survey.QuestionPage, context: Survey.SurveyContext) {
        // null pages should not be active
        if (!page) return false;

        // check embedded
        if (page.active && context && context.form)
            if (!page.active(context.form))
                return false;

        // check state
        const state = this.getPageState(page);
        if (state && state.active)
            if (!state.active(page))
                return false;

        // active by default
        return true;
    }

}


