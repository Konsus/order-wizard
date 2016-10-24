declare namespace Survey {
    export type Key = string | number;
    export type Function<T, R> = (question: Question) => R;

    export interface IEvent<T> {
        /**
         * Attach an event handler
         * @param handler The function to call. The this argument of the function will be this object.
         */
        attach(handler: (data: T) => void): void;

        /**
         * Attach an event handler
         * @param boundTo The this argument of the handler
         * @param handler The function to call.
         */
        attach(boundTo: Object, handler: (data: T) => void): void;
    }

    export interface Context {
        form: SurveyForm;
        questionnaire: Survey.Questionnaire;
    }

    export interface Questionnaire {
        pages: Page[];
        /** Whether all questions are required by default. */
        defaultRequired?: boolean;
    }

    export interface Page {
        title?: string;
        questions: Question[];
        active?: Function<SurveyForm, boolean>;
    }

    export interface Question {
        token?: string;
        title?: string;
        required?: boolean;
        defaultValue?: any;
        placeholder?: any;
        resize?: "none" | "horizontal" | "vertical" | "both";
        rows?:number;

        /** List of predefined answer options. */
        options?: Option[];

        /** Options to use if options does not provide required answer. */
        other?: Option;

        /** Whether to show question or not (show by default). */
        active?: Function<SurveyForm, boolean>;
    }

    export interface Option {
        value?: any;
        label?: string;
        /** Whether to show option or not (show by default). */
        active?: Function<SurveyForm, boolean>;
    }

    export type Ref<T> = (instance: T) => any;

    export interface Value {
        value: any;
    }

    export interface Element extends Value {
        label: string;
    }

    export interface Field {
        value?: any;
        token: Key;
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
        readonly onPropertyChanged: IEvent<string>;
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

    export namespace View {

        export type Ref<T> = (instance: T) => any;

        export interface Value<T> {
            value?: T;
        }

        export interface Element<T> extends Value<T> {
            id?: Key;
            label?: string;
        }

        export interface CheckBox extends Element<any> {
            group: Group;
            defaultChecked?: boolean;
        }

        export interface Group {
            checked(value: any): boolean;
        }

        export interface SelectionProps<T> extends Survey.Question, Element<T> {
            valueRef?: Survey.Ref<T>;
        }
    }
}

