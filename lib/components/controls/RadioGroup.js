"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var core_decorators_1 = require("core-decorators");
var SelectionControl_1 = require("./SelectionControl");
function empty(value) {
    return value == null || value == "";
}

var RadioBox = function (_React$Component) {
    _inherits(RadioBox, _React$Component);

    function RadioBox() {
        _classCallCheck(this, RadioBox);

        return _possibleConstructorReturn(this, (RadioBox.__proto__ || Object.getPrototypeOf(RadioBox)).apply(this, arguments));
    }

    _createClass(RadioBox, [{
        key: "onClick",
        value: function onClick(e) {
            if (e.target != this.radio) this.radio.click();
        }
    }, {
        key: "onChange",
        value: function onChange() {
            this.props.valueRef(this.radio.value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var value = this.props.value;
            var label = this.props.label;
            var checked = this.props.checked(value);
            return React.createElement("div", { key: this.props.id || value, className: "order-wizzard__list-item order-wizzard__radio", onClick: this.onClick }, React.createElement("input", { type: "radio", ref: function ref(x) {
                    return _this2.radio = x;
                }, value: value, label: label, checked: checked, onChange: this.onChange }), React.createElement("label", null, React.createElement("span", null, label || value)));
        }
    }]);

    return RadioBox;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioBox.prototype, "onClick", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioBox.prototype, "onChange", null);
exports.RadioBox = RadioBox;

var RadioBoxOther = function (_React$Component2) {
    _inherits(RadioBoxOther, _React$Component2);

    function RadioBoxOther() {
        var _ref;

        _classCallCheck(this, RadioBoxOther);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = RadioBoxOther.__proto__ || Object.getPrototypeOf(RadioBoxOther)).call.apply(_ref, [this].concat(args)));
    }

    _createClass(RadioBoxOther, [{
        key: "checked",
        value: function checked() {
            if (this.text) {
                var value = this.text.value;
                if (empty(value)) value = "other";
                return this.props.checked(value);
            }
            if (this.props.value != null) return this.props.checked(this.props.value);
            return this.props.checked("other");
        }
    }, {
        key: "onClick",
        value: function onClick(e) {
            if (e.target == this.text) return;
            if (e.target == this.radio) return;
            this.onChange();
        }
    }, {
        key: "onSelect",
        value: function onSelect() {
            this.onChange();
            this.forceUpdate();
        }
    }, {
        key: "onChange",
        value: function onChange() {
            var value = void 0;
            if (this.text) value = this.text.value;
            if (empty(value)) value = this.props.value;
            if (empty(value)) value = "other";
            this.props.valueRef(value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var label = this.props.label;
            var checked = this.checked();
            return React.createElement("div", { key: this.props.id || "other", className: "order-wizzard__list-item order-wizzard__radio order-wizzard__radio-other", onClick: this.onClick }, React.createElement("input", { type: "radio", ref: function ref(x) {
                    return _this4.radio = x;
                }, label: label, checked: checked, onChange: this.onSelect }), React.createElement("label", null, React.createElement("span", null, label || "Other")), checked ? React.createElement("input", { type: "text", className: "form-control", ref: function ref(x) {
                    return _this4.text = x;
                }, value: this.props.value, label: label, checked: checked, onChange: this.onChange }) : null);
        }
    }]);

    return RadioBoxOther;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioBoxOther.prototype, "onClick", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioBoxOther.prototype, "onSelect", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], RadioBoxOther.prototype, "onChange", null);
exports.RadioBoxOther = RadioBoxOther;

var RadioGroup = function (_SelectionControl_1$S) {
    _inherits(RadioGroup, _SelectionControl_1$S);

    function RadioGroup() {
        _classCallCheck(this, RadioGroup);

        return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
    }

    _createClass(RadioGroup, [{
        key: "checked",
        value: function checked(value) {
            return this.state.value == value;
        }
    }, {
        key: "onChange",
        value: function onChange(value) {
            var _this6 = this;

            this.setState(function (state) {
                state.value = value;
                _this6.onValueChange(state);
                return state;
            });
        }
    }, {
        key: "renderActiveView",
        value: function renderActiveView() {
            var token = this.token;
            var other = this.props.other;
            return React.createElement("div", { key: this.props.id || token, name: token, className: "order-wizzard__radio-group" }, this.renderOptions(this.props.options), other ? React.createElement(RadioBoxOther, __assign({}, other, { key: this.token + ".other", valueRef: this.onChange, checked: this.checked })) : null);
        }
    }, {
        key: "renderActiveOption",
        value: function renderActiveOption(option, index) {
            return React.createElement(RadioBox, __assign({}, option, { key: this.token + "." + option.value, valueRef: this.onChange, checked: this.checked }));
        }
    }]);

    return RadioGroup;
}(SelectionControl_1.SelectionControl);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', Boolean)], RadioGroup.prototype, "checked", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioGroup.prototype, "onChange", null);
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=RadioGroup.js.map