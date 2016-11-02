declare namespace Survey {

    export interface NewUserForm {
        firstName: string,
        lastName: string,
        username: string;
        password: string;
        company: string;
    }

    export interface AuthForm {
        username: string;
        password: string;
    }

    export namespace Project {
        export interface Context {
            isLoggedIn(): Promise<boolean>;
            exists(username: string): Promise<boolean>;
            login(form: Survey.AuthForm): Promise<void>;
            register(form: Survey.NewUserForm): Promise<void>;
            hasPaymentMethod(): Promise<boolean>;
            addPaymentMethod(nonce: string): Promise<void>;
            paymentToken(): Promise<string>;
        }
    }
}
