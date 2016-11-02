"use strict";
const keyName = "#keyID";
var keyUID = 0;
class Keys {
    static questionKey(question, define) {
        let key = question[keyName];
        if (typeof key !== "undefined")
            return key;
        if (!define)
            return null;
        Object.defineProperty(question, keyName, {
            enumerable: false,
            value: ++keyUID,
        });
        return keyUID;
    }
    static pageKey(question, define) {
        let key = question[keyName];
        if (typeof key !== "undefined")
            return key;
        if (!define)
            return null;
        Object.defineProperty(question, keyName, {
            enumerable: false,
            value: ++keyUID,
        });
        return keyUID;
    }
    static key(instance, define) {
        let key = instance[keyName];
        if (typeof key !== "undefined")
            return key;
        if (!define)
            return null;
        Object.defineProperty(instance, keyName, {
            enumerable: false,
            value: ++keyUID,
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
        if (key == null)
            return null;
        return this._questions[key];
    }
    removeQuestionView(question) {
        const key = Keys.key(question, false);
        if (key == null)
            return null;
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
        if (!page)
            return false;
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
    isRequiredQuestion(question) {
        // check question
        if (!question)
            return false;
        // check question setup
        if (question.required != null)
            return question.required;
        // check default survey options
        if (this.context.questionnaire.defaultRequired)
            return true;
        // not required by default
        return false;
    }
    isQuestionActive(question) {
        // null question are not active
        if (!question)
            return true;
        // questions without token can't be used
        if (!question.token)
            return true;
        // check if question is active
        if (question.active != null) {
            if (!question.active(this.form))
                return true;
        }
        return true;
    }
    /**
     * Whether question is answered or not required.
     * @param question
     */
    isQuestionDone(question) {
        // null question are always done
        if (!question)
            return true;
        // questions without token can't be checked
        if (!question.token)
            return true;
        // check if question is active (disabled question are not required)
        if (question.active != null)
            if (!question.active(this.form))
                return true;
        // check if answer is not null or empty
        const answer = this.context.form.getValue(question.token);
        if (answer != null && answer != "")
            return true;
        // required question can't have null value
        if (this.isRequiredQuestion(question))
            return false;
        return true;
    }
    joinQA() {
        const retVal = [];
        const form = this.form;
        const questionnaire = this.context.questionnaire;
        const pages = questionnaire.pages;
        for (let p = 0, pmax = pages.length; p < pmax; p++) {
            // do not include answers of disabled pages
            const page = pages[p];
            if (!this.isPageActive(page))
                continue;
            const questions = page.questions;
            for (let q = 0, qmax = questions.length; q < qmax; q++) {
                const question = questions[q];
                if (!question)
                    continue;
                // check question has token
                const token = question.token;
                if (!token)
                    continue;
                // skip empty answers
                const value = form.getValue(token);
                if (value == null || value == "")
                    continue;
                // choose label to display in summary view
                const label = this.selectAnswerLabel(question, value);
                const answer = {
                    token: token,
                    value: value,
                    label: label,
                };
                retVal.push({ question: question, answer: answer });
            }
        }
        return retVal;
    }
    selectOptionByValue(question, value) {
        const options = question.options;
        if (options == null)
            return null;
        // null or empty value can't have option
        if (value == null || value == "")
            return null;
        // check options with exact value
        for (let i = 0, imax = options.length; i < imax; i++) {
            const option = options[i];
            if (option == null)
                continue;
            if (option.value == value)
                return option;
        }
        return null;
    }
    selectAnswerLabel(question, value) {
        // choose label to display in summary view
        if (question.summary != null)
            return question.summary(value);
        // select option by concrete value match
        const option = this.selectOptionByValue(question, value);
        if (option != null) {
            if (option.label != null)
                return option.label;
            return option.value;
        }
        // maybe other?
        const other = question.other;
        if (other != null) {
            if (value == "other" || value == other.value)
                return other.label;
            if (other.label != null)
                return `${other.label}: ${value}`;
        }
        // unable to select any
        return null;
    }
}
exports.SurveyFlow = SurveyFlow;
//# sourceMappingURL=survey-flow.js.map