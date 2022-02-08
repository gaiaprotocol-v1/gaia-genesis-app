"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class TeamNFT extends skynode_1.DomNode {
    constructor() {
        super(".team-nft-container");
        this.append((0, skynode_1.el)(".content", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".team-item", (0, skynode_1.el)("h3", "최초의 가이아"), (0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" })), (0, skynode_1.el)(".team-info", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "민팅가"), (0, skynode_1.el)("p", "1,000 KLAY")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "쌓인 복리 이자"), (0, skynode_1.el)("p", "9,999 KLAY")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "받을 수 있는 KLAY수량"), (0, skynode_1.el)("p", "8,999 KLAY")))));
    }
    delete() {
        super.delete();
    }
}
exports.default = TeamNFT;
//# sourceMappingURL=TeamNFT.js.map