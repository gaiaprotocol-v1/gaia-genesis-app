"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class BuybackItem extends skynode_1.DomNode {
    constructor(id) {
        super(".buyback-item");
        this.id = id;
        this.append((0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" }), (0, skynode_1.el)("h3", "가이아#3212"), (0, skynode_1.el)("p", "1,000 KLAY"), (0, skynode_1.el)("button", "바이백"));
    }
    delete() {
        super.delete();
    }
}
exports.default = BuybackItem;
//# sourceMappingURL=BuybackItem.js.map