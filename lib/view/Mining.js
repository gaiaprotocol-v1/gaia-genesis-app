"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debouncer_1 = __importDefault(require("@hanul/debouncer"));
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyutil_1 = __importDefault(require("skyutil"));
const MiningItem_1 = __importDefault(require("../component/MiningItem"));
const Confirm_1 = __importDefault(require("../component/shared/dialogue/Confirm"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const GaiaOperationContract_1 = __importDefault(require("../contracts/GaiaOperationContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Mining {
    constructor() {
        this.tokenIds = [];
        this.krnos = [];
        this.totalKlay = ethers_1.BigNumber.from(0);
        this.resizeDebouncer = new debouncer_1.default(200, () => this.loadNFTs());
        Layout_1.default.current.title = "Mining";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.mining-view", (0, skynode_1.el)("header", { "data-aos": "zoom-in" }, (0, skynode_1.el)("h1", "Mining"), (0, skynode_1.el)("h2", "소유한 NFT로부터 채굴")), (0, skynode_1.el)("article", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".tool-box", (0, skynode_1.el)(".title-container", (0, skynode_1.el)("header", "나의 NFT"), this.totalKRNODisplay = (0, skynode_1.el)("p", "총 이자: ... KRNO"), this.totalKlayDisplay = (0, skynode_1.el)("p", "총 이자: ... KLAY")), (0, skynode_1.el)(".button-container", (0, skynode_1.el)("button.all-mining-button", "모두 KRNO로 받기", {
            click: () => {
                new Confirm_1.default("KRON 받기", "이자를 수령하시겠습니까? 이자를 자주 수령하시면 복리 효과를 누리기 어려울 수 있습니다.", "계속 진행", async () => {
                    await GaiaOperationContract_1.default.claim(this.tokenIds, this.krnos);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                });
            },
        }), (0, skynode_1.el)("button.all-mining-button", "모두 KLAY로 받기", {
            click: () => {
                new Confirm_1.default("KLAY로 받기", "이자를 수령하시겠습니까? 이자를 자주 수령하시면 복리 효과를 누리기 어려울 수 있습니다.", "계속 진행", async () => {
                    await GaiaOperationContract_1.default.claimKlayViaZap(this.tokenIds, this.krnos, this.totalKlay, []);
                    ViewUtil_1.default.waitTransactionAndRefresh();
                });
            },
        }))), this.nftList = (0, skynode_1.el)("article.nft-container", { "data-aos": "zoom-in" }))));
        this.resizeDebouncer.run();
        Wallet_1.default.on("connect", () => this.resizeDebouncer.run());
    }
    async loadNFTs() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = (await GaiaNFTContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            this.tokenIds = [];
            skyutil_1.default.repeat(balance, (i) => {
                const promise = async (index) => {
                    const item = new MiningItem_1.default().appendTo(this.nftList);
                    const tokenId = (await GaiaNFTContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    if (tokenId === 0) {
                        item.delete();
                    }
                    else {
                        item.init(tokenId);
                        this.tokenIds.push(tokenId);
                        this.krnos.push(await GaiaOperationContract_1.default.claimableKRNO([tokenId]));
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);
            const totalKRNO = await GaiaOperationContract_1.default.claimableKRNO(this.tokenIds);
            this.totalKRNODisplay.empty().appendText(`총 이자: ${ethers_1.utils.formatEther(totalKRNO)} KRNO`);
            this.totalKlay = await GaiaOperationContract_1.default.claimableKlay(this.tokenIds);
            this.totalKlayDisplay.empty().appendText(`총 이자: ${ethers_1.utils.formatEther(this.totalKlay)} KLAY`);
        }
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Mining;
//# sourceMappingURL=Mining.js.map