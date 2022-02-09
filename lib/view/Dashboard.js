"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const GaiaBuyBackFundContract_1 = __importDefault(require("../contracts/GaiaBuyBackFundContract"));
const lpContract_1 = __importDefault(require("../contracts/lpContract"));
const sKRNOContract_1 = __importDefault(require("../contracts/sKRNOContract"));
const StakingContract_1 = __importDefault(require("../contracts/StakingContract"));
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const Layout_1 = __importDefault(require("./Layout"));
class Mining {
    constructor() {
        Layout_1.default.current.title = "Dashboard";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.dashboard-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "Gaia Protocol"), (0, skynode_1.el)("h2", "Dashboard")), (0, skynode_1.el)("article", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "KRNO Price"), this.krnoPriceDisplay = (0, skynode_1.el)("p", "$...")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "APY"), this.apyDisplay = (0, skynode_1.el)("p", "...%")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "Buyback Fund"), this.buybackBalanceDisplay = (0, skynode_1.el)("p", "... KLAY")))));
        this.loadKRNOPrice();
        this.loadAPY();
        this.loadBuybackBalance();
    }
    async loadKRNOPrice() {
        const pool = await lpContract_1.default.getCurrentPool();
        if (this.container.deleted !== true) {
            this.krnoPriceDisplay.empty().appendText(`$${CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
        }
    }
    async loadAPY() {
        const stakingRebaseValue = (await StakingContract_1.default.epoch()).distribute / await sKRNOContract_1.default.circulatingSupply();
        const apy = (Math.pow(1 + stakingRebaseValue, 365 * 3) - 1) * 100;
        if (this.container.deleted !== true) {
            this.apyDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(String(apy))}%`);
        }
    }
    async loadBuybackBalance() {
        const balance = await Klaytn_1.default.balanceOf(GaiaBuyBackFundContract_1.default.address);
        if (this.container.deleted !== true) {
            this.buybackBalanceDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance))} KLAY`);
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Mining;
//# sourceMappingURL=Dashboard.js.map