// Generated by dts-bundle v0.6.1

export default Survey;
export * from './index'

export namespace Survey {
        export type Key = string | number;
        export type Func<T, R> = (x: T) => R;
        export type SummaryViewFn = (value: any) => string;

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
                active?: Func<SurveyForm, boolean>;
        }

        export interface Question {
                token?: string;
                title?: string;
                required?: boolean;
                defaultValue?: any;
                placeholder?: any;
                resize?: "none" | "horizontal" | "vertical" | "both";
                rows?: number;

                /** List of predefined answer options. */
                options?: Option[];

                /** Options to use if options does not provide required answer. */
                other?: Option;

                /** Whether to show question or not (show by default). */
                active?: Func<SurveyForm, boolean>;

                /** Function that override default answer view in summary. */
                summary?: SummaryViewFn;
        }

        export interface Option {
                value?: any;
                label?: string;
                /** Whether to show option or not (show by default). */
                active?: Func<SurveyForm, boolean>;
        }

        export interface Answer {
                token: string;
                value: any;
                label?: string;
        }

        export interface QA {
                question: Question;
                answer: Answer;
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
                active?: Func<Page, boolean>;
                render: Func<Question, JSX.Element>;
        }

        export interface QuestionView {
                active?: Func<Page, boolean>;
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

export namespace Survey {
    export namespace Forms {
        export interface CommentsForm extends Survey.SurveyForm {
            comments?: string;
        }

        export interface DueDateForm extends Survey.SurveyForm {
            deadline?: Date | "no";
        }
    }
}

export namespace Survey {
    export namespace Forms {

        export interface ProjectForm extends Forms.CommentsForm, Forms.DueDateForm {
            service?: string;
        }

        export interface PowerPointProject extends ProjectForm {
            template?: string;
            style?: string;
            purpose?: string[];
        }

        export interface WritingProject extends ProjectForm {
            topic?: string;
            contents?: any[];
            content_comment?: string;
            files?: any[];
        }

        export interface DesignProject extends ProjectForm {
            design?: string;
            style?: string;
            files?: any[];
        }

        export interface DataEntryProject extends ProjectForm {
            description?: string;
        }

        export interface ResearchProject extends ProjectForm {
            description?: string;
            files?: any[];
        }

        export interface WebProject extends Survey.SurveyForm {
            website?: string;
            website_link?: string;
            service?: string | any[];
            tech_info?: string;
            tech_requirement?: string;
            tech_preferences?: string;
            purpose?: string;
            files?: any[];
            deadline?: Date | "no";
            start_date: string;
        }
    }
}

export namespace Survey {

    export interface NewUserForm {
        firstName: string,
        lastName: string,
        username: string;
        password: string;
        company: string;
    }

    export interface AuthForm {
        username: string;
        password: string;
    }

    export namespace Project {
        export interface Context {
            isLoggedIn(): Promise<boolean>;
            exists(username: string): Promise<boolean>;
            login(form: Survey.AuthForm): Promise<void>;
            register(form: Survey.NewUserForm): Promise<void>;
            hasPaymentMethod(): Promise<boolean>;
            addPaymentMethod(nonce: string): Promise<void>;
            paymentToken(): Promise<string>;
        }
    }
}

