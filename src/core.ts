module Survey {
    export type Ref<T> = (instance: T) => any;

    export interface Value {
        value: any;
    }

    export interface Element extends Value {
        label: string;
        key?: React.Key;
    }

    export interface Field {
        value?: any;
        token: React.Key;
        form: SurveyForm;
    }

    export interface Checkbox extends Element {
        defaultChecked?: boolean;
    }

    export interface GroupElement extends Element {

    }

    export interface Group extends Field {
        items?: Element[];
        value?: any;
    }

    export interface Question extends Group {
        token: React.Key;
        form: SurveyForm;
        title?: string;
        required: boolean;
    }

    export interface SurveyForm {
        getFormValue(key: React.Key): any;
        setFormValue(key: React.Key, value: any);
    }
}
