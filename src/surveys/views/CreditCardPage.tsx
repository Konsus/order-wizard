import "braintree-web";
import * as React from "react";
import {autobind} from "core-decorators";
var braintree = require('braintree-web');
var DropIn = require('braintree-react').DropIn;

export class CreditCardPage extends React.Component<CreditCardPageProps, CreditCardPageState> {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    @autobind
    moveNext() {
        this.props.moveNext();
    }

    @autobind
    submitCreditCard() {
        console.error("#submitCreditCard is not implemented yet!");
        this.moveNext();
    }

    componentDidMount(): void {
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
                })
            })
        }).catch(e => {
            console.error(e);
        });
    }

    render(): JSX.Element|any {
        const token = this.state.token;
        const loading = token == null || token == "";
        const view = loading ? this.renderLoading() : this.renderView();
        return <div className="order-wizzard">
            {view}
        </div>
    }

    renderView(): JSX.Element|any {
        const token = this.state.token;
        return <div>
            <div className="order-wizzard__header">
                <div className="order-wizzard__sub-title">
                    Add your credit card details so we are ready to go if you approve the quote.
                </div>
            </div>
            <form>
                <DropIn braintree={braintree}
                        clientToken={token}/>
            </form>
            <button type="submit"
                    className="btn btn-primary btn-block"
                    onClick={this.submitCreditCard}> Submit
            </button>
        </div>
    }

    renderLoading(): JSX.Element|any {
        // TODO: show loading
        return null;
    }
}

export interface CreditCardPageProps {
    hasPaymentMethod(): Promise<boolean>;
    paymentToken(): Promise<string>;
    moveNext();
}

export interface CreditCardPageState {
    token?: string;
}
