"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
class UserInfo extends skynode_1.DomNode {
    constructor() {
        super(".user-info");
        this.connectHandler = () => {
            this.loadAddress();
        };
        this.append(this.connectWalletButton = (0, skynode_1.el)("a.connect-wallet", "Connect Wallet", {
            click: () => Wallet_1.default.connect(),
        }), this.addressDisplay = (0, skynode_1.el)("a.wallet-address"));
        this.addressDisplay.style({ display: "none" });
        Wallet_1.default.on("connect", this.connectHandler);
        this.loadAddress();
    }
    async loadAddress() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined && this.deleted !== true) {
            if (this.connectWalletButton.deleted !== true) {
                this.connectWalletButton.delete();
            }
            this.addressDisplay.style({ display: "block" });
            this.addressDisplay.empty().appendText(CommonUtil_1.default.shortenAddress(address));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = UserInfo;
//# sourceMappingURL=userInfo.js.map