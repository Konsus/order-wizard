"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keyName = "#keyID";
var keyUID = 0;

var Keys = function () {
    function Keys() {
        _classCallCheck(this, Keys);
    }

    _createClass(Keys, null, [{
        key: "questionKey",
        value: function questionKey(question, define) {
            var key = question[keyName];
            if (typeof key !== "undefined") return key;
            if (!define) return null;
            Object.defineProperty(question, keyName, {
                enumerable: false,
                value: ++keyUID
            });
            return keyUID;
        }
    }, {
        key: "pageKey",
        value: function pageKey(question, define) {
            var key = question[keyName];
            if (typeof key !== "undefined") return key;
            if (!define) return null;
            Object.defineProperty(question, keyName, {
                enumerable: false,
                value: ++keyUID
            });
            return keyUID;
        }
    }, {
        key: "key",
        value: function key(instance, define) {
            var key = instance[keyName];
            if (typeof key !== "undefined") return key;
            if (!define) return null;
            Object.defineProperty(instance, keyName, {
                enumerable: false,
                value: ++keyUID
            });
            return keyUID;
        }
    }]);

    return Keys;
}();

exports.Keys = Keys;

var SurveyFlow = function () {
    function SurveyFlow(context) {
        _classCallCheck(this, SurveyFlow);

        this.context = context;
        this._pages = {};
        this._questions = {};
    }

    _createClass(SurveyFlow, [{
        key: "setQuestionView",
        value: function setQuestionView(question, state) {
            var key = Keys.key(question, true);
            this._questions[key] = state;
        }
    }, {
        key: "getQuestionView",
        value: function getQuestionView(question) {
            var key = Keys.key(question, false);
            if (key == null) return null;
            return this._questions[key];
        }
    }, {
        key: "removeQuestionView",
        value: function removeQuestionView(question) {
            var key = Keys.key(question, false);
            if (key == null) return null;
            var state = this._questions[key];
            delete this._questions[key];
            return state;
        }
    }, {
        key: "setPageView",
        value: function setPageView(page, state) {
            var key = Keys.key(page, true);
            this._pages[key] = state;
        }
    }, {
        key: "getPageView",
        value: function getPageView(page) {
            var key = Keys.key(page, false);
            return key && this._pages[key];
        }
    }, {
        key: "isPageActive",
        value: function isPageActive(page) {
            // null pages should not be active
            if (!page) return false;
            // check embedded
            if (page.active) if (!page.active(this.context.form)) return false;
            // check state
            var state = this.getPageView(page);
            if (state && state.active) if (!state.active(page)) return false;
            // active by default
            return true;
        }
    }, {
        key: "isRequiredQuestion",
        value: function isRequiredQuestion(question) {
            // check question
            if (!question) return false;
            // check question setup
            if (question.required != null) return question.required;
            // check default survey options
            if (this.context.questionnaire.defaultRequired) return true;
            // not required by default
            return false;
        }
    }, {
        key: "isQuestionActive",
        value: function isQuestionActive(question) {
            // null question are not active
            if (!question) return true;
            // questions without token can't be used
            if (!question.token) return true;
            // check if question is active
            if (question.active != null) {
                if (!question.active(this.form)) return true;
            }
            return true;
        }
        /**
         * Whether question is answered or not required.
         * @param question
         */

    }, {
        key: "isQuestionDone",
        value: function isQuestionDone(question) {
            // null question are always done
            if (!question) return true;
            // questions without token can't be checked
            if (!question.token) return true;
            // check if question is active (disabled question are not required)
            if (question.active != null) if (!question.active(this.form)) return true;
            // check if answer is not null or empty
            var answer = this.context.form.getValue(question.token);
            if (answer != null && answer != "") return true;
            // required question can't have null value
            if (this.isRequiredQuestion(question)) return false;
            return true;
        }
    }, {
        key: "joinQA",
        value: function joinQA() {
            var retVal = [];
            var form = this.form;
            var questionnaire = this.context.questionnaire;
            var pages = questionnaire.pages;
            for (var p = 0, pmax = pages.length; p < pmax; p++) {
                // do not include answers of disabled pages
                var page = pages[p];
                if (!this.isPageActive(page)) continue;
                var questions = page.questions;
                for (var q = 0, qmax = questions.length; q < qmax; q++) {
                    var question = questions[q];
                    if (!question) continue;
                    // check question has token
                    var token = question.token;
                    if (!token) continue;
                    // skip empty answers
                    var value = form.getValue(token);
                    if (value == null || value == "") continue;
                    // choose label to display in summary view
                    var label = this.selectAnswerLabel(question, value);
                    var answer = {
                        token: token,
                        value: value,
                        label: label
                    };
                    retVal.push({ question: question, answer: answer });
                }
            }
            return retVal;
        }
    }, {
        key: "selectOptionByValue",
        value: function selectOptionByValue(question, value) {
            var options = question.options;
            if (options == null) return null;
            // null or empty value can't have option
            if (value == null || value == "") return null;
            // check options with exact value
            for (var i = 0, imax = options.length; i < imax; i++) {
                var option = options[i];
                if (option == null) continue;
                if (option.value == value) return option;
            }
            return null;
        }
    }, {
        key: "selectAnswerLabel",
        value: function selectAnswerLabel(question, value) {
            // choose label to display in summary view
            if (question.summary != null) return question.summary(value);
            // select option by concrete value match
            var option = this.selectOptionByValue(question, value);
            if (option != null) {
                if (option.label != null) return option.label;
                return option.value;
            }
            // maybe other?
            var other = question.other;
            if (other != null) {
                if (value == "other" || value == other.value) return other.label;
                if (other.label != null) return other.label + ": " + value;
            }
            // unable to select any
            return null;
        }
    }, {
        key: "form",
        get: function get() {
            return this.context.form;
        }
    }, {
        key: "questionnaire",
        get: function get() {
            return this.context.questionnaire;
        }
    }]);

    return SurveyFlow;
}();

exports.SurveyFlow = SurveyFlow;
//# sourceMappingURL=survey-flow.js.map