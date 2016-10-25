declare namespace Survey {

    export interface NewUserForm {
        firstName: string,
        lastName: string,
        user: string;
        pass: string;
    }

    export interface AuthForm {
        user: string;
        pass: string;
    }

    export namespace Project {
        export interface Context {
            isLoggedIn(): Promise<boolean>;
            exists(username: string): Promise<boolean>;
            login(form: Survey.AuthForm): Promise<void>;
            register(form: Survey.NewUserForm): Promise<void>;
            hasCreditCard(): Promise<boolean>;
            paymentToken(): Promise<string>;
        }
    }
}
