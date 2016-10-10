import * as React from "react";
const c: Survey.SurveyContext = null;

export class SelectionControl<P extends Survey.View.SelectionProps<T>, S extends Survey.View.Value<T>, T> extends React.Component<P,S> {

    public static contextTypes = {
        [nameof(c.form)]: React.PropTypes.shape({
            [nameof(c.form.setValue)]: React.PropTypes.func.isRequired,
            [nameof(c.form.getValue)]: React.PropTypes.func.isRequired,
        }).isRequired,
        [nameof(c.questionnaire)]: React.PropTypes.object,
    };

    context: Survey.SurveyContext;

    protected onValueChange(state: S) {
        if (this.props.valueRef) this.props.valueRef(state.value);
        if (this.props.token)
            this.context.form.setValue(this.props.token, state.value)
    }
}
