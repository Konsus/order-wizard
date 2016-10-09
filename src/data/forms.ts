module Survey.Forms {
    export interface PowerPointProject extends Survey.SurveyForm {
        template?: string;
        service_type?: string;
        style_type?: string;
        purpose?: string[];
    }
}
