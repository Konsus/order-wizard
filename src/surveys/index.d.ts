declare namespace Survey {
    export namespace Project {
        export interface Context {
            isLoggedIn(): boolean;
            isNewUser(): boolean;
            hasCreditCard(): boolean;
        }
    }
}
