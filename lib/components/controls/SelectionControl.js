"use strict";

const React = require("react");
const c = null;
class SelectionControl extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.state.options = [];
        this.state.value = this.initialValue();
        this.updateOptionsState(this.state);
    }
    /** Token of the form where to write data. */
    get token() {
        return this.props.token;
    }
    /** Whether question of this control is active. */
    isControlActive() {
        const active = this.props.active;
        if (active == null) return true;
        return active(this.context.form);
    }
    /**
     * Whether concrete option of control is active.
     * @param option - option to check.
     */
    isOptionActive(option) {
        if (option == null) return false;
        if (option.active == null) return true;
        return option.active(this.context.form);
    }
    /** Get initial value of the form. {@link Survey.View.Value#value} */
    initialValue() {
        let value = this.props.value;
        if (value != null) return null;
        const token = this.props.token;
        if (token != null) value = this.context.form.getValue(token);
        return value;
    }
    /** Update state of each option. {@link SelectionControlState#options} */
    updateOptionsState(state) {
        const options = this.props.options;
        if (options == null) return;
        options.forEach((option, index) => {
            state.options[index] = this.isOptionActive(option);
        });
    }
    /**
     * Handle change of the token value.
     * This method will notify listeners and will write value to the form.
     * @param state
     */
    onValueChange(state) {
        const key = this.token;
        if (this.props.valueRef) this.props.valueRef(state.value);
        if (key) this.context.form.setValue(key, state.value);
        this.updateOptionsState(state);
    }
    render() {
        if (this.isControlActive()) return this.renderActiveView();
        return null;
    }
    /** Render occurs when selection control points to active question. */
    renderActiveView() {
        return React.createElement("div", null, this.renderOptions(this.props.options));
    }
    /**
     * Render one or more options.
     * @param options - one option on array.
     * @returns {any}
     */
    renderOptions(options) {
        if (options == null) return null;
        if (options instanceof Array) {
            return options.map((option, index) => {
                if (option == null) return null;
                return this.renderOption(option, index, this.isOptionActive(option));
            });
        }
        return this.renderOption(options, 0, this.isOptionActive(options));
    }
    /**
     * Render single option.
     * @param option - option from question.
     * @param index - zero-based index of an option.
     * @param active - whether option is active or not.
     */
    renderOption(option, index, active) {
        if (!active) return null;
        return React.createElement("label", { key: index }, option.label || option.value);
    }
}
SelectionControl.contextTypes = {
    ["form"]: React.PropTypes.shape({
        ["setValue"]: React.PropTypes.func.isRequired,
        ["getValue"]: React.PropTypes.func.isRequired
    }).isRequired,
    ["questionnaire"]: React.PropTypes.object
};
exports.SelectionControl = SelectionControl;
//# sourceMappingURL=SelectionControl.js.map