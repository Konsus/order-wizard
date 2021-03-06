/// <reference types="react" />
import "braintree-web";
import * as React from "react";
export declare class CreditCardPage extends React.Component<CreditCardPageProps, CreditCardPageState> {
    constructor(...args: any[]);
    moveNext(): void;
    submitCreditCard(opt: any): void;
    componentDidMount(): void;
    render(): JSX.Element | any;
    renderView(): JSX.Element | any;
    renderLoading(): JSX.Element | any;
}
export interface CreditCardPageProps {
    hasPaymentMethod(): Promise<boolean>;
    addPaymentMethod(nounce: any): Promise<void>;
    paymentToken(): Promise<string>;
    moveNext(): any;
}
export interface CreditCardPageState {
    token?: string;
}
