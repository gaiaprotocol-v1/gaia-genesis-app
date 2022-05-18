"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
class TransferPopup extends skynode_1.Popup {
    constructor(confirm) {
        super(".popup-background");
        this.append(this.content = (0, skynode_1.el)(".dialogue.transfer-popup", (0, skynode_1.el)("h2", (0, msg_js_1.default)("SEND_PROMPT_TITLE")), (0, skynode_1.el)("p", (0, msg_js_1.default)("SEND_PROMPT_DESC")), (0, skynode_1.el)(".warning-container", (0, skynode_1.el)("img", { src: "/images/shared/icn/warning.svg", alt: "warning" }), (0, skynode_1.el)("p.warning", (0, msg_js_1.default)("SEND_PROMPT_WARNING_DESC"))), (0, skynode_1.el)(".input-container", this.input = (0, skynode_1.el)("input", { placeholder: (0, msg_js_1.default)("SEND_PROMPT_INPUT"), min: "40" })), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button", (0, msg_js_1.default)("CANCEL_BUTTON"), {
            click: () => this.delete(),
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("SEND_PROMPT_BUTTON"), {
            click: () => {
                confirm(this.input.domElement.value);
                this.delete();
            },
        }))));
    }
}
exports.default = TransferPopup;
//# sourceMappingURL=transferPopup.js.map