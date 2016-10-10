module Survey.Forms {
    export interface PowerPointProject extends Forms.CommentsForm {
        service?: string;
        template?: string;
        style?: string;
        purpose?: string[];
    }
}
