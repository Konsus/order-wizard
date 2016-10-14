import * as React from "react";
const c: Survey.Context = null;

export class SelectionControl<P extends Survey.View.SelectionProps<any>, S extends Survey.View.Value<any>> extends React.Component<P,S> {

    public static contextTypes = {
        [nameof(c.form)]: React.PropTypes.shape({
            [nameof(c.form.setValue)]: React.PropTypes.func.isRequired,
            [nameof(c.form.getValue)]: React.PropTypes.func.isRequired,
        }).isRequired,
        [nameof(c.questionnaire)]: React.PropTypes.object,
    };

    context: Survey.Context;

    get token(): string | null {
        return this.props.token;
    }

    protected onValueChange(state: S) {
        const key = this.token;
        if (this.props.valueRef) this.props.valueRef(state.value);
        if (key) this.context.form.setValue(key, state.value)
    }
}
