module Survey {

    export interface Questionnaire {
        pages: QuestionPage[];
    }

    export interface QuestionPage {
        title?: string;
        questions: Question[];
    }

    export interface Question {
        token?: string | number;
        options?: Option[];
        title?: string;
        required?: boolean;
        defaultValue?: any;
    }

    export interface Option {
        value: any;
        label?: string;
        //defaultValue?: boolean,
    }

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
        //form: SurveyForm;
    }

    export interface CheckBox extends Element {
        defaultChecked?: boolean;
    }

    export interface GroupElement extends Element {

    }

    export interface Group extends Field {
        items?: Element[];
        value?: any;
    }

    export interface SurveyForm {
        [key: string]: any;
        [key: number]: any;
        //getFormValue(key: React.Key): any;
        //setFormValue(key: React.Key, value: any);
    }

    type PageFn<R> = (page: QuestionPage) => R;
    type QuestionFn<R> = (question: Question) => R;

    export interface PageState {
        active?: PageFn<boolean>;
        render: PageFn<JSX.Element>;
    }

    export interface QuestionState {
        active?: QuestionFn<boolean>;
    }
}

module Survey.View {

    export type Ref<T> = (instance: T) => any;

    export interface Value {
        value?: any;
    }

    export interface Element extends Value {
        label: string;
    }

    export interface CheckBox extends Element {
        group: Group;
        defaultChecked?: boolean;
    }

    export interface Group {
        checked(value: any): boolean;
    }
}
