module Survey.Forms {
    export interface PowerPointProject extends Survey.SurveyForm {
        service?: string;
        template?: string;
        style?: string;
        purpose?: string[];
        comments?: string;
    }
}
