"use strict";

exports.CommentsQuestion = {
    token: "comments",
    title: "Anything else we should know before this information is submitted?",
    placeholder: "write your comments here...",
    required: false
};
exports.CommentsPage = {
    questions: [exports.CommentsQuestion]
};
exports.DueDateQuestion = {
    token: "deadline",
    options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }],
    required: false
};
exports.DueDatePage = {
    title: "Do you have a definite deadline?",
    questions: [exports.DueDateQuestion]
};
//# sourceMappingURL=index.js.map