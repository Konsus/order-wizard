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

var LoginPage = function (_React$Component) {
    _inherits(LoginPage, _React$Component);

    function LoginPage() {
        var _ref;

        _classCallCheck(this, LoginPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call.apply(_ref, [this].concat(args)));

        _this.state = { userState: UserState.None };
        return _this;
    }

    _createClass(LoginPage, [{
        key: "register",
        value: function register() {
            var _this2 = this;

            var form = {
                username: this.props.email,
                password: this.password.value,
                firstName: this.firstName.value,
                lastName: this.lastName.value
            };
            this.props.register(form).then(function () {
                _this2.moveNext();
            }).catch(function (e) {
                console.error(e);
            });
        }
    }, {
        key: "login",
        value: function login() {
            var _this3 = this;

            var form = {
                username: this.email.value,
                password: this.password.value
            };
            this.props.login(form).then(function () {
                _this3.moveNext();
            }).catch(function (e) {
                console.error(e);
            });
        }
    }, {
        key: "moveNext",
        value: function moveNext() {
            this.props.moveNext();
        }
    }, {
        key: "init",
        value: function init(userState) {
            // move next page if logged in
            if (userState == UserState.LoggedIn) {
                this.moveNext();
                return;
            }
            this.setState(function (state) {
                state.userState = userState;
                return state;
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            // initialize state
            this.props.isLoggedIn().then(function (loggedIn) {
                // move next page if logged in
                if (loggedIn) {
                    _this4.init(UserState.LoggedIn);
                    return;
                }
                // check whether user is new
                var username = _this4.props.email;
                return _this4.props.exists(username).then(function (exists) {
                    _this4.init(exists ? UserState.Existing : UserState.New);
                });
            }).catch(function (e) {
                console.error(e);
                _this4.init(UserState.Existing);
            });
        }
    }, {
        key: "render",
        value: function render() {
            switch (this.state.userState) {
                case UserState.None:
                    return this.renderLoadingPage();
                case UserState.New:
                    return this.renderSignUpPage();
                case UserState.Existing:
                    return this.renderLoginPage();
            }
        }
    }, {
        key: "renderLoadingPage",
        value: function renderLoadingPage() {
            // TODO: show loading process
            return React.createElement("div", { className: "order-wizzard order-wizzard--login" });
        }
    }, {
        key: "renderSignUpPage",
        value: function renderSignUpPage() {
            var _this5 = this;

            return React.createElement("div", { className: "order-wizzard order-wizzard--login" }, React.createElement("div", { className: "order-wizzard__header" }, React.createElement("div", { className: "order-wizzard__title" }, "SUCCESS!"), React.createElement("div", { className: "order-wizzard__sub-title" }, "Your quote will be with you shortly")), React.createElement("div", { className: "order-wizzard__login" }, React.createElement("header", null, "Meanwhile, can you please complete your profile so we are ", React.createElement("br", null), "ready to go if you approve the quote:"), React.createElement("div", { className: "order-wizzard__login-form order-wizzard__login-form__next-step" }, React.createElement("div", { className: "form-group" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "col-md-6 col-xs-6" }, React.createElement("input", { type: "text", className: "form-control", ref: function ref(x) {
                    return _this5.firstName = x;
                }, placeholder: "First name*" })), React.createElement("div", { className: "col-md-6 col-xs-6" }, React.createElement("input", { type: "text", className: "form-control", ref: function ref(x) {
                    return _this5.lastName = x;
                }, placeholder: "Last name*" })))), React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "text", className: "form-control", ref: function ref(x) {
                    return _this5.companyName = x;
                }, placeholder: "Company name" })), React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "password", className: "form-control", ref: function ref(x) {
                    return _this5.password = x;
                }, placeholder: "Set a password*" })), React.createElement("button", { type: "submit", className: "btn btn-primary btn-block", onClick: this.register }, "Submit"), React.createElement("p", null, "*Required"))));
        }
    }, {
        key: "renderLoginPage",
        value: function renderLoginPage() {
            var _this6 = this;

            return React.createElement("div", { className: "order-wizzard order-wizzard--login" }, React.createElement("div", { className: "order-wizzard__header" }, React.createElement("div", { className: "order-wizzard__title" }, "Thank you!"), React.createElement("div", { className: "order-wizzard__sub-title" }, "Please sign in and your quote will be with you shortly")), React.createElement("div", { className: "order-wizzard__login" }, React.createElement("div", { className: "order-wizzard__login-form" }, React.createElement("form", { onSubmit: this.login }, React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "email", className: "form-control", ref: function ref(x) {
                    return _this6.email = x;
                }, placeholder: "Email" })), React.createElement("div", { className: "form-group" }, React.createElement("input", { type: "password", className: "form-control", ref: function ref(x) {
                    return _this6.password = x;
                }, placeholder: "Password" })), React.createElement("div", { className: "form-group" }, React.createElement("a", { href: "#" }, "Forgot password?")), React.createElement("button", { type: "submit", className: "btn btn-primary btn-block", onClick: this.login }, " Log in")))));
        }
    }]);

    return LoginPage;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], LoginPage.prototype, "register", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], LoginPage.prototype, "login", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], LoginPage.prototype, "moveNext", null);
exports.LoginPage = LoginPage;
(function (UserState) {
    UserState[UserState["None"] = 0] = "None";
    UserState[UserState["New"] = 1] = "New";
    UserState[UserState["Existing"] = 2] = "Existing";
    UserState[UserState["LoggedIn"] = 3] = "LoggedIn";
})(exports.UserState || (exports.UserState = {}));
var UserState = exports.UserState;
//# sourceMappingURL=LoginPage.js.map