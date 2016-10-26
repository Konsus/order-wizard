"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Modal = require("react-modal");
var core_decorators_1 = require("core-decorators");

var SurveyWindow = function (_React$Component) {
    _inherits(SurveyWindow, _React$Component);

    function SurveyWindow() {
        var _ref;

        _classCallCheck(this, SurveyWindow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SurveyWindow.__proto__ || Object.getPrototypeOf(SurveyWindow)).call.apply(_ref, [this].concat(args)));

        _this.state = {
            visible: _this.props.visible,
            debug: _this.props.debug
        };
        return _this;
    }

    _createClass(SurveyWindow, [{
        key: "open",
        value: function open() {
            this.setState(function (state) {
                state.visible = true;
                return state;
            });
        }
    }, {
        key: "close",
        value: function close() {
            this.setState(function (state) {
                state.visible = false;
                return state;
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", null, this.state.debug ? this.renderDebug() : null, React.createElement(Modal, { isOpen: this.state.visible, onRequestClose: this.close, style: customStyles }, React.createElement("div", { className: "modal-cross-close", onClick: this.close }), this.props.children));
        }
    }, {
        key: "renderDebug",
        value: function renderDebug() {
            return React.createElement("button", { type: "button", className: "btn btn-primary btn-block btn-lg", style: { margin: 2 }, onClick: this.open }, this.props.name || "Open Window");
        }
    }]);

    return SurveyWindow;
}(React.Component);

__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SurveyWindow.prototype, "open", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SurveyWindow.prototype, "close", null);
exports.SurveyWindow = SurveyWindow;
var customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: 0,
        borderRadius: '4px',
        border: 'none'
    }
};
//# sourceMappingURL=SurveyWindow.js.map