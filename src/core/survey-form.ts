import {SyncEvent} from "ts-events";
export class SurveyForm implements Survey.SurveyForm {

    private readonly _onPropertyChanged: SyncEvent<string> = new SyncEvent<string>();
    get onPropertyChanged(): SyncEvent<string> { return this._onPropertyChanged; }

    getValue(key: string): any {
        return this[key];
    }

    setValue(key: string, value: any) {
        console.log("set form value >> " + key + ": " + value);
        const prev = this[key];
        if (prev == value) return;
        this[key] = value;
        this._onPropertyChanged.post(key);
    }

    toJSON(): any {

        const json = {};
        for (var key in this)
            if (!key.startsWith('_'))
                json[key] = this[key];

        return json;
    }
}
