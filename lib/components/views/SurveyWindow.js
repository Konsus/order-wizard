"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const React = require("react");
const Modal = require("react-modal");
const core_decorators_1 = require("core-decorators");
class SurveyWindow extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    componentWillMount() {
        this.state.visible = this.props.visible;
    }
    open() {
        this.setState(state => {
            state.visible = true;
            return state;
        });
    }

    close() {
        this.setState(state => {
            state.visible = false;
            return state;
        });
    }

    render() {
        return React.createElement("div", null, React.createElement("button", { onClick: this.open }, this.props.name || "Open Window"), React.createElement(Modal, { isOpen: this.state.visible, onRequestClose: this.close, style: customStyles }, React.createElement("div", { className: "modal-cross-close", onClick: this.close }), this.props.children));
    }
}
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SurveyWindow.prototype, "open", null);
__decorate([core_decorators_1.autobind, __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SurveyWindow.prototype, "close", null);
exports.SurveyWindow = SurveyWindow;
const customStyles = {
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