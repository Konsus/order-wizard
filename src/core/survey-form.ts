export class SurveyForm implements Survey.SurveyForm {
    getFormValue(key: React.Key): any {
        return this[key];
    }

    setFormValue(key: React.Key, value: any) {
        console.log("set form value >> " + key + ": " + value);
        this[key] = value;
    }
}
