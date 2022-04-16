"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const GaiaOperationContract_1 = __importDefault(require("../contracts/GaiaOperationContract"));
const NFTAirdropContract_1 = __importDefault(require("../contracts/NFTAirdropContract"));
const ViewUtil_1 = __importDefault(require("../view/ViewUtil"));
const Alert_1 = __importDefault(require("./shared/dialogue/Alert"));
const Prompt_1 = __importDefault(require("./shared/dialogue/Prompt"));
class MiningItem extends skynode_1.DomNode {
    constructor() {
        super(".mining-item");
        this.id = -1;
        this.krno = ethers_1.BigNumber.from(0);
        this.klay = ethers_1.BigNumber.from(0);
        this.append(this.imageDisplay = (0, skynode_1.el)("img"), this.nameDisplay = (0, skynode_1.el)("h3"), (0, skynode_1.el)("a", (0, skynode_1.el)("img.send", { src: "/images/shared/icn/send.svg", alt: "send icon" }), {
            click: () => new Prompt_1.default((0, msg_js_1.default)("SEND_PROMPT_TITLE"), (0, msg_js_1.default)("SEND_PROMPT_DESC"), (0, msg_js_1.default)("SEND_PROMPT_BUTTON"), async (to) => {
                await GaiaNFTContract_1.default.transfer(to, this.id);
                ViewUtil_1.default.waitTransactionAndRefresh();
            }),
        }), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("section", (0, skynode_1.el)("header", (0, msg_js_1.default)("MY_INTEREST_DESC")), (0, skynode_1.el)(".amount-wrap", this.krnoDisplay = (0, skynode_1.el)(".krno", "... KRNO"), this.klayDisplay = (0, skynode_1.el)(".klay", "... KLAY"))), (0, skynode_1.el)(".button-wrap", (0, skynode_1.el)("button.krno-button", (0, msg_js_1.default)("CLAIM_KRNO_BUTTON"), {
            click: () => {
                new Prompt_1.default((0, msg_js_1.default)("CLAIM_KRNO_ALERT_TITLE"), (0, msg_js_1.default)("CLAIM_ALERT_DESC"), (0, msg_js_1.default)("CLAIM_ALERT_BUTTON"), async (amount) => {
                    const krno = ethers_1.utils.parseUnits(amount, 9);
                    if (krno > this.krno) {
                        new Alert_1.default((0, msg_js_1.default)("CLAIM_ERROR_ALERT_TITLE"), (0, msg_js_1.default)("CLAIM_ERROR_ALERT_DESC"));
                    }
                    else {
                        await GaiaOperationContract_1.default.claim([this.id], [krno]);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    }
                }, (0, msg_js_1.default)("CLAIM_PLACEHOLDER_INPUT"));
            },
        }), (0, skynode_1.el)("button.klay-button", (0, msg_js_1.default)("CLAIM_KLAY_BUTTON"), {
            click: () => {
                new Prompt_1.default((0, msg_js_1.default)("CLAIM_KLAY_ALERT_TITLE"), (0, msg_js_1.default)("CLAIM_KLAY_ALERT_DESC"), (0, msg_js_1.default)("CLAIM_ALERT_BUTTON"), async (amount) => {
                    const klay = ethers_1.utils.parseEther(amount);
                    if (klay > this.klay) {
                        new Alert_1.default((0, msg_js_1.default)("CLAIM_ERROR_ALERT_TITLE"), (0, msg_js_1.default)("CLAIM_ERROR_ALERT_DESC"));
                    }
                    else {
                        await GaiaOperationContract_1.default.claimKlayViaZap([this.id], [this.krno.mul(klay).div(this.klay)], klay, []);
                        ViewUtil_1.default.waitTransactionAndRefresh();
                    }
                }, (0, msg_js_1.default)("CLAIM_PLACEHOLDER_INPUT"));
            },
        }))), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("section", (0, skynode_1.el)("header", "이머전시 리워드"), (0, skynode_1.el)(".amount-wrap", this.emergencyDisplay = (0, skynode_1.el)(".klay", "... KLAY"))), (0, skynode_1.el)(".button-wrap", (0, skynode_1.el)("button.klay-button", "리워드 받기", {
            click: async () => {
                await NFTAirdropContract_1.default.collectAirdropReward(0, [this.id]);
                ViewUtil_1.default.waitTransactionAndRefresh();
            }
        }))));
    }
    init(id, reward, collected) {
        this.id = id;
        this.imageDisplay.domElement.src = `https://storage.googleapis.com/gaia-protocol/kronos/${id}.png`;
        this.nameDisplay.appendText(`#${this.id}`);
        this.loadKRNO();
        this.loadKlay();
        this.emergencyDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(reward.sub(collected)), 5)} KLAY`);
    }
    async loadKRNO() {
        this.krno = await GaiaOperationContract_1.default.claimableKRNO([this.id]);
        this.krnoDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatUnits(this.krno, 9))} KRNO`);
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
//# sourceMappingURL=MiningItem%20copy.js.map