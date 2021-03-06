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
require("braintree-web");
var React = require("react");
var core_decorators_1 = require("core-decorators");
var braintree = require('braintree-web');
var DropIn = require('braintree-react').DropIn;

var CreditCardPage = function (_React$Component) {
    _inherits(CreditCardPage, _React$Component);

    function CreditCardPage() {
        var _ref;

        _classCallCheck(this, CreditCardPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = CreditCardPage.__proto__ || Object.getPrototypeOf(CreditCardPage)).call.apply(_ref, [this].concat(args)));

        _this.state = {};
        return _this;
    }

    _createClass(CreditCardPage, [{
        key: "moveNext",
        value: function moveNext() {
            this.props.moveNext();
        }
    }, {
        key: "submitCreditCard",
        value: function submitCreditCard(opt) {
            var _this2 = this;

            this.props.addPaymentMethod(opt.nonce).then(function () {
                _this2.moveNext();
            }).catch(function (err) {
                return alert(err.response.body.message);
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this.props.hasPaymentMethod().then(function (hasPaymentMethod) {
                // move next page if already has payment method
                if (hasPaymentMethod) {
                    _this3.moveNext();
                    return;
                }
                // require token to initialize braintree
                return _this3.props.paymentToken().then(function (token) {
                    _this3.setState(function (state) {
                        state.token = token;
                        return state;
                    });
                });
            }).catch(function (e) {
                console.error(e);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var token = this.state.token;
            var loading = token == null || token == "";
            var view = loading ? this.renderLoading() : this.renderView();
            return React.createElement("div", { className: "order-wizzard" }, view);
        }
    }, {
        key: "renderView",
        value: function renderView() {
            var token = this.state.token;
            return React.createElement("div", null, React.createElement("div", { className: "order-wizzard__header" }, React.createElement("div", { className: "order-wizzard__sub-title" }, "Add your credit card details so we are ready to go if you approve the quote.")), React.createElement("form", { style: { margin: '20px' } }, React.createElement(DropIn, { braintree: braintree, clientToken: token, onPaymentMethodReceived: this.submitCreditCard }), React.createElement("br", null), React.createElement("button", { type: "submit", style: { width: '80%', margin: 'auto' }, className: "btn btn-primary btn-block" }, " Submit"), React.createElement("br", null), React.createElement("button", { type: "submit", style: { width: '80%', margin: 'auto' }, className: "btn btn-default btn-block", onClick: this.moveNext }, " Later")));
        }
    }, {
        key: "renderLoading",
        value: function renderLoading() {
            // TODO: show loading
            return React.createElement("div", null, "loading...");
        }
    }]);

    return CreditCardPage;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], CreditCardPage.prototype, "moveNext", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], CreditCardPage.prototype, "submitCreditCard", null);
exports.CreditCardPage = CreditCardPage;
//# sourceMappingURL=CreditCardPage.js.map