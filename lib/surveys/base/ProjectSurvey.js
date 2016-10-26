"use strict";

var _ProjectSurvey$contex;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var core_decorators_1 = require("core-decorators");
var SurveyView_1 = require("../../components/views/SurveyView");
var SelectionControl_1 = require("../../components/controls/SelectionControl");
var LoginPage_1 = require('../views/LoginPage');
var CreditCardPage_1 = require('../views/CreditCardPage');
var ctx = null;
/** Base type for project creation survey, provides intro page. */

var ProjectSurvey = function (_SurveyView_1$SurveyV) {
    _inherits(ProjectSurvey, _SurveyView_1$SurveyV);

    function ProjectSurvey() {
        var _ref;

        _classCallCheck(this, ProjectSurvey);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ProjectSurvey.__proto__ || Object.getPrototypeOf(ProjectSurvey)).call.apply(_ref, [this].concat(args)));

        _this.props.flow.form.onPropertyChanged.attach(_this, _this.onFormPropertyChanged);
        _this.resetSurvey(_this.state);
        return _this;
    }

    _createClass(ProjectSurvey, [{
        key: "getChildContext",
        value: function getChildContext() {
            return this.props.flow.context;
        }
        /** Move from initial page to actual survey. */

    }, {
        key: "startSurvey",
        value: function startSurvey() {
            this.moveNext();
        }
    }, {
        key: "canMoveNext",
        value: function canMoveNext() {
            if (_get(ProjectSurvey.prototype.__proto__ || Object.getPrototypeOf(ProjectSurvey.prototype), "canMoveNext", this).call(this)) return true;
            return this.state.pageType < ProjectSurveyPageType.Success;
        }
    }, {
        key: "moveNext",
        value: function moveNext() {
            var _this2 = this;

            if (!this.state.isPageDone) return false;

            var _ret = function () {
                switch (_this2.state.pageType) {
                    case ProjectSurveyPageType.Intro:
                        _this2.setState(function (state) {
                            _this2.resetSurvey(state);
                            state.pageID = _this2.selectNextPageID(_this2.state.pageID);
                            state.pageType += 1;
                            return state;
                        });
                        return {
                            v: true
                        };
                    case ProjectSurveyPageType.Survey:
                        if (!_this2.isPageDone(_this2.state.pageID)) return {
                                v: false
                            };
                        var nextPageID = _this2.selectNextPageID(_this2.state.pageID);
                        _this2.setState(function (state) {
                            if (nextPageID >= 0) {
                                state.step++;
                                state.pageID = nextPageID;
                                state.activeSteps = _this2.countActiveSteps();
                            } else {
                                state.pageType += 1;
                            }
                            return state;
                        });
                        return {
                            v: true
                        };
                    case ProjectSurveyPageType.Summary:
                    case ProjectSurveyPageType.Login:
                    case ProjectSurveyPageType.CreditCard:
                        _this2.setState(function (state) {
                            state.pageType += 1;
                            return state;
                        });
                        return {
                            v: true
                        };
                    default:
                        return {
                            v: false
                        };
                }
            }();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
    }, {
        key: "moveBack",
        value: function moveBack() {
            var _this3 = this;

            var _ret2 = function () {
                switch (_this3.state.pageType) {
                    case ProjectSurveyPageType.Intro:
                        return {
                            v: false
                        };
                    case ProjectSurveyPageType.Survey:
                        var prevPageID = _this3.selectPrevPageID(_this3.state.pageID);
                        if (prevPageID >= 0) {
                            _this3.setState(function (state) {
                                state.step--;
                                state.pageID = prevPageID;
                                return state;
                            });
                        } else {
                            _this3.setState(function (state) {
                                state.pageType -= 1;
                                return state;
                            });
                        }
                        return {
                            v: true
                        };
                    case ProjectSurveyPageType.Summary:
                    case ProjectSurveyPageType.Login:
                    case ProjectSurveyPageType.CreditCard:
                        _this3.setState(function (state) {
                            state.pageType -= 1;
                            return state;
                        });
                        return {
                            v: true
                        };
                }
            }();

            if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
            return false;
        }
    }, {
        key: "resetSurvey",
        value: function resetSurvey(state) {
            _get(ProjectSurvey.prototype.__proto__ || Object.getPrototypeOf(ProjectSurvey.prototype), "resetSurvey", this).call(this, state);
            state.pageID = -1;
            state.isPageDone = true;
            state.pageType = ProjectSurveyPageType.Intro;
        }
    }, {
        key: "startProject",
        value: function startProject() {
            console.log("START PROJECT: ", JSON.stringify(this.props.flow.form));
        }
    }, {
        key: "isPageDone",
        value: function isPageDone(pageID) {
            // done by default if no pages
            var flow = this.props.flow;
            var pages = flow.questionnaire.pages;
            if (pages instanceof Array == false) if (pages == null) return true;
            // page is out of range
            if (pageID < 0) return true;
            if (pageID >= pages.length) return true;
            // not done if any question is not done
            var page = pages[pageID];
            var questions = page.questions;
            for (var i = 0; i < questions.length; i++) {
                if (!flow.isQuestionDone(questions[i])) return false;
            }return true;
        }
    }, {
        key: "onFormPropertyChanged",
        value: function onFormPropertyChanged(key) {
            this.forceUpdate();
        }
    }, {
        key: "countActiveSteps",
        value: function countActiveSteps() {
            var flow = this.props.flow;
            var pages = flow.questionnaire.pages;
            if (pages instanceof Array == false) return 0;
            var counter = 0;
            for (var i = 0; i < pages.length; i++) {
                if (flow.isPageActive(pages[i])) counter++;
            }return counter;
        }
    }, {
        key: "selectNextPageID",
        value: function selectNextPageID(pageID) {
            var flow = this.props.flow;
            var pages = flow.questionnaire.pages;
            if (!pages) return -1;
            for (var i = Math.max(0, pageID + 1), max = pages.length; i < max; i++) {
                var page = pages[i];
                if (flow.isPageActive(page)) return i;
            }
            return -1;
        }
    }, {
        key: "selectPrevPageID",
        value: function selectPrevPageID(pageID) {
            var flow = this.props.flow;
            var pages = flow.questionnaire.pages;
            if (!pages || pageID < 0) return -1;
            for (var i = Math.min(pageID - 1, pages.length); i >= 0; i--) {
                var page = pages[i];
                if (flow.isPageActive(page)) return i;
            }
            return -1;
        }
    }, {
        key: "renderQuestionPage",
        value: function renderQuestionPage() {
            var questionnaire = this.props.flow.questionnaire;
            var page = questionnaire.pages[this.state.pageID];
            var state = this.props.flow.getPageView(page);
            if (state && state.render) return state.render(page);
            console.error("Page doesn't not provide render function!");
            this.moveNext();
            return null;
        }
        /** Render summary of the survey answers. */

    }, {
        key: "renderSurveySummary",
        value: function renderSurveySummary() {
            return null;
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
            nextState.isPageDone = this.isPageDone(nextState.pageID);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            switch (this.state.pageType) {
                case ProjectSurveyPageType.Intro:
                    return this.renderIntroPage();
                case ProjectSurveyPageType.Survey:
                    return _get(ProjectSurvey.prototype.__proto__ || Object.getPrototypeOf(ProjectSurvey.prototype), "render", this).call(this);
                case ProjectSurveyPageType.Summary:
                    return this.renderSummaryPage();
                case ProjectSurveyPageType.Login:
                    return React.createElement(LoginPage_1.LoginPage, __assign({}, this.context, { moveNext: function moveNext() {
                            return _this4.moveNext();
                        } }));
                case ProjectSurveyPageType.CreditCard:
                    return React.createElement(CreditCardPage_1.CreditCardPage, __assign({}, this.context, { moveNext: function moveNext() {
                            return _this4.moveNext();
                        } }));
                case ProjectSurveyPageType.Success:
                    return this.renderSuccessPage();
            }
        }
    }, {
        key: "renderIntroPage",
        value: function renderIntroPage() {
            var _this5 = this;

            return React.createElement("div", { className: "order-wizzard-cover" }, React.createElement("div", { className: "order-wizzard-cover__logo" }), React.createElement("div", { className: "order-wizzard-cover__info" }, React.createElement("p", null, "We’re asking you a few questions to understand what we can do for you."), React.createElement("p", null, "We will then come back to you with a quote – and you decide whether we should get started!")), React.createElement("div", { className: "order-wizzard-cover__next" }, React.createElement("a", { href: "#", className: "b-button", onClick: function onClick() {
                    return _this5.startSurvey();
                } }, "Next")));
        }
    }, {
        key: "renderSummaryPage",
        value: function renderSummaryPage() {
            var _this6 = this;

            return React.createElement("div", { className: "order-wizzard" }, React.createElement("div", { className: "order-wizzard__step-title" }, "Summary of your task!"), React.createElement("div", { className: "order-wizzard__step-survey" }, React.createElement("div", { className: "order-wizzard__summary" }, this.renderSurveySummary(), React.createElement("ul", { className: "order-wizzard__summary-list" }, React.createElement("li", null, "Some text here"), React.createElement("li", null, "And here")))), React.createElement("div", { className: "order-wizzard__controls clearfix" }, React.createElement("div", { className: "order-wizzard__back pull-left" }, React.createElement("a", { onClick: function onClick() {
                    return _this6.moveBack();
                }, href: "#", className: "b-button b-button--transparent" }, React.createElement("span", { className: "b-button__icon-arrow" }), " Back")), React.createElement("div", { className: "order-wizzard__next pull-right" }, this.renderSummaryPageNextButton())));
        }
    }, {
        key: "renderSummaryPageNextButton",
        value: function renderSummaryPageNextButton() {
            var _this7 = this;

            var loggedIn = true;
            var label = loggedIn ? "Submit" : "Next";
            return React.createElement("div", { className: "order-wizzard__cta text-center" }, React.createElement("a", { href: "#", className: "b-button b-button--blue", onClick: function onClick() {
                    return _this7.moveNext();
                } }, label));
        }
    }, {
        key: "renderSuccessPage",
        value: function renderSuccessPage() {
            return React.createElement("div", { className: "order-wizzard order-wizzard--login" }, React.createElement("div", { className: "order-wizzard__header" }, React.createElement("div", { className: "order-wizzard__title" }, "SUCCESS!"), React.createElement("div", { className: "order-wizzard__sub-title" }, "Your quote will be with you shortly")));
        }
    }]);

    return ProjectSurvey;
}(SurveyView_1.SurveyView);

