"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const core_decorators_1 = require("core-decorators");
class LoginPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = { userState: UserState.None };
    }
    register() {
        const form = {
            username: this.props.email,
            password: this.password.value,
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            company: this.companyName.value,
        };
        this.props.register(form).then(() => {
            this.moveNext();
        }).catch(e => {
            console.error(e);
        });
    }
    login() {
        const form = {
            username: this.email.value,
            password: this.password.value,
        };
        this.props.login(form).then(() => {
            this.moveNext();
        }).catch(e => {
            console.error(e);
        });
    }
    moveNext() {
        this.props.moveNext();
    }
    init(userState) {
        // move next page if logged in
        if (userState == UserState.LoggedIn) {
            this.moveNext();
            return;
        }
        this.setState(state => {
            state.userState = userState;
            return state;
        });
    }
    componentDidMount() {
        // initialize state
        this.props.isLoggedIn().then(loggedIn => {
            // move next page if logged in
            if (loggedIn) {
                this.init(UserState.LoggedIn);
                return;
            }
            // check whether user is new
            const username = this.props.email;
            return this.props.exists(username).then(exists => {
                this.init(exists ? UserState.Existing : UserState.New);
            });
        }).catch(e => {
            console.error(e);
            this.init(UserState.Existing);
        });
    }
    render() {
        switch (this.state.userState) {
            case UserState.None:
                return this.renderLoadingPage();
            case UserState.New:
                return this.renderSignUpPage();
            case UserState.Existing:
                return this.renderLoginPage();
        }
    }
    renderLoadingPage() {
        // TODO: show loading process
        return React.createElement("div", {className: "order-wizzard order-wizzard--login"});
    }
    renderSignUpPage() {
        return React.createElement("div", {className: "order-wizzard order-wizzard--login"}, 
            React.createElement("div", {className: "order-wizzard__header"}, 
                React.createElement("div", {className: "order-wizzard__title"}, "SUCCESS!"), 
                React.createElement("div", {className: "order-wizzard__sub-title"}, "Your quote will be with you shortly")), 
            React.createElement("div", {className: "order-wizzard__login"}, 
                React.createElement("header", null, 
                    "Meanwhile, can you please complete your profile so we are ", 
                    React.createElement("br", null), 
                    "ready to go if you approve the quote:"), 
                React.createElement("div", {className: "order-wizzard__login-form order-wizzard__login-form__next-step"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-md-6 col-xs-6"}, 
                                React.createElement("input", {type: "text", className: "form-control", ref: x => this.firstName = x, placeholder: "First name*"})
                            ), 
                            React.createElement("div", {className: "col-md-6 col-xs-6"}, 
                                React.createElement("input", {type: "text", className: "form-control", ref: x => this.lastName = x, placeholder: "Last name*"})
                            ))
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "text", className: "form-control", ref: x => this.companyName = x, placeholder: "Company name"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "password", className: "form-control", ref: x => this.password = x, placeholder: "Set a password*"})
                    ), 
                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-block", onClick: this.register}, "Submit"), 
                    React.createElement("p", null, "*Required"))));
    }
    renderLoginPage() {
        return React.createElement("div", {className: "order-wizzard order-wizzard--login"}, 
            React.createElement("div", {className: "order-wizzard__header"}, 
                React.createElement("div", {className: "order-wizzard__title"}, "Thank you!"), 
                React.createElement("div", {className: "order-wizzard__sub-title"}, "Please sign in and your quote will be with you shortly")), 
            React.createElement("div", {className: "order-wizzard__login"}, 
                React.createElement("div", {className: "order-wizzard__login-form"}, 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "email", className: "form-control", ref: x => this.email = x, defaultValue: this.props.email, placeholder: "Email"})
                    ), 
                    React.createElement("div", {className: "form-group"}, 
                        React.createElement("input", {type: "password", className: "form-control", ref: x => this.password = x, placeholder: "Password"})
                    ), 
                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-block", onClick: this.login}, " Log in"))
            ));
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], LoginPage.prototype, "register", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], LoginPage.prototype, "login", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], LoginPage.prototype, "moveNext", null);
exports.LoginPage = LoginPage;
(function (UserState) {
    UserState[UserState["None"] = 0] = "None";
    UserState[UserState["New"] = 1] = "New";
    UserState[UserState["Existing"] = 2] = "Existing";
    UserState[UserState["LoggedIn"] = 3] = "LoggedIn";
})(exports.UserState || (exports.UserState = {}));
var UserState = exports.UserState;
//# sourceMappingURL=LoginPage.js.map