"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

var CheckBox = function (_React$Component) {
    _inherits(CheckBox, _React$Component);

    function CheckBox() {
        _classCallCheck(this, CheckBox);

        return _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).apply(this, arguments));
    }

    _createClass(CheckBox, [{
        key: "onClick",
        value: function onClick(e) {
            if (e.target != this.input) this.input.click();
        }
    }, {
        key: "onChange",
        value: function onChange() {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var label = this.props.label;
            var value = this.props.value;
            var checked = this.props.group.checked(value);
            return React.createElement("div", { className: "order-wizzard__list-item order-wizzard__checkbox", key: this.props.id || value, onClick: this.onClick }, React.createElement("input", { type: "checkbox", ref: function ref(x) {
                    return _this2.input = x;
                }, value: value, label: label, checked: checked, onChange: this.onChange }), React.createElement("label", null, React.createElement("span", null, label || value)));
        }
    }]);

    return CheckBox;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], CheckBox.prototype, "onClick", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], CheckBox.prototype, "onChange", null);
exports.CheckBox = CheckBox;

var CheckGroup = function (_SelectionControl_1$S) {
    _inherits(CheckGroup, _SelectionControl_1$S);

    function CheckGroup() {
        _classCallCheck(this, CheckGroup);

        return _possibleConstructorReturn(this, (CheckGroup.__proto__ || Object.getPrototypeOf(CheckGroup)).apply(this, arguments));
    }

    _createClass(CheckGroup, [{
        key: "checked",
        value: function checked(value) {
            return this.state.value.indexOf(value) >= 0;
        }
    }, {
        key: "onChange",
        value: function onChange(event) {
            var _this4 = this;

            event.persist();
            this.setState(function (state) {
                var input = event.target;
                var index = state.value.indexOf(input.value);
                // add / remove item
                if (input.checked) {
                    if (index < 0) state.value.push(input.value);
                } else {
                    if (index >= 0) state.value.splice(index, 1);
                }
                // do not send empty array to form
                var value = state.value;
                if (value.length < 1) state.value = null;
                _this4.onValueChange(state);
                state.value = value;
                return state;
            });
        }
    }, {
        key: "initialValue",
        value: function initialValue() {
            return _get(CheckGroup.prototype.__proto__ || Object.getPrototypeOf(CheckGroup.prototype), "initialValue", this).call(this) || [];
        }
    }, {
        key: "renderActiveView",
        value: function renderActiveView() {
            return React.createElement("div", { key: this.props.id || this.token, onChange: this.onChange, className: "order-wizzard__checkbox-group" }, this.renderOptions(this.props.options));
        }
    }, {
        key: "renderActiveOption",
        value: function renderActiveOption(option, index) {
            return React.createElement(CheckBox, __assign({}, option, { key: this.token + "." + option.value, group: this }));
        }
    }]);

    return CheckGroup;
}(SelectionControl_1.SelectionControl);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], CheckGroup.prototype, "onChange", null);
exports.CheckGroup = CheckGroup;
//# sourceMappingURL=CheckGroup.js.map