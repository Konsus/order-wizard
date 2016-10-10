export const CommentsQuestion: Survey.Question = {
    token: nameof((null as Survey.Forms.CommentsForm).comments),
    title: "Anything else we should know before this information is submitted?",
    required: false
};

export const CommentsPage: Survey.QuestionPage = {
    questions: [CommentsQuestion]
};

export const DeadlinePage: Survey.QuestionPage = {
    title: "Do you have a definite deadline?",
    questions: [{
        options: [
            {value: true, label: "Yes"},
            {value: false, label: "No"},
        ],
    }]
};

