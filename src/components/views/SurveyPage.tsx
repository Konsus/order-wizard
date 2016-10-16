import * as React from "react";

/** Wraps questions of the survey. */
export class SurveyPage extends React.Component<SurveyPageProps, any> {

    title(): string {
        let title = this.props.title;
        if (title) return title;
        const questions = this.props.questions;
        if (questions && questions[0])
            return questions[0].title;
        return null;
    }

    render(): JSX.Element | any {
        const title = this.title();
        return <div key={this.props.id || title}>
            <div className="order-wizzard__step-title">{title}</div>
            <div className="order-wizzard__step-survey">
                {this.props.children}
            </div>
        </div>
    }
}

export interface SurveyPageProps {
    id?: React.Key,
    title?: string
    questions?: Survey.Question[];
}
