"use strict";

var moment = require('moment');
exports.CommentsQuestion = {
    token: "comments",
    title: "Anything else we should know before this information is submitted?",
    placeholder: "write your comments here...",
    required: false,
    summary: function summary(value) {
        return "Comments: " + value;
    }
};
exports.CommentsPage = {
    questions: [exports.CommentsQuestion]
};
exports.DueDateQuestion = {
    token: "deadline",
    options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }],
    required: true,
    summary: function summary(value) {
        switch (value) {
            case "no":
                return "Without definite deadline";
            case "yes":
                return "With definite deadline";
            default:
                return "Deadline due " + moment(value).format('YYYY-MM-DD by HH:mm');
        }
    }
};
exports.DueDatePage = {
    title: "Do you have a definite deadline?",
    questions: [exports.DueDateQuestion]
};
//# sourceMappingURL=index.js.map