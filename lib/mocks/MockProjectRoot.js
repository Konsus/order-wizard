"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
var ProjectSurveyRoot_1 = require("../surveys/base/ProjectSurveyRoot");
var core_decorators_1 = require("core-decorators");
var ulrQuery = require('url-query');
var dummyToken = require('braintree-react/example/dummy-client-token');

var MockProjectRoot = function (_ProjectSurveyRoot_1$) {
    _inherits(MockProjectRoot, _ProjectSurveyRoot_1$);

    function MockProjectRoot() {
        var _ref;

        _classCallCheck(this, MockProjectRoot);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = MockProjectRoot.__proto__ || Object.getPrototypeOf(MockProjectRoot)).call.apply(_ref, [this].concat(args)));

        _this.state = {};
        return _this;
    }

    _createClass(MockProjectRoot, [{
        key: "isLoggedIn",
        value: function isLoggedIn() {
            console.log("isLoggedIn", this.state.loggedIn);
            return Promise.resolve(this.state.loggedIn);
        }
    }, {
        key: "exists",
        value: function exists(username) {
            console.log("exists", username, !this.state.newUser);
            return Promise.resolve(!this.state.newUser);
        }
    }, {
        key: "login",
        value: function login(form) {
            var _this2 = this;

            console.log("login", form);
            return new Promise(function (resolve) {
                _this2.setState(function (state) {
                    state.loggedIn = true;
                    resolve();
                    return state;
                });
            });
        }
    }, {
        key: "register",
        value: function register(form) {
            console.log("register", form);
            return Promise.resolve();
        }
    }, {
        key: "hasPaymentMethod",
        value: function hasPaymentMethod() {
            console.log("hasPaymentMethod", this.state.creditCard);
            return Promise.resolve(this.state.creditCard);
        }
    }, {
        key: "paymentToken",
        value: function paymentToken() {
            console.log("paymentToken", dummyToken);
            return Promise.resolve(dummyToken);
        }
    }, {
        key: "getChildContext",
        value: function getChildContext() {
            if (this.childContext == null) this.childContext = {
                isLoggedIn: this.isLoggedIn,
                exists: this.exists,
                login: this.login,
                register: this.register,
                hasPaymentMethod: this.hasPaymentMethod,
                paymentToken: this.paymentToken
            };
            return this.childContext;
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setState(function (state) {
                try {
                    var query = ulrQuery();
                    state.loggedIn = Boolean(query['logged_in']);
                    state.newUser = Boolean(query['new_user']);
                    state.creditCard = Boolean(query['credit_card']);
                } catch (e) {}
                return state;
            });
        }
    }, {
        key: "handleCheckBox",
        value: function handleCheckBox(name, event) {
            console.log("CHANGE: " + event);
            event.persist();
            this.setState(function (state) {
                state[name] = event.target && event.target.checked;
                return state;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement("div", null, React.createElement("div", { style: { margin: 2 } }, React.createElement("div", { className: "checkbox" }, React.createElement("label", null, " ", React.createElement("input", { type: "checkbox", defaultChecked: this.state.loggedIn, onChange: function onChange(e) {
                    return _this3.handleCheckBox("loggedIn", e);
                } }), "Logged In")), React.createElement("div", { className: "checkbox" }, React.createElement("label", null, " ", React.createElement("input", { type: "checkbox", defaultChecked: this.state.newUser, onChange: function onChange(e) {
                    return _this3.handleCheckBox("newUser", e);
                } }), "New User")), React.createElement("div", { className: "checkbox" }, React.createElement("label", null, " ", React.createElement("input", { type: "checkbox", defaultChecked: this.state.creditCard, onChange: function onChange(e) {
                    return _this3.handleCheckBox("creditCard", e);
                } }), "Has Credit Card"))), _get(MockProjectRoot.prototype.__proto__ || Object.getPrototypeOf(MockProjectRoot.prototype), "render", this).call(this));
        }
    }]);

    return MockProjectRoot;
}(ProjectSurveyRoot_1.ProjectSurveyRoot);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Promise)], MockProjectRoot.prototype, "isLoggedIn", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', Promise)], MockProjectRoot.prototype, "exists", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', Promise)], MockProjectRoot.prototype, "login", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', Promise)], MockProjectRoot.prototype, "register", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Promise)], MockProjectRoot.prototype, "hasPaymentMethod", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', Promise)], MockProjectRoot.prototype, "paymentToken", null);
exports.MockProjectRoot = MockProjectRoot;
//# sourceMappingURL=MockProjectRoot.js.map