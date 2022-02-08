"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debouncer_1 = __importDefault(require("@hanul/debouncer"));
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const MiningItem_1 = __importDefault(require("../component/MiningItem"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Mining {
    constructor() {
        this.resizeDebouncer = new debouncer_1.default(200, () => this.loadNFTs());
        Layout_1.default.current.title = "Mining";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".mining-view", (0, skynode_1.el)(".title", { "data-aos": "zoom-in" }, (0, skynode_1.el)("h1", "Mining"), (0, skynode_1.el)("p", "소유한 NFT로부터 채굴")), (0, skynode_1.el)(".my-nft-container", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".tool-box", (0, skynode_1.el)(".title-wrap", (0, skynode_1.el)("h2", "나의 NFT"), (0, skynode_1.el)("p", "총 이자: KRNO 12")), (0, skynode_1.el)("button.all-mining-button", "모두 KRNO로 받기"), (0, skynode_1.el)("button.all-mining-button", "모두 KLAY로 받기")), this.nftList = (0, skynode_1.el)(".nft-container", { "data-aos": "zoom-in" }))));
        this.resizeDebouncer.run();
        Wallet_1.default.on("connect", () => this.resizeDebouncer.run());
    }
    async loadNFTs() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = (await GaiaNFTContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            skyutil_1.default.repeat(balance, (i) => {
                const promise = async (index) => {
                    const tokenId = await GaiaNFTContract_1.default.tokenOfOwnerByIndex(address, index);
                    new MiningItem_1.default(tokenId.toNumber()).appendTo(this.nftList);
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);
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