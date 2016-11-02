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
require("braintree-web");
const React = require("react");
const core_decorators_1 = require("core-decorators");
var braintree = require('braintree-web');
var DropIn = require('braintree-react').DropIn;
class CreditCardPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }
    moveNext() {
        this.props.moveNext();
    }
    submitCreditCard(opt) {
        this.props.addPaymentMethod(opt.nounce).then(() => {
            this.moveNext();
        })
            .catch(err => alert(err.response.body.message));
    }
    componentDidMount() {
        this.props.hasPaymentMethod().then(hasPaymentMethod => {
            // move next page if already has payment method
            if (hasPaymentMethod) {
                this.moveNext();
                return;
            }
            // require token to initialize braintree
            return this.props.paymentToken().then((token) => {
                this.setState(state => {
                    state.token = token;
                    return state;
                });
            });
        }).catch(e => {
            console.error(e);
        });
    }
    render() {
        const token = this.state.token;
        const loading = token == null || token == "";
        const view = loading ? this.renderLoading() : this.renderView();
        return React.createElement("div", {className: "order-wizzard"}, view);
    }
    renderView() {
        const token = this.state.token;
        return React.createElement("div", null, 
            React.createElement("form", null, 
                React.createElement("div", {className: "order-wizzard__header"}, 
                    React.createElement("div", {className: "order-wizzard__sub-title"}, "Add your credit card details so we are ready to go if you approve the quote.")
                ), 
                React.createElement("form", {style: { margin: '20px' }}, 
                    React.createElement(DropIn, {braintree: braintree, clientToken: token, onPaymentMethodReceived: this.submitCreditCard})
                ), 
                React.createElement("button", {type: "submit", style: { width: '80%', margin: 'auto' }, className: "btn btn-primary btn-block"}, " Submit"), 
                React.createElement("button", {type: "submit", style: { width: '80%', margin: 'auto' }, className: "btn btn-default btn-block", onClick: this.moveNext}, " Later"))
        );
    }
    renderLoading() {
        // TODO: show loading
        return React.createElement("div", null, "loading...");
    }
}
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], CreditCardPage.prototype, "moveNext", null);
__decorate([
    core_decorators_1.autobind, 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], CreditCardPage.prototype, "submitCreditCard", null);
exports.CreditCardPage = CreditCardPage;
//# sourceMappingURL=CreditCardPage.js.map