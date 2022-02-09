"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const GaiaBuyBackFundContract_1 = __importDefault(require("../contracts/GaiaBuyBackFundContract"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class BuybackItem extends skynode_1.DomNode {
    constructor(refundableKlay) {
        super(".buyback-item");
        this.id = -1;
        this.append(this.imageDisplay = (0, skynode_1.el)("img"), this.nameDisplay = (0, skynode_1.el)("h3"), (0, skynode_1.el)("p", `${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(refundableKlay))} KLAY`), (0, skynode_1.el)("button", "바이백", {
            click: async () => {
                await GaiaBuyBackFundContract_1.default.sellGaiaNFT([this.id]);
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }));
    }
    init(id) {
        this.id = id;
        this.imageDisplay.domElement.src = `https://storage.googleapis.com/gaia-protocol/kronos/${id}.png`;
        this.nameDisplay.appendText(`#${this.id}`);
    }
    delete() {
        super.delete();
    }
}
exports.default = BuybackItem;
//# sourceMappingURL=BuybackItem.js.map