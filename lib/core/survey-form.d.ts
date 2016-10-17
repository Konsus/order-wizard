import { SyncEvent } from "ts-events";
export declare class SurveyForm implements Survey.SurveyForm {
    private readonly _onPropertyChanged;
    readonly onPropertyChanged: SyncEvent<string>;
    getValue(key: string): any;
    setValue(key: string, value: any): void;
    toJSON(): any;
}
