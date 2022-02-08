"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const TeamNFT_1 = __importDefault(require("../component/TeamNFT"));
const Layout_1 = __importDefault(require("./Layout"));
class Buyback {
    constructor() {
        Layout_1.default.current.title = "Buyback";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buyback-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".title", (0, skynode_1.el)("h1", "Buyback"), (0, skynode_1.el)("p", "가이아 바이백 펀드")), new TeamNFT_1.default(), (0, skynode_1.el)(".nft-container", (0, skynode_1.el)(".nft-item", (0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" }), (0, skynode_1.el)("h3", "가이아#3212"), (0, skynode_1.el)("p", "1,000 KLAY"), (0, skynode_1.el)("button", "바이백")))));
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Buyback;
//# sourceMappingURL=Buyback.js.map