"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var validator = require("email-validator");

var SummaryPage = function (_React$Component) {
    _inherits(SummaryPage, _React$Component);

    function SummaryPage() {
        var _ref;

        _classCallCheck(this, SummaryPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SummaryPage.__proto__ || Object.getPrototypeOf(SummaryPage)).call.apply(_ref, [this].concat(args)));

        _this.state = { validEmail: false };
        return _this;
    }

    _createClass(SummaryPage, [{
        key: "moveNext",
        value: function moveNext() {
            if (!this.validEmail()) return;
            var email = this.state.loggedIn ? null : this.email.value;
            this.props.moveNext(email);
        }
    }, {
        key: "validEmail",
        value: function validEmail() {
            var validEmail = this.email && this.email.value && validator.validate(this.email.value);
            this.setState({ validEmail: validEmail });
            return validEmail;
        }
    }, {
        key: "moveBack",
        value: function moveBack() {
            return this.props.moveBack();
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.props.isLoggedIn().then(function (loggedIn) {
                _this2.setState({ loggedIn: loggedIn });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "order-wizzard" }, React.createElement("div", { className: "order-wizzard__step-title" }, "Summary of your task!"), React.createElement("div", { className: "order-wizzard__step-survey" }, React.createElement("div", { className: "order-wizzard__summary" }, React.createElement("ul", { className: "order-wizzard__summary-list" }, this.renderAnswers()))), React.createElement("div", { className: "order-wizzard__controls clearfix" }, React.createElement("div", { className: "order-wizzard__back pull-left" }, React.createElement("a", { onClick: this.moveBack, href: "#", className: "b-button b-button--transparent" }, React.createElement("span", { className: "b-button__icon-arrow" }), " Back")), React.createElement("div", { className: "order-wizzard__next" }, this.renderNextButton())));
        }
    }, {
        key: "renderNextButton",
        value: function renderNextButton() {
            var _this3 = this;

            var loggedIn = this.state.loggedIn;
            var label = loggedIn ? "Submit" : "Next";
            return React.createElement("div", { className: "order-wizzard__cta text-center" }, React.createElement("div", { className: "row" }, loggedIn ? React.createElement("a", { href: "#", className: "b-button b-button--blue", onClick: this.moveNext }, label) : React.createElement("div", null, React.createElement("div", { className: "form-inline order-wizzard__email-sender" }, React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "text", className: "form-control", ref: function ref(x) {
                    return _this3.email = x;
                }, onKeyDown: function onKeyDown() {
                    _this3.validEmail();
                }, placeholder: "Enter your email" })), React.createElement("div", { className: "form-group" }, React.createElement("a", { href: "#", className: "btn btn-primary", style: !this.state.validEmail ? { opacity: 0.7 } : {}, onClick: this.moveNext }, label))), React.createElement("br", null), React.createElement("p", { className: "text-primary text-center" }, "Strictly confidential, no commitments"))));
        }
    }, {
        key: "renderAnswers",
        value: function renderAnswers() {
            var flow = this.props.flow;
            var qa = flow.joinQA();
            return qa.map(function (item) {
                var label = item.answer.label;
                if (label == null) return null;
                return React.createElement("li", { key: item.answer.token }, label);
            });
        }
    }]);

    return SummaryPage;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SummaryPage.prototype, "moveNext", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SummaryPage.prototype, "validEmail", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SummaryPage.prototype, "moveBack", null);
exports.SummaryPage = SummaryPage;
//# sourceMappingURL=SummaryPage.js.map