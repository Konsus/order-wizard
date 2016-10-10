export class SurveyForm implements Survey.SurveyForm {
    getValue(key: string): any {
        return this[key];
    }

    setValue(key: string, value: any) {
        console.log("set form value >> " + key + ": " + value);
        this[key] = value;
    }
}
