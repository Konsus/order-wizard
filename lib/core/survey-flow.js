"use strict";

const keyName = "#keyID";
var keyUID = 0;
class Keys {
    static questionKey(question, define) {
        let key = question[keyName];
        if (typeof key !== "undefined") return key;
        if (!define) return null;
        Object.defineProperty(question, keyName, {
            enumerable: false,
            value: ++keyUID
        });
        return keyUID;
    }
    static pageKey(question, define) {
        let key = question[keyName];
        if (typeof key !== "undefined") return key;
        if (!define) return null;
        Object.defineProperty(question, keyName, {
            enumerable: false,
            value: ++keyUID
        });
        return keyUID;
    }
    static key(instance, define) {
        let key = instance[keyName];
        if (typeof key !== "undefined") return key;
        if (!define) return null;
        Object.defineProperty(instance, keyName, {
            enumerable: false,
            value: ++keyUID
        });
        return keyUID;
    }
}
exports.Keys = Keys;
class SurveyFlow {
    constructor(context) {
        this.context = context;
        this._pages = {};
        this._questions = {};
    }
    get form() {
        return this.context.form;
    }
    get questionnaire() {
        return this.context.questionnaire;
    }
    setQuestionView(question, state) {
        const key = Keys.key(question, true);
        this._questions[key] = state;
    }
    getQuestionView(question) {
        const key = Keys.key(question, false);
        if (key == null) return null;
        return this._questions[key];
    }
    removeQuestionView(question) {
        const key = Keys.key(question, false);
        if (key == null) return null;
        const state = this._questions[key];
        delete this._questions[key];
        return state;
    }
    setPageView(page, state) {
        const key = Keys.key(page, true);
        this._pages[key] = state;
    }
    getPageView(page) {
        const key = Keys.key(page, false);
        return key && this._pages[key];
    }
    isPageActive(page) {
        // null pages should not be active
        if (!page) return false;
        // check embedded
        if (page.active) if (!page.active(this.context.form)) return false;
        // check state
        const state = this.getPageView(page);
        if (state && state.active) if (!state.active(page)) return false;
        // active by default
        return true;
    }
    isRequiredQuestion(question) {
        // check question
        if (!question) return false;
        // check question setup
        if (question.required != null) return question.required;
        // check default survey options
        if (this.context.questionnaire.defaultRequired) return true;
        // not required by default
        return false;
    }
    /**
     * Whether question is answered or not required.
     * @param question
     */
    isQuestionDone(question) {
        // null question are always done
        if (!question) return true;
        // questions without token can't be checked
        if (!question.token) return true;
        // check if question is active (disabled question are not required)
        if (question.active != null) if (!question.active(this.form)) return true;
        // check if answer is not null
        const answer = this.context.form.getValue(question.token);
        if (answer != null) return true;
        // required question can't have null value
        if (this.isRequiredQuestion(question)) return false;
        return true;
    }
}
exports.SurveyFlow = SurveyFlow;
//# sourceMappingURL=survey-flow.js.map