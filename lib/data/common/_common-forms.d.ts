declare module Survey.Forms {
    interface CommentsForm extends Survey.SurveyForm {
        comments?: string;
    }
    interface DueDateForm extends Survey.SurveyForm {
        deadline?: Date | "no";
    }
}
