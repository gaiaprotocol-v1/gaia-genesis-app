"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const GaiaOperationContract_1 = __importDefault(require("../contracts/GaiaOperationContract"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
class MiningItem extends skynode_1.DomNode {
    constructor() {
        super(".mining-item");
        this.id = -1;
        this.krno = ethers_1.BigNumber.from(0);
        this.klay = ethers_1.BigNumber.from(0);
        this.append((0, skynode_1.el)("img", { src: "/images/nft/sneakpeek1.jpeg" }), this.nameDisplay = (0, skynode_1.el)("h3"), (0, skynode_1.el)("img.send", { src: "/images/icon/send.svg", alt: "send icon" }), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)(".amount-wrap", this.krnoDisplay = (0, skynode_1.el)(".krno", "... KRNO"), this.klayDisplay = (0, skynode_1.el)(".klay", "... KLAY")), (0, skynode_1.el)("button.krno-button", "KRON 받기", {
            click: async () => {
                await GaiaOperationContract_1.default.claim([this.id], [this.krno]);
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        }), (0, skynode_1.el)("button.klay-button", "KLAY로 받기", {
            click: async () => {
                await GaiaOperationContract_1.default.claimKlayViaZap([this.id], [this.krno], this.klay, []);
                ViewUtil_1.default.waitTransactionAndRefresh();
            },
        })));
    }
    init(id) {
        this.id = id;
        this.nameDisplay.appendText(`#${this.id}`);
        this.loadKRNO();
        this.loadKlay();
    }
    async loadKRNO() {
        this.krno = await GaiaOperationContract_1.default.claimableKRNO([this.id]);
        this.krnoDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(this.krno))} KRNO`);
    }
    async loadKlay() {
        this.klay = await GaiaOperationContract_1.default.claimableKlay([this.id]);
        this.klayDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(this.klay))} KLAY`);
    }
    delete() {
        super.delete();
    }
}
exports.default = MiningItem;
//# sourceMappingURL=MiningItem.js.map