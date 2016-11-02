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
    submitCreditCard(opt) {
        this.props.addPaymentMethod(opt.nounce).then(()=>{
            this.moveNext();
        })
        .catch(err=>alert(err.response.body.message));
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
            <form>
            <div className="order-wizzard__header">
                <div className="order-wizzard__sub-title">
                    Add your credit card details so we are ready to go if you approve the quote.
                </div>
            </div>
            <form style={{margin: '20px'}}>
                <DropIn braintree={braintree}
                        clientToken={token}
                        onPaymentMethodReceived={this.submitCreditCard}
                />
            </form>
            <button type="submit"
                    style={{width: '80%', margin: 'auto'}}
                    className="btn btn-primary btn-block"
                    > Submit
            </button>
                <button type="submit"
                        style={{width: '80%', margin: 'auto'}}
                        className="btn btn-default btn-block"
                        onClick={this.moveNext}> Later
                </button>
            </form>
        </div>
    }

    renderLoading(): JSX.Element|any {
        // TODO: show loading
        return <div>loading...</div>;
    }
}

export interface CreditCardPageProps {
    hasPaymentMethod(): Promise<boolean>;
    addPaymentMethod(nounce): Promise<void>;
    paymentToken(): Promise<string>;
    moveNext();
}

export interface CreditCardPageState {
    token?: string;
}
