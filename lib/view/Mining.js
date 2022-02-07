"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Mining {
    constructor() {
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mining-view", (0, skynode_1.el)(".title", { "data-aos": "zoom-in" }, (0, skynode_1.el)("h1", "Mining"), (0, skynode_1.el)("p", "Mining Your NFT")), (0, skynode_1.el)(".team-nft-container", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".content", (0, skynode_1.el)("h2", "Team NFT"), (0, skynode_1.el)(".team-item", (0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" }), (0, skynode_1.el)("h3", "가이아#0"), (0, skynode_1.el)("p.amount", "KRNO 12"), (0, skynode_1.el)("p.caption", "(= 1,200 KLAY)")))), (0, skynode_1.el)(".my-nft-container", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".tool-box", (0, skynode_1.el)(".title-wrap", (0, skynode_1.el)("h2", "My NFT"), (0, skynode_1.el)("p", "총 이자: KRNO 12")), (0, skynode_1.el)("button.all-mining-button", "All Mining")), (0, skynode_1.el)(".nft-container", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".nft-item", (0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" }), (0, skynode_1.el)("h3", "가이아#3212"), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("p.amount", "KRNO 12"), (0, skynode_1.el)("button", "Mining")))))).appendTo(skynode_1.BodyNode));
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Mining;
//# sourceMappingURL=Mining.js.map