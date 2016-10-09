import * as React from "react";

export class SelectionControl<P extends Survey.View.SelectionProps<T>, S extends Survey.View.Value<T>, T> extends React.Component<P,S> {

    protected onValueChange(state: S) {
        if (this.props.ref) this.props.ref(state.value);
        if (this.props.form && this.props.token)
            this.props.form[this.props.token] = state.value;
    }
}
