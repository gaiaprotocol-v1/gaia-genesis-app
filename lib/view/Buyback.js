"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debouncer_1 = __importDefault(require("@hanul/debouncer"));
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const BuybackItem_1 = __importDefault(require("../component/BuybackItem"));
const TeamNFT_1 = __importDefault(require("../component/TeamNFT"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Buyback {
    constructor() {
        this.resizeDebouncer = new debouncer_1.default(200, () => this.loadNFTs());
        Layout_1.default.current.title = "Buyback";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".buyback-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".title", (0, skynode_1.el)("h1", "Buyback"), (0, skynode_1.el)("p", "가이아 바이백 펀드")), new TeamNFT_1.default(), this.nftList = (0, skynode_1.el)(".nft-container")));
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
                    new BuybackItem_1.default(tokenId.toNumber()).appendTo(this.nftList);
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
exports.default = Buyback;
//# sourceMappingURL=Buyback.js.map