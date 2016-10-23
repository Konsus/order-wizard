declare module Survey.Project {
    export interface API {
        isLoggedIn(): boolean;
        isNewUser(): boolean;
        hasCreditCard(): boolean;
    }
}
