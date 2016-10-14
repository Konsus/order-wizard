import {SyncEvent} from "ts-events";
export class SurveyForm implements Survey.SurveyForm {

    readonly onPropertyChanged: SyncEvent<string> = new SyncEvent<string>();
    private readonly data = {};

    getValue(key: string): any {
        return this.data[key];
    }

    setValue(key: string, value: any) {
        console.log("set form value >> " + key + ": " + value);
        const prev = this.data[key];
        if (prev == value) return;
        this.data[key] = value;
        this.onPropertyChanged.post(key);
    }

    toJSON(): any {
        return this.data;
    }
}
