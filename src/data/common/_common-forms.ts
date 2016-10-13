module Survey.Forms {
    export interface CommentsForm extends Survey.SurveyForm {
        comments?: string;
    }

    export interface DueDateForm extends Survey.SurveyForm {
        deadline?: Date | "no";
    }
}
