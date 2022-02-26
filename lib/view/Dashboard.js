"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const dayjs_1 = __importDefault(require("dayjs"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const GaiaBuyBackFundContract_1 = __importDefault(require("../contracts/GaiaBuyBackFundContract"));
const GaiaOperationContract_1 = __importDefault(require("../contracts/GaiaOperationContract"));
const lpContract_1 = __importDefault(require("../contracts/lpContract"));
const sKRNOContract_1 = __importDefault(require("../contracts/sKRNOContract"));
const StakingContract_1 = __importDefault(require("../contracts/StakingContract"));
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const Layout_1 = __importDefault(require("./Layout"));
class Mining {
    constructor() {
        Layout_1.default.current.title = (0, msg_js_1.default)("DASHBOARD_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.dashboard-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("DASHBOARD_TITLE")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("DASHBOARD_DESC"))), (0, skynode_1.el)("img", { src: "/images/view/dashboard/banner.png" }), (0, skynode_1.el)("article", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("KRNO_PRICE_TITLE")), this.krnoPriceDisplay = (0, skynode_1.el)("p", "$...")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("ARY_TITLE")), this.apyDisplay = (0, skynode_1.el)("p", "...%")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("DASHBOARD_BUYBACK_TITLE")), this.buybackBalanceDisplay = (0, skynode_1.el)("p", "... KLAY")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("TOTAL_GAIA_INTEREST_TITLE")), this.interestBalanceDisplay = (0, skynode_1.el)("p", "... KLAY")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("REBASE_ROUND_TITLE")), this.roundBalanceDisplay = (0, skynode_1.el)("p", "... ROUND")))));
        this.init();
    }
    async init() {
        this.loadKRNOPrice();
        this.loadAPY();
        this.loadBuybackBalance();
        this.loadGenesisGaiaKlay();
        this.loadRebaseRound();
    }
    async loadRebaseRound() {
        dayjs_1.default.extend(isSameOrAfter_1.default);
        let result = (0, dayjs_1.default)().diff('2022-02-11', 'days') * 3;
        const current = (0, dayjs_1.default)();
        if (current.isSameOrAfter(current.set('h', 23).set('m', 4))) {
            result = result + 3;
        }
        else if (current.isSameOrAfter(current.set('h', 15).set('m', 4))) {
            result = result + 2;
        }
        else if (current.isSameOrAfter(current.set('h', 7).set('m', 4))) {
            result = result + 1;
        }
        this.roundBalanceDisplay.empty().appendText(`${result} ROUND`);
    }
    async loadGenesisGaiaKlay() {
        const klay = await GaiaOperationContract_1.default.claimableKlay([0]);
        if (this.container.deleted !== true) {
            this.interestBalanceDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(klay))} KLAY`);
        }
    }
    async loadKRNOPrice() {
        const pool = await lpContract_1.default.getCurrentPool();
        if (this.container.deleted !== true) {
            this.krnoPriceDisplay.empty().appendText(`$ ${CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
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