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