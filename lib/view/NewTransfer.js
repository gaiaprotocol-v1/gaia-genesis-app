"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debouncer_1 = __importDefault(require("@hanul/debouncer"));
const skynode_1 = require("@hanul/skynode");
const dayjs_1 = __importDefault(require("dayjs"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const skyutil_1 = __importDefault(require("skyutil"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const NewTransferItem_1 = __importDefault(require("../component/NewTransferItem"));
const Alert_1 = __importDefault(require("../component/shared/dialogue/Alert"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const GaiaOperationContract_1 = __importDefault(require("../contracts/GaiaOperationContract"));
const NFTAirdropContract_1 = __importDefault(require("../contracts/NFTAirdropContract"));
const StakingContract_1 = __importDefault(require("../contracts/StakingContract"));
const Klaytn_1 = __importDefault(require("../klaytn/Klaytn"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class NewTransfer {
    constructor() {
        this.tokenIds = [];
        this.krnos = [];
        this.totalKlay = ethers_1.BigNumber.from(0);
        this.loadNFTsDebouncer = new debouncer_1.default(200, () => this.loadNFTs());
        Layout_1.default.current.title = "New Transfer";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.mining-view", (0, skynode_1.el)("header", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".title-container", (0, skynode_1.el)("h1", "New Transfer"), this.rebaseDisplay = (0, skynode_1.el)("h2", (0, msg_js_1.default)("REBASE_TIME_DESC").replace(/{time}/, String("0")))), (0, skynode_1.el)(".input-container", this.idInput = (0, skynode_1.el)("input", { placeholder: "NFT ID" }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CHECK_INTEREST_TITLE"), {
            click: async () => {
                const id = this.idInput.domElement.value;
                const krno = await GaiaOperationContract_1.default.claimableKRNO([id]);
                const klay = await GaiaOperationContract_1.default.claimableKlay([id]);
                new Alert_1.default((0, msg_js_1.default)("CHECK_INTEREST_TITLE"), (0, msg_js_1.default)("CHECK_INTEREST_DESC")
                    .replace(/{id}/, String(id))
                    .replace(/{krnoAmount}/, String(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatUnits(krno, 9))))
                    .replace(/{klayAmount}/, String(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(klay)))));
            }
        }))), (0, skynode_1.el)("article", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".tool-box", (0, skynode_1.el)(".title-container", (0, skynode_1.el)("header", (0, msg_js_1.default)("MY_NFT_TITLE")), this.totalKRNODisplay = (0, skynode_1.el)("p", (0, msg_js_1.default)("MY_INTEREST_KRNO_DESC").replace(/{amount}/, String("..."))), this.totalKlayDisplay = (0, skynode_1.el)("p", (0, msg_js_1.default)("MY_INTEREST_KLAY_DESC").replace(/{amount}/, String("..."))), this.totalEmergencyDisplay = (0, skynode_1.el)("p", "총 이머전시 리워드: ... KLAY")), (0, skynode_1.el)(".button-container")), this.nftList = (0, skynode_1.el)("article.nft-container", { "data-aos": "zoom-in" }))));
        this.loadNFTsDebouncer.run();
        this.interval = setInterval(() => this.loadRebase(), 1000);
        Wallet_1.default.on("connect", () => this.loadNFTsDebouncer.run());
    }
    async loadNFTs() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const reward = await NFTAirdropContract_1.default.airdropReward(0);
            const balance = (await GaiaNFTContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            this.tokenIds = [];
            let totalEmergency = ethers_1.BigNumber.from(0);
            skyutil_1.default.repeat(balance, (i) => {
                const promise = async (index) => {
                    const item = new NewTransferItem_1.default().appendTo(this.nftList);
                    const tokenId = (await GaiaNFTContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    const collected = await NFTAirdropContract_1.default.airdropCollected(0, tokenId);
                    if (tokenId === 0) {
                        item.delete();
                    }
                    else {
                        item.init(tokenId, reward, collected);
                        const krno = await GaiaOperationContract_1.default.claimableKRNO([tokenId]);
                        this.tokenIds.push(tokenId);
                        this.krnos.push(krno);
                        totalEmergency = totalEmergency.add(reward.sub(collected));
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);
            const totalKRNO = await GaiaOperationContract_1.default.claimableKRNO(this.tokenIds);
            this.totalKRNODisplay.empty().appendText(`${(0, msg_js_1.default)("MY_INTEREST_KRNO_DESC").replace(/{amount}/, String(ethers_1.utils.formatUnits(totalKRNO, 9)))}`);
            this.totalKlay = await GaiaOperationContract_1.default.claimableKlay(this.tokenIds);
            this.totalKlayDisplay.empty().appendText(`${(0, msg_js_1.default)("MY_INTEREST_KLAY_DESC").replace(/{amount}/, String(ethers_1.utils.formatEther(this.totalKlay)))}`);
            this.totalEmergencyDisplay.empty().appendText(`총 이머전시 리워드: ${String(ethers_1.utils.formatEther(totalEmergency))} KLAY`);
        }
    }
    async loadRebase() {
        const stakingRebaseTime = (await StakingContract_1.default.epoch()).endTime;
        const blockNumber = await Klaytn_1.default.loadBlockTime();
        const diff = stakingRebaseTime - blockNumber;
        let hour = Math.floor(diff / 3600);
        let min = Math.floor((diff % 3600) / 60);
        if (Math.sign(hour) <= 0) {
            hour = 0;
        }
        let round = (0, dayjs_1.default)().diff('2022-02-11', 'days') * 3;
        const current = (0, dayjs_1.default)();
        dayjs_1.default.extend(isSameOrAfter_1.default);
        if (current.isSameOrAfter(current.set('h', 23).set('m', 4))) {
            round = round + 3;
        }
        else if (current.isSameOrAfter(current.set('h', 15).set('m', 4))) {
            round = round + 2;
        }
        else if (current.isSameOrAfter(current.set('h', 7).set('m', 4))) {
            round = round + 1;
        }
        this.rebaseDisplay.empty().appendText((0, msg_js_1.default)("REBASE_TIME_DESC")
            .replace(/{hour}/, String(hour))
            .replace(/{min}/, String(min))
            .replace(/{round}/, String(round + 1)));
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = NewTransfer;
//# sourceMappingURL=NewTransfer.js.map