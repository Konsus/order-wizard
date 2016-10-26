"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ts_events_1 = require("ts-events");

var SurveyForm = function () {
    function SurveyForm() {
        _classCallCheck(this, SurveyForm);

        this._onPropertyChanged = new ts_events_1.SyncEvent();
    }

    _createClass(SurveyForm, [{
        key: "getValue",
        value: function getValue(key) {
            return this[key];
        }
    }, {
        key: "setValue",
        value: function setValue(key, value) {
            console.log("set form value >> " + key + ": " + value);
            var prev = this[key];
            if (prev == value) return;
            this[key] = value;
            this._onPropertyChanged.post(key);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            var json = {};
            for (var key in this) {
                if (!key.startsWith('_')) json[key] = this[key];
            }return json;
        }
    }, {
        key: "onPropertyChanged",
        get: function get() {
            return this._onPropertyChanged;
        }
    }]);

    return SurveyForm;
}();

exports.SurveyForm = SurveyForm;
//# sourceMappingURL=survey-form.js.map