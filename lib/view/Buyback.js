"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debouncer_1 = __importDefault(require("@hanul/debouncer"));
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const skyutil_1 = __importDefault(require("skyutil"));
const BuybackItem_1 = __importDefault(require("../component/BuybackItem"));
const TeamNFT_1 = __importDefault(require("../component/TeamNFT"));
const GaiaBuyBackFundContract_1 = __importDefault(require("../contracts/GaiaBuyBackFundContract"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Buyback {
    constructor() {
        this.resizeDebouncer = new debouncer_1.default(200, () => this.loadNFTs());
        Layout_1.default.current.title = (0, msg_js_1.default)("BUYBACK_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.buyback-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("BUYBACK_TITLE")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("BUYBACK_DESC"))), new TeamNFT_1.default(), (0, skynode_1.el)(".warning-container", (0, skynode_1.el)("p", "Gaia Genesis Buyback을 백킹으로 활용한다는 거버넌스가 통과됨에 따라서 바이백은 종료되었습니다.")), this.nftList = (0, skynode_1.el)(".nft-container")));
        this.resizeDebouncer.run();
        Wallet_1.default.on("connect", () => this.resizeDebouncer.run());
    }
    async loadNFTs() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const refundableKlay = await GaiaBuyBackFundContract_1.default.refundableKlay();
            const balance = (await GaiaNFTContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            skyutil_1.default.repeat(balance, (i) => {
                const promise = async (index) => {
                    const item = new BuybackItem_1.default(refundableKlay).appendTo(this.nftList);
                    const tokenId = (await GaiaNFTContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    if (tokenId === 0) {
                        item.delete();
                    }
                    else {
                        item.init(tokenId);
                    }
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