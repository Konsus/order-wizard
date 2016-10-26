"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
/** Wraps questions of the survey. */

var SurveyPage = function (_React$Component) {
    _inherits(SurveyPage, _React$Component);

    function SurveyPage() {
        _classCallCheck(this, SurveyPage);

        return _possibleConstructorReturn(this, (SurveyPage.__proto__ || Object.getPrototypeOf(SurveyPage)).apply(this, arguments));
    }

    _createClass(SurveyPage, [{
        key: "title",
        value: function title() {
            var title = this.props.title;
            if (title) return title;
            var questions = this.props.questions;
            if (questions && questions[0]) return questions[0].title;
            return null;
        }
    }, {
        key: "render",
        value: function render() {
            var title = this.title();
            return React.createElement("div", { key: this.props.id || title }, React.createElement("div", { className: "order-wizzard__step-title" }, title), React.createElement("div", { className: "order-wizzard__step-survey" }, this.props.children));
        }
    }]);

    return SurveyPage;
}(React.Component);

exports.SurveyPage = SurveyPage;
//# sourceMappingURL=SurveyPage.js.map