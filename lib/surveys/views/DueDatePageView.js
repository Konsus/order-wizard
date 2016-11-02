"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
require("react-date-picker/index.css");
require("react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css");
var React = require("react");
var core_decorators_1 = require("core-decorators");
var SelectionControl_1 = require("../../components/controls/SelectionControl");
var RadioGroup_1 = require("../../components/controls/RadioGroup");
var SurveyPage_1 = require("../../components/views/SurveyPage");
var common_1 = require("../../data/common");
var moment = require("moment-timezone");
var ReactDatePicker = require("react-date-picker");
var Calendar = ReactDatePicker.Calendar;
var DateField = ReactDatePicker.DateField;
var DateFormatSpinnerInput = ReactDatePicker.DateFormatSpinnerInput;
var TimezonePicker = require("react-bootstrap-timezone-picker").default;
var momentTz = moment.tz;
momentTz.load(require("moment-timezone/data/packed/latest.json"));

var DueDatePageView = function (_SelectionControl_1$S) {
    _inherits(DueDatePageView, _SelectionControl_1$S);

    function DueDatePageView() {
        var _ref;

        _classCallCheck(this, DueDatePageView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = DueDatePageView.__proto__ || Object.getPrototypeOf(DueDatePageView)).call.apply(_ref, [this].concat(args)));

        var value = _this.state.value;
        if (value != null && value != "no") _this.state.visibleDate = true;
        _this.state.timezone = momentTz.guess();
        return _this;
    }

    _createClass(DueDatePageView, [{
        key: "onSelect",
        value: function onSelect(value) {
            var _this2 = this;

            switch (value) {
                case "yes":
                    this.setState(function (state) {
                        state.visibleDate = true;
                        state.value = value;
                        _this2.onValueChange(state);
                        return state;
                    });
                    break;
                case "no":
                    this.setState(function (state) {
                        state.visibleDate = false;
                        state.value = value;
                        _this2.onValueChange(state);
                        return state;
                    });
                    break;
            }
        }
    }, {
        key: "onSetDate",
        value: function onSetDate(dateString, _ref2) {
            var dateMoment = _ref2.dateMoment;

            var select = moment(dateMoment);
            var value = this.dateValueOrDefault;
            value.year(select.year());
            value.month(select.month());
            value.day(select.day());
            value = momentTz(value, this.state.timezone);
            this.setValue(value);
        }
    }, {
        key: "onSetTime",
        value: function onSetTime(dateString, _ref3) {
            var dateMoment = _ref3.dateMoment;

            var select = moment(dateMoment);
            var value = this.dateValueOrDefault;
            value.hour(select.hour());
            value.minute(select.minute());
            value.second(select.second());
            value = momentTz(value, this.state.timezone);
            this.setValue(value);
        }
    }, {
        key: "onSetZone",
        value: function onSetZone(zoneName) {
            var _this3 = this;

            var value = momentTz(this.dateValueOrDefault, zoneName);
            this.setState(function (state) {
                state.timezone = zoneName;
                state.value = value.format();
                _this3.onValueChange(state);
                return state;
            });
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            var _this4 = this;

            this.setState(function (state) {
                state.value = value.format();
                _this4.onValueChange(state);
                return state;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var value = this.state.value;
            if (isFinite(value)) value = "yes";
            return React.createElement(SurveyPage_1.SurveyPage, __assign({}, this.props), React.createElement(RadioGroup_1.RadioGroup, __assign({}, this.props, { options: common_1.DueDateQuestion.options, token: null, value: value, valueRef: this.onSelect })), this.renderDate());
        }
    }, {
        key: "renderDate",
        value: function renderDate() {
            if (!this.state.visibleDate) return null;
            var value = this.dateValueOrDefault;
            return React.createElement("div", { className: "order-wizzard__date-group" }, React.createElement("span", null, this.renderDateView(value)), React.createElement("span", null, this.renderTimeView(value)), React.createElement("span", null, this.renderZoneView(value)));
        }
    }, {
        key: "renderDateView",
        value: function renderDateView(date) {
            return React.createElement(DateField, { value: date, forceValidDate: true, updateOnDateClick: true, dateFormat: "YYYY-MM-DD", onChange: this.onSetDate }, React.createElement(Calendar, { style: { padding: 10 } }));
        }
    }, {
        key: "renderTimeView",
        value: function renderTimeView(date) {
            return React.createElement(DateFormatSpinnerInput, { value: date, isDateInput: false, dateFormat: "HH:mm:ss", onChange: this.onSetTime });
        }
    }, {
        key: "renderZoneView",
        value: function renderZoneView(date) {
            return React.createElement(TimezonePicker, { defaultValue: this.state.timezone, onChange: this.onSetZone });
        }
    }, {
        key: "token",
        get: function get() {
            var token = _get(DueDatePageView.prototype.__proto__ || Object.getPrototypeOf(DueDatePageView.prototype), "token", this);
            if (token != null) return token;
            var questions = this.props.questions;
            if (questions != null && questions.length > 0) token = questions[0].token;
            if (token == null) token = common_1.DueDateQuestion.token;
            return token;
        }
    }, {
        key: "defaultTimeUtc",
        get: function get() {
            var retVal = moment().utc();
            retVal.add(1, 'day');
            retVal.minute(0);
            retVal.second(0);
            return retVal;
        }
    }, {
        key: "defaultTimeByZone",
        get: function get() {
            return momentTz(this.defaultTimeUtc, this.state.timezone);
        }
    }, {
        key: "dateValueOrDefault",
        get: function get() {
            if (this.state.value == "yes") return this.defaultTimeByZone;
            var value = momentTz(this.state.value, this.state.timezone);
            if (value.isValid()) return value;
            return this.defaultTimeByZone;
        }
    }]);

    return DueDatePageView;
}(SelectionControl_1.SelectionControl);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSelect", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object, Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSetDate", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [Object, Object]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSetTime", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', [String]), __metadata('design:returntype', void 0)], DueDatePageView.prototype, "onSetZone", null);
exports.DueDatePageView = DueDatePageView;
//# sourceMappingURL=DueDatePageView.js.map