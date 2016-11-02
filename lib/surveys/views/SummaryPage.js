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
var validator = require("email-validator");
class SummaryPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = { validEmail: false };
    }
    moveNext() {
        if (!this.validEmail())
            return;
        const email = this.state.loggedIn ? null : this.email.value;
        this.props.moveNext(email);
    }
    validEmail() {
        var validEmail = this.email && this.email.value && validator.validate(this.email.value);
        this.setState({ validEmail: validEmail });
        return validEmail;
    }
    moveBack() { return this.props.moveBack(); }
    componentWillMount() {
        this.props.isLoggedIn().then(loggedIn => {
            this.setState({ loggedIn: loggedIn });
        });
    }
    render() {
        return React.createElement("div", {className: "order-wizzard"}, 
            React.createElement("div", {className: "order-wizzard__step-title"}, "Summary of your task!"), 
            React.createElement("div", {className: "order-wizzard__step-survey"}, 
                React.createElement("div", {className: "order-wizzard__summary"}, 
                    React.createElement("ul", {className: "order-wizzard__summary-list"}, this.renderAnswers())
                )
            ), 
            React.createElement("div", {className: "order-wizzard__controls clearfix"}, 
                React.createElement("div", {className: "order-wizzard__back pull-left"}, 
                    React.createElement("a", {onClick: this.moveBack, href: "#", className: "b-button b-button--transparent"}, 
                        React.createElement("span", {className: "b-button__icon-arrow"}), 
                        " Back")
                ), 
                React.createElement("div", {className: "order-wizzard__next"}, this.renderNextButton())));
    }
    renderNextButton() {
        const loggedIn = this.state.loggedIn;
        const label = loggedIn ? "Submit" : "Next";
        return React.createElement("div", {className: "order-wizzard__cta text-center"}, 
            React.createElement("div", {className: "row"}, loggedIn ? React.createElement("a", {href: "#", className: "b-button b-button--blue", onClick: this.moveNext}, label) :
                React.createElement("div", null, 
                    React.createElement("div", {className: "form-inline order-wizzard__email-sender"}, 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("input", {type: "text", className: "form-control", ref: x => this.email = x, onKeyDown: () => { this.validEmail(); }, placeholder: "Enter your email"})
                        ), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("a", {href: "#", className: "btn btn-primary", style: (!this.state.validEmail ? { opacity: 0.7 } : {}), onClick: this.moveNext}, label)
                        )), 
                    React.createElement("br", null), 
                    React.createElement("p", {className: "text-primary text-center"}, "Strictly confidential, no commitments")))
        );
    }
    renderAnswers() {
        const flow = this.props.flow;
        const qa = flow.joinQA();
        return qa.map((item) => {
            let label = item.answer.label;
            if (label == null)
                return null;
            return React.createElement("li", {key: item.answer.token}, label);
        });
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], SummaryPage.prototype, "moveNext", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], SummaryPage.prototype, "validEmail", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], SummaryPage.prototype, "moveBack", null);
exports.SummaryPage = SummaryPage;
//# sourceMappingURL=SummaryPage.js.map