"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class MiningItem extends skynode_1.DomNode {
    constructor(id) {
        super(".mining-item");
        this.id = id;
        this.append((0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" }), (0, skynode_1.el)("h3", `#${id}`), (0, skynode_1.el)("img.send", { src: "/images/icon/send.svg", alt: "send icon" }), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)(".amount-wrap", (0, skynode_1.el)(".krno", "12 KRNO"), (0, skynode_1.el)(".klay", "1200 KLAY")), (0, skynode_1.el)("button.krno-button", "KRON 받기"), (0, skynode_1.el)("button.klay-button", "KLAY로 받기")));
    }
    delete() {
        super.delete();
    }
}
exports.default = MiningItem;
//# sourceMappingURL=MiningItem.js.map