module Survey {

    type Function<T1, T2, R> = (x: T1, y: T2) => R;
    type Function<T, R> = (x: T) => R;
    type Function<R> = () => R;

    export interface Questionnaire {
        pages: QuestionsPage[];
    }

    export interface QuestionsPage {
        title?: string;
        questions: Question | Question[];
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
        getFormValue(key: React.Key): any;
        setFormValue(key: React.Key, value: any);
    }

    type QuestionFn<R> = (q: Question) => R;
    type QuestionFn<F, R> = (q: Question, form: F) => R;

    //export interface QuestionState {
    //    active?: QuestionFn<boolean>;
    //}

    export interface QuestionState<F> {
        active?: QuestionFn<F, boolean> | QuestionFn<boolean>;
    }
}

module Survey.View {

    export interface Value {
        value?: any;
    }

    export type Ref<T> = (instance: T) => any;

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
