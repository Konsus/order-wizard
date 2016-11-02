"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
/**
 * Base type for any type of survey.
 */

var SurveyView = function (_React$Component) {
    _inherits(SurveyView, _React$Component);

    function SurveyView() {
        var _ref;

        _classCallCheck(this, SurveyView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SurveyView.__proto__ || Object.getPrototypeOf(SurveyView)).call.apply(_ref, [this].concat(args)));

        _this.state = {};
        _this.state.isPageDone = true;
        return _this;
    }
    /** Get normalized value of the survey progress [0-1]. */


    _createClass(SurveyView, [{
        key: "progress",
        value: function progress() {
            return this.state.step / this.state.activeSteps;
        }
        /** Whether survey is complete and ready for submission. */

    }, {
        key: "isComplete",
        value: function isComplete() {
            return !this.canMoveNext();
        }
        /** Whether has any next survey step. */

    }, {
        key: "canMoveNext",
        value: function canMoveNext() {
            return this.state.step < this.countActiveSteps();
        }
        /**
         * Try move to previous survey step if possible.
         * @returns {boolean} true on success; otherwise false.
         */

    }, {
        key: "moveNext",
        value: function moveNext() {
            var _this2 = this;

            if (this.state.step >= this.countActiveSteps()) return false;
            this.setState(function (state) {
                state.activeSteps = _this2.countActiveSteps();
                state.step++;
                return state;
            });
            return true;
        }
        /**
         * Try move to previous survey step if possible.
         * @returns {boolean} true on success; otherwise false.
         */

    }, {
        key: "moveBack",
        value: function moveBack() {
            if (this.state.step <= 1) return false;
            this.setState(function (state) {
                state.step--;
                return state;
            });
            return true;
        }
        /** Reset survey to first step. */

    }, {
        key: "resetSurvey",
        value: function resetSurvey(state) {
            state.step = 1;
            state.activeSteps = this.countActiveSteps();
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.resetSurvey(this.state);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.step === 0) return null;
            return React.createElement("div", { className: "order-wizzard" }, React.createElement("div", { className: "order-wizzard__progress" }, React.createElement(react_bootstrap_1.ProgressBar, { now: this.progress() * 100 })), React.createElement("div", { className: "order-wizzard__step" }, this.renderQuestionPage()), React.createElement("div", { className: "order-wizzard__controls clearfix" }, React.createElement("div", { className: "order-wizzard__back pull-left" }, React.createElement("a", { onClick: function onClick() {
                    return _this3.moveBack();
                }, href: "#", className: "b-button b-button--transparent" }, React.createElement("span", { className: "b-button__icon-arrow" }), " Back")), React.createElement("div", { className: "order-wizzard__next pull-right" }, this.renderMoveNext())));
        }
    }, {
        key: "renderMoveNext",
        value: function renderMoveNext() {
            var _this4 = this;

            if (!this.canMoveNext()) return null;
            if (this.state.isPageDone) return React.createElement("a", { onClick: function onClick() {
                    return _this4.moveNext();
                }, href: "#", className: "b-button b-button--blue" }, "Next");
            return React.createElement("a", { href: "#", className: "b-button b-button--blue b-button--deactive" }, "Next");
        }
    }]);

    return SurveyView;
}(React.Component);

exports.SurveyView = SurveyView;
//# sourceMappingURL=SurveyView.js.map