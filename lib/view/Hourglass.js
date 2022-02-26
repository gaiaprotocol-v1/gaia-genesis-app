"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const msg_js_1 = __importDefault(require("msg.js"));
const skyutil_1 = __importDefault(require("skyutil"));
const swiper_1 = __importStar(require("swiper"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const GaiaNFTContract_1 = __importDefault(require("../contracts/GaiaNFTContract"));
const GaiaOperationContract_1 = __importDefault(require("../contracts/GaiaOperationContract"));
const lpContract_1 = __importDefault(require("../contracts/lpContract"));
const sKRNOContract_1 = __importDefault(require("../contracts/sKRNOContract"));
const StakingContract_1 = __importDefault(require("../contracts/StakingContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Hourglass {
    constructor() {
        this.totalSKRNO = ethers_1.BigNumber.from(0);
        Layout_1.default.current.title = (0, msg_js_1.default)("HOURGLASS_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.hourglass-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("HOURGLASS_TITLE")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOURGLASS_DESC"))), (0, skynode_1.el)("section", (0, skynode_1.el)("section.content", (0, skynode_1.el)("article", (0, skynode_1.el)("header", (0, msg_js_1.default)("CURRENT_KRNO_PRICE_TITLE")), this.krnoPriceDisplay = (0, skynode_1.el)("p", "$...")), (0, skynode_1.el)("article", (0, skynode_1.el)("header", (0, msg_js_1.default)("CURRENT_REWARD_YIELD_TITLE")), this.rewardDisplay = (0, skynode_1.el)("p", "...%")), (0, skynode_1.el)("article", (0, skynode_1.el)("header", (0, msg_js_1.default)("CURRENT_NFT_TOTAL_SKRNO_TITLE")), this.totalSKRNODisplay = (0, skynode_1.el)("p", "0"))), (0, skynode_1.el)("hr"), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", (0, msg_js_1.default)("KRNO_PRICE_AT_PURCHASE_TITLE")), this.initPriceInput = (0, skynode_1.el)("input", {
            value: "271.93",
            change: () => {
                this.setWealth();
            }
        })), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", (0, msg_js_1.default)("CURRENT_KRNO_MARKET_PRICE_TITLE")), this.currentPriceInput = (0, skynode_1.el)("input", {
            value: "0",
            change: () => {
                this.setWealth();
            }
        })), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", (0, msg_js_1.default)("REWARD YIELD_TITLE")), this.rewardInput = (0, skynode_1.el)("input", {
            change: async () => {
                this.setWealth();
            }
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CURRENT_BUTTON"), {
            click: () => {
                this.loadReward();
            }
        })), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", (0, msg_js_1.default)("FUTURE_KRNO_MARKET_PRICE_TITLE")), this.futureInput = (0, skynode_1.el)("input", {
            change: () => {
                this.setWealth();
            }
        }), (0, skynode_1.el)("button", (0, msg_js_1.default)("CURRENT_BUTTON"), {
            click: () => {
                this.setCurrentKRNOPriceOnFuture();
            }
        }))), (0, skynode_1.el)(".input-wrap", this.slider = (0, skynode_1.el)("input.slider", {
            type: "range", value: "30", min: "1", max: "365",
            change: () => {
                this.setWealth();
            },
            mousemove: () => {
                this.setWealth();
            },
            mouseleave: () => {
                this.setWealth();
            }
        }), (0, skynode_1.el)(".text-wrap", this.daysDisplay = (0, skynode_1.el)("label", "30"), (0, skynode_1.el)("label", (0, msg_js_1.default)("DAYS_TITLE")))), (0, skynode_1.el)(".reward-container", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("CURRENT_WEALTH_TITLE")), this.currentWealthDisplay = (0, skynode_1.el)("p", "0 $")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("KRNO_REWARDS_ESTIMATION_TITLE")), this.kronRewardDisplay = (0, skynode_1.el)("p", "0 KRNO")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", (0, msg_js_1.default)("POTENTIAL_RETURN_TITLE")), this.futureWealthDisplay = (0, skynode_1.el)("p", "0 $"))), (0, skynode_1.el)("hr")), (0, skynode_1.el)(".goods-container", (0, skynode_1.el)(".swiper", (0, skynode_1.el)(".swiper-wrapper", (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/macbook-pro.png", alt: (0, msg_js_1.default)("MACBOOK_TITLE") }), (0, skynode_1.el)(".text-warp", this.macbookRewardDisplay = (0, skynode_1.el)("header", (0, msg_js_1.default)("MACBOOK_TITLE").replace(/{each}/, String(0))), (0, skynode_1.el)("p", (0, msg_js_1.default)("MACBOOK_DESC")))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/birkin-bag.png", alt: (0, msg_js_1.default)("BIRKINGBAG_TITLE") }), (0, skynode_1.el)(".text-warp", this.birkinBagRewardDisplay = (0, skynode_1.el)("header", (0, msg_js_1.default)("BIRKINGBAG_TITLE").replace(/{each}/, String(0))), (0, skynode_1.el)("p", (0, msg_js_1.default)("BIRKINGBAG_DESC")))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/modelS.png", alt: (0, msg_js_1.default)("TESLA_TITLE") }), (0, skynode_1.el)(".text-warp", this.teslaRewardDisplay = (0, skynode_1.el)("header", (0, msg_js_1.default)("TESLA_TITLE").replace(/{each}/, String(0))), (0, skynode_1.el)("p", (0, msg_js_1.default)("TESLA_DESC")))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: (0, msg_js_1.default)("ETERNO_CHEONGDAM_TITLE") }), (0, skynode_1.el)(".text-warp", this.eternoRewardDisplay = (0, skynode_1.el)("header", (0, msg_js_1.default)("ETERNO_CHEONGDAM_TITLE").replace(/{each}/, String(0))), (0, skynode_1.el)("p", (0, msg_js_1.default)("ETERNO_CHEONGDAM_DESC"))))), (0, skynode_1.el)(".swiper-button-prev"), (0, skynode_1.el)(".swiper-button-next")))));
        this.init();
    }
    init() {
        this.setSwiper();
        this.loadKRNOPrice();
        this.loadReward();
        this.loadTotalSKRNO();
    }
    async loadKRNOPrice() {
        const pool = await lpContract_1.default.getCurrentPool();
        const krnoPrice = CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8));
        this.krnoPriceDisplay.empty().appendText(`$ ${krnoPrice}`);
        this.futureInput.domElement.value = krnoPrice;
        this.currentPriceInput.domElement.value = krnoPrice;
    }
    async loadReward() {
        const stakingRebaseValue = (await StakingContract_1.default.epoch()).distribute / await sKRNOContract_1.default.circulatingSupply();
        const reward = CommonUtil_1.default.numberWithCommas(String(stakingRebaseValue * 100));
        this.rewardDisplay.empty().appendText(`${reward}%`);
        this.rewardInput.domElement.value = reward;
    }
    async setCurrentKRNOPriceOnFuture() {
        const pool = await lpContract_1.default.getCurrentPool();
        const krnoPrice = CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8));
        this.krnoPriceDisplay.empty().appendText(`$ ${krnoPrice}`);
        this.futureInput.domElement.value = krnoPrice;
    }
    async loadTotalSKRNO() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = (await GaiaNFTContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            skyutil_1.default.repeat(balance, (i) => {
                const promise = async (index) => {
                    const tokenId = (await GaiaNFTContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    if (tokenId !== 0) {
                        const b = await GaiaOperationContract_1.default.getKRNOBalance(tokenId);
                        this.totalSKRNO = this.totalSKRNO.add(b);
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);
            this.totalSKRNODisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatUnits(this.totalSKRNO, 9))}`);
            this.setWealth();
        }
    }
    setSwiper() {
        swiper_1.default.use([swiper_1.Navigation]);
        new swiper_1.default('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    async setWealth() {
        const currentPrice = parseFloat(this.currentPriceInput.domElement.value);
        const rewardYield = parseFloat(this.rewardInput.domElement.value);
        const days = Number(this.slider.domElement.value);
        const futureMarketPrice = Number(this.futureInput.domElement.value);
        const totalSKRNO = parseFloat(ethers_1.utils.formatUnits(this.totalSKRNO, 9));
        this.daysDisplay.empty().appendText(this.slider.domElement.value);
        const currentWealth = totalSKRNO * currentPrice;
        this.currentWealthDisplay.empty().appendText(`${currentWealth.toLocaleString()} $`);
        let amount = totalSKRNO;
        let estimatedReward = 0;
        for (let i = 0; i < days * 3; i++) {
            const nextAmount = (rewardYield / 100) * amount;
            amount += nextAmount;
            estimatedReward = amount - totalSKRNO;
        }
        this.kronRewardDisplay.empty().appendText(`${estimatedReward.toLocaleString()} KRNO`);
        const futureWealth = (totalSKRNO + estimatedReward) * futureMarketPrice;
        this.futureWealthDisplay.empty().appendText(`${futureWealth.toLocaleString()} $`);
        this.macbookRewardDisplay.empty().appendText(`${(0, msg_js_1.default)("MACBOOK_TITLE").replace(/{each}/, String(Math.round(futureWealth / 2499).toLocaleString()))}`);
        this.birkinBagRewardDisplay.empty().appendText(`${(0, msg_js_1.default)("BIRKINGBAG_TITLE").replace(/{each}/, String(Math.round(futureWealth / 30000).toLocaleString()))}`);
        this.teslaRewardDisplay.empty().appendText(`${(0, msg_js_1.default)("TESLA_TITLE").replace(/{each}/, String(Math.round(futureWealth / 123740).toLocaleString()))}`);
        this.eternoRewardDisplay.empty().appendText(`${(0, msg_js_1.default)("ETERNO_CHEONGDAM_TITLE").replace(/{each}/, String(Math.round(futureWealth / 8357011).toLocaleString()))}`);
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Hourglass;
//# sourceMappingURL=Hourglass.js.map