ProjectSurvey.contextTypes = (_ProjectSurvey$contex = {}, _defineProperty(_ProjectSurvey$contex, "isLoggedIn", React.PropTypes.func.isRequired), _defineProperty(_ProjectSurvey$contex, "exists", React.PropTypes.func.isRequired), _defineProperty(_ProjectSurvey$contex, "login", React.PropTypes.func.isRequired), _defineProperty(_ProjectSurvey$contex, "register", React.PropTypes.func.isRequired), _defineProperty(_ProjectSurvey$contex, "hasPaymentMethod", React.PropTypes.func.isRequired), _defineProperty(_ProjectSurvey$contex, "paymentToken", React.PropTypes.func.isRequired), _ProjectSurvey$contex);
ProjectSurvey.childContextTypes = SelectionControl_1.SelectionControl.contextTypes;
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], ProjectSurvey.prototype, "startProject", null);
exports.ProjectSurvey = ProjectSurvey;
(function (ProjectSurveyPageType) {
    /** Intro page with start survey button. */
    ProjectSurveyPageType[ProjectSurveyPageType["Intro"] = 1] = "Intro";
    /** Actual survey pages */
    ProjectSurveyPageType[ProjectSurveyPageType["Survey"] = 2] = "Survey";
    /** Summary page with results of survey and submission button. */
    ProjectSurveyPageType[ProjectSurveyPageType["Summary"] = 3] = "Summary";
    ProjectSurveyPageType[ProjectSurveyPageType["Login"] = 4] = "Login";
    ProjectSurveyPageType[ProjectSurveyPageType["CreditCard"] = 5] = "CreditCard";
    ProjectSurveyPageType[ProjectSurveyPageType["Success"] = 6] = "Success";
})(exports.ProjectSurveyPageType || (exports.ProjectSurveyPageType = {}));
var ProjectSurveyPageType = exports.ProjectSurveyPageType;
//# sourceMappingURL=ProjectSurvey.js.map