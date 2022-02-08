"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Mining {
    constructor() {
        Layout_1.default.current.title = "Dashboard";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".dashboard-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".title", (0, skynode_1.el)("h1", "Gaia Protocol"), (0, skynode_1.el)("p", "Dashboard")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "KRNO Price"), (0, skynode_1.el)("p", "$316")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "APY"), (0, skynode_1.el)("p", "150,760.4%")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "Buyback Fund"), (0, skynode_1.el)("p", "231,321 KLAY")))));
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Mining;
//# sourceMappingURL=Dashboard.js.map