"use strict";

var moment = require('moment');
exports.CommentsQuestion = {
    token: "comments",
    title: "Anything else we should know before this information is submitted?",
    placeholder: "You can also tell us about audience / users, or other relevant info",
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
    options: [{ value: "no", label: "No, as soon as possible is fine" }, { value: "yes", label: "Yes, I do" }],
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
