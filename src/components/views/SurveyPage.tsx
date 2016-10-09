import * as React from "react";

/** Wraps questions of the survey. */
export class SurveyPage extends React.Component<SurveyPageProps, any> {

    title() {
        let title = this.props.title;
        if (title) return title;
        const questions = this.props.questions;
        if (questions && questions[0])
            return questions[0].title;
        return null;
    }

    render(): JSX.Element | any {
        return <div>
            <div className="order-wizzard__step-title">{this.title()}</div>
            <div className="order-wizzard__step-survey">
                {this.props.children}
            </div>
        </div>
    }
}

interface SurveyPageProps {
    title?: string
    questions?: Survey.Question[];
}
