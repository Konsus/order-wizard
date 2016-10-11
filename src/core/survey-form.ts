import {SyncEvent} from "ts-events";
export class SurveyForm implements Survey.SurveyForm {

    readonly onPropertyChanged: SyncEvent<string> = new SyncEvent<string>();

    getValue(key: string): any {
        return this[key];
    }

    setValue(key: string, value: any) {
        console.log("set form value >> " + key + ": " + value);
        const prev = this[key];
        if (prev == value) return;
        this[key] = value;
        this.onPropertyChanged.post(key);
    }
}
