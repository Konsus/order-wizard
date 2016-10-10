module Survey {

    type Function<T, R> = (question: Question) => R;

    export interface Context {
        form: SurveyForm;
        questionnaire: Survey.Questionnaire;
    }

    export interface Questionnaire {
        pages: Page[];
    }

    export interface Page {
        title?: string;
        questions: Question[];
        active?: Function<SurveyForm,boolean>;
    }

    export interface Question {
        token?: string;
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
        getValue(key: string): any;
        setValue(key: string, value: any)
    }

    export interface PageView {
        active?: Function<Page, boolean>;
        render: Function<Question, JSX.Element>;
    }

    export interface QuestionView {
        active?: Function<Page, boolean>;
    }
}

module Survey.View {

    export type Ref<T> = (instance: T) => any;

    export interface Value<T> {
        value?: T;
    }

    export interface Element<T> extends Value<T> {
        label: string;
    }

    export interface RadioBox extends Element<any> {
        group: Group;
        defaultChecked?: boolean;
    }

    export interface CheckBox extends Element<any[]> {
        group: Group;
        defaultChecked?: boolean;
    }

    export interface Group {
        checked(value: any): boolean;
    }

    export interface SelectionProps<T> {
        token?: string;
        valueRef?: Survey.Ref<T>;
    }

    export interface InputProps<T> extends SelectionProps<T> {
        label?: string;
    }
}
