"use strict";

var _React$PropTypes$shap, _SelectionControl$con;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");
var c = null;

var SelectionControl = function (_React$Component) {
    _inherits(SelectionControl, _React$Component);

    function SelectionControl() {
        var _ref;

        _classCallCheck(this, SelectionControl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SelectionControl.__proto__ || Object.getPrototypeOf(SelectionControl)).call.apply(_ref, [this].concat(args)));

        _this.state = {};
        _this.state.options = [];
        _this.state.value = _this.initialValue();
        _this.updateOptionsState(_this.state);
        return _this;
    }
    /** Token of the form where to write data. */


    _createClass(SelectionControl, [{
        key: "isControlActive",

        /** Whether question of this control is active. */
        value: function isControlActive() {
            var active = this.props.active;
            if (active == null) return true;
            return active(this.context.form);
        }
        /**
         * Whether concrete option of control is active.
         * @param option - option to check.
         */

    }, {
        key: "isOptionActive",
        value: function isOptionActive(option) {
            if (option == null) return false;
            if (option.active == null) return true;
            return option.active(this.context.form);
        }
        /** Get initial value of the form. {@link Survey.View.Value#value} */

    }, {
        key: "initialValue",
        value: function initialValue() {
            var value = this.props.value;
            if (value != null) return value;
            var token = this.token;
            if (token != null) value = this.context.form.getValue(token);
            return value;
        }
        /** Update state of each option. {@link SelectionControlState#options} */

    }, {
        key: "updateOptionsState",
        value: function updateOptionsState(state) {
            var _this2 = this;

            var options = this.props.options;
            if (options == null) return;
            options.forEach(function (option, index) {
                state.options[index] = _this2.isOptionActive(option);
            });
        }
        /**
         * Handle change of the token value.
         * This method will notify listeners and will write value to the form.
         * @param state
         */

    }, {
        key: "onValueChange",
        value: function onValueChange(state) {
            var key = this.token;
            if (this.props.valueRef) this.props.valueRef(state.value);
            if (key) this.context.form.setValue(key, state.value);
            this.updateOptionsState(state);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.isControlActive()) return this.renderActiveView();
            return null;
        }
        /** Render occurs when selection control points to active question. */

    }, {
        key: "renderActiveView",
        value: function renderActiveView() {
            return React.createElement("div", null, this.renderOptions(this.props.options));
        }
        /**
         * Render one or more options.
         * @param options - one option on array.
         * @returns {any}
         */

    }, {
        key: "renderOptions",
        value: function renderOptions(options) {
            var _this3 = this;

            if (options == null) return null;
            if (options instanceof Array) {
                return options.map(function (option, index) {
                    if (option == null) return null;
                    return _this3.renderOption(option, index, _this3.isOptionActive(option));
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

    }, {
        key: "renderOption",
        value: function renderOption(option, index, active) {
            if (active) return this.renderActiveOption(option, index);
        }
    }, {
        key: "renderActiveOption",

        /**
         * Render single option that is validated to be active on the page.
         * @param option - option from question
         * @param index - zero-based index of an option.
         */
        value: function renderActiveOption(option, index) {
            return React.createElement("label", { key: index }, option.label || option.value);
        }
    }, {
        key: "token",
        get: function get() {
            return this.props.token;
        }
    }]);

    return SelectionControl;
}(React.Component);

SelectionControl.contextTypes = (_SelectionControl$con = {}, _defineProperty(_SelectionControl$con, "form", React.PropTypes.shape((_React$PropTypes$shap = {}, _defineProperty(_React$PropTypes$shap, "setValue", React.PropTypes.func.isRequired), _defineProperty(_React$PropTypes$shap, "getValue", React.PropTypes.func.isRequired), _React$PropTypes$shap)).isRequired), _defineProperty(_SelectionControl$con, "questionnaire", React.PropTypes.object), _SelectionControl$con);
exports.SelectionControl = SelectionControl;
//# sourceMappingURL=SelectionControl.js.map