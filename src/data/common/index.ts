export const CommentsQuestion: Survey.Question = {
    token: nameof((null as Survey.Forms.CommentsForm).comments),
    title: "Anything else we should know before this information is submitted?",
    placeholder: "write your comments here...",
    required: false,
};

export const CommentsPage: Survey.Page = {
    questions: [CommentsQuestion]
};

export const DueDateQuestion: Survey.Question = {
    token: nameof((null as Survey.Forms.DueDateForm).deadline),
    options: [
        {value: "no", label: "No"},
        {value: "yes", label: "Yes"},
    ],
    required: true,
};

export const DueDatePage: Survey.Page = {
    title: "Do you have a definite deadline?",
    questions: [DueDateQuestion]
};

