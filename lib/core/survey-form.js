"use strict";
const ts_events_1 = require("ts-events");
class SurveyForm {
    constructor() {
        this._onPropertyChanged = new ts_events_1.SyncEvent();
    }
    get onPropertyChanged() { return this._onPropertyChanged; }
    getValue(key) {
        return this[key];
    }
    setValue(key, value) {
        console.log("set form value >> " + key + ": " + value);
        const prev = this[key];
        if (prev == value)
            return;
        this[key] = value;
        this._onPropertyChanged.post(key);
    }
    toJSON() {
        const json = {};
        for (var key in this)
            if (!key.startsWith('_'))
                json[key] = this[key];
        return json;
    }
}
exports.SurveyForm = SurveyForm;
//# sourceMappingURL=survey-form.js.map