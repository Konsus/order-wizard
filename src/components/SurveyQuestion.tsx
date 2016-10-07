import * as React from "react";
export class SurveyQuestion extends React.Component<SurveyQuestionProps, any> {

    render(): JSX.Element | any {
        return <div>
            <div className="order-wizzard__step-title">{this.props.title}</div>
            <div className="order-wizzard__step-survey">
                {this.props.children}
            </div>
        </div>
    }
}

interface SurveyQuestionProps {
    title?: string
}
