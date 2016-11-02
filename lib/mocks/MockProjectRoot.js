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
const ProjectSurveyRoot_1 = require("../surveys/base/ProjectSurveyRoot");
const core_decorators_1 = require("core-decorators");
const ulrQuery = require('url-query');
const dummyToken = require('braintree-react/example/dummy-client-token');
class MockProjectRoot extends ProjectSurveyRoot_1.ProjectSurveyRoot {
    constructor(...args) {
        super(...args);
        this.state = {};
    }
    isLoggedIn() {
        console.log("isLoggedIn", this.state.loggedIn);
        return Promise.resolve(this.state.loggedIn);
    }
    exists(username) {
        console.log("exists", username, !this.state.newUser);
        return Promise.resolve(!this.state.newUser);
    }
    login(form) {
        console.log("login", form);
        return new Promise(resolve => {
            this.setState(state => {
                state.loggedIn = true;
                resolve();
                return state;
            });
        });
    }
    register(form) {
        console.log("register", form);
        return Promise.resolve();
    }
    hasPaymentMethod(nonce) {
        console.log("hasPaymentMethod", this.state.creditCard);
        return Promise.resolve(this.state.creditCard);
    }
    addPaymentMethod() {
        return Promise.resolve();
    }
    paymentToken() {
        console.log("paymentToken", dummyToken);
        return Promise.resolve(dummyToken);
    }
    getChildContext() {
        if (this.childContext == null)
            this.childContext = {
                isLoggedIn: this.isLoggedIn,
                exists: this.exists,
                login: this.login,
                register: this.register,
                hasPaymentMethod: this.hasPaymentMethod,
                addPaymentMethod: this.addPaymentMethod,
                paymentToken: this.paymentToken,
            };
        return this.childContext;
    }
    componentWillMount() {
        this.setState(state => {
            try {
                var query = ulrQuery();
                state.loggedIn = Boolean(query['logged_in']);
                state.newUser = Boolean(query['new_user']);
                state.creditCard = Boolean(query['credit_card']);
            }
            catch (e) {
            }
            return state;
        });
    }
    handleCheckBox(name, event) {
        console.log("CHANGE: " + event);
        event.persist();
        this.setState(state => {
            state[name] = event.target && event.target.checked;
            return state;
        });
    }
    render() {
        return React.createElement("div", null, 
            React.createElement("div", {style: { margin: 2 }}, 
                React.createElement("div", {className: "checkbox"}, 
                    React.createElement("label", null, 
                        " ", 
                        React.createElement("input", {type: "checkbox", defaultChecked: this.state.loggedIn, onChange: e => this.handleCheckBox("loggedIn", e)}), 
                        "Logged In")
                ), 
                React.createElement("div", {className: "checkbox"}, 
                    React.createElement("label", null, 
                        " ", 
                        React.createElement("input", {type: "checkbox", defaultChecked: this.state.newUser, onChange: e => this.handleCheckBox("newUser", e)}), 
                        "New User")
                ), 
                React.createElement("div", {className: "checkbox"}, 
                    React.createElement("label", null, 
                        " ", 
                        React.createElement("input", {type: "checkbox", defaultChecked: this.state.creditCard, onChange: e => this.handleCheckBox("creditCard", e)}), 
                        "Has Credit Card")
                )), 
            super.render());
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "isLoggedIn", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [String]), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "exists", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "login", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "register", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "hasPaymentMethod", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "addPaymentMethod", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', Promise)
], MockProjectRoot.prototype, "paymentToken", null);
exports.MockProjectRoot = MockProjectRoot;
//# sourceMappingURL=MockProjectRoot.js.map