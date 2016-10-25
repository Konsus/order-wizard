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

    componentWillMount(): void {
        this.props.hasCreditCard().then(hasCreditCard => {

            // move next page
            if (hasCreditCard) {
                this.setState(state => {
                    this.props.moveNext();
                    return state;
                });
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
        if (token == null || token == "")
            return null; // TODO: show loading

        return <div className="order-wizzard">
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
}

export interface CreditCardPageProps {
    hasCreditCard(): Promise<boolean>;
    paymentToken(): Promise<string>;
    moveNext();
}

export interface CreditCardPageState {
    token?: string;
}
