"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Hourglass {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".hourglass-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".title", (0, skynode_1.el)("h1", "Hourglass"), (0, skynode_1.el)("p", "Estimate Your Returns")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "Current KRNO Price"), (0, skynode_1.el)("p", "$316")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "Current Reward Yield"), (0, skynode_1.el)("p", "0.664%")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "Your sKRNO Balance"), (0, skynode_1.el)("p", "0")))).appendTo(skynode_1.BodyNode));
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Hourglass;
//# sourceMappingURL=Hourglass.js.map