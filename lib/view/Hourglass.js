"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyutil_1 = __importDefault(require("skyutil"));
const swiper_1 = __importDefault(require("swiper"));
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
        Layout_1.default.current.title = "Hourglass";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.hourglass-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "Hourglass"), (0, skynode_1.el)("h2", "수익률 산정")), (0, skynode_1.el)("section", (0, skynode_1.el)("section.content", (0, skynode_1.el)("article", (0, skynode_1.el)("header", "현재 KRNO 가격"), this.krnoPriceDisplay = (0, skynode_1.el)("p", "$...")), (0, skynode_1.el)("article", (0, skynode_1.el)("header", "현재 보상 수익률"), this.rewardDisplay = (0, skynode_1.el)("p", "...%")), (0, skynode_1.el)("article", (0, skynode_1.el)("header", "보유한 NFT의 총 sKRNO"), this.totalSKRNODisplay = (0, skynode_1.el)("p", "0"))), (0, skynode_1.el)("hr"), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "sKRNO 수량"), this.amountInput = (0, skynode_1.el)("input", {
            change: () => {
                this.setWealth();
            }
        })), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "민팅 당시 KRNO 가격 ($)"), this.priceInput = (0, skynode_1.el)("input", {
            change: () => {
                this.setWealth();
            }
        })), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "수익률 (%)"), this.rewardInput = (0, skynode_1.el)("input", {
            change: async () => {
                this.setWealth();
            }
        })), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "예상 KRNO 가격 ($)"), this.futureInput = (0, skynode_1.el)("input", {
            change: () => {
                this.setWealth();
            }
        }))), (0, skynode_1.el)(".input-wrap", this.slider = (0, skynode_1.el)("input.slider", {
            type: "range", value: "30", min: "1", max: "365",
            change: () => {
                this.setWealth();
            }
        }), (0, skynode_1.el)(".text-wrap", this.daysDisplay = (0, skynode_1.el)("label", "30"), (0, skynode_1.el)("label", "days"))), (0, skynode_1.el)(".reward-container", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "최초 재산"), this.initWealthDisplay = (0, skynode_1.el)("p", "0 $")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "현재 재산"), this.currentWealthDisplay = (0, skynode_1.el)("p", "0 $")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "KRNO 보상"), this.kronRewardDisplay = (0, skynode_1.el)("p", "0 KRNO")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "예상 재산"), this.futureWealthDisplay = (0, skynode_1.el)("p", "0 $"))), (0, skynode_1.el)("hr")), (0, skynode_1.el)(".goods-container", (0, skynode_1.el)(".swiper", (0, skynode_1.el)(".swiper-wrapper", (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/macbook-pro.png", alt: "" }), (0, skynode_1.el)(".text-warp", this.macbookRewardDisplay = (0, skynode_1.el)("header", "0 Macbook"), (0, skynode_1.el)("p", "Macbook M1 Pro 16inch"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/birkin-bag.png", alt: "" }), (0, skynode_1.el)(".text-warp", this.birkinBagRewardDisplay = (0, skynode_1.el)("header", "0 Birkin Bag"), (0, skynode_1.el)("p", "Hermes Birkin Bag"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/modelS.png", alt: "" }), (0, skynode_1.el)(".text-warp", this.teslaRewardDisplay = (0, skynode_1.el)("header", "0 Tesla"), (0, skynode_1.el)("p", "Tesla Model S Plaid"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: "" }), (0, skynode_1.el)(".text-warp", this.eternoRewardDisplay = (0, skynode_1.el)("header", "0 Eterno Chungdam"), (0, skynode_1.el)("p", "Eterno Chungdam 243.17㎡")))), (0, skynode_1.el)(".swiper-button-prev"), (0, skynode_1.el)(".swiper-button-next")))));
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
        this.krnoPriceDisplay.empty().appendText(`$${CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
    }
    async loadReward() {
        const stakingRebaseValue = (await StakingContract_1.default.epoch()).distribute / await sKRNOContract_1.default.circulatingSupply();
        this.rewardDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(String(stakingRebaseValue * 100))}%`);
    }
    async loadTotalSKRNO() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = (await GaiaNFTContract_1.default.balanceOf(address)).toNumber();
            const promises = [];
            let totalKRNO = ethers_1.BigNumber.from(0);
            skyutil_1.default.repeat(balance, (i) => {
                const promise = async (index) => {
                    const tokenId = (await GaiaNFTContract_1.default.tokenOfOwnerByIndex(address, index)).toNumber();
                    if (tokenId !== 0) {
                        totalKRNO = totalKRNO.add(await GaiaOperationContract_1.default.getKRNOBalance(tokenId));
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);
            this.totalSKRNODisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(totalKRNO))}`);
        }
    }
    setSwiper() {
        new swiper_1.default('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    async setWealth() {
        const price = parseFloat(this.priceInput.domElement.value);
        const rewardYield = parseFloat(this.rewardInput.domElement.value);
        const days = Number(this.slider.domElement.value);
        const futureMarketPrice = Number(this.futureInput.domElement.value);
        const sKRNOAmount = parseFloat(this.amountInput.domElement.value);
        this.daysDisplay.empty().appendText(this.slider.domElement.value);
        const initWealth = sKRNOAmount * price;
        this.initWealthDisplay.empty().appendText(`${initWealth.toLocaleString()} $`);
        const pool = await lpContract_1.default.getCurrentPool();
        const currentWealth = sKRNOAmount * Number(CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8)));
        this.currentWealthDisplay.empty().appendText(`${currentWealth.toLocaleString()} $`);
        let amount = sKRNOAmount;
        let estimatedReward = 0;
        for (let i = 0; i < days * 3; i++) {
            const nextAmount = (rewardYield / 100) * amount;
            amount += nextAmount;
            estimatedReward = amount - sKRNOAmount;
        }
        this.kronRewardDisplay.empty().appendText(`${estimatedReward.toLocaleString()} KRNO`);
        const futureWealth = (sKRNOAmount + estimatedReward) * futureMarketPrice;
        this.futureWealthDisplay.empty().appendText(`${futureWealth.toLocaleString()} $`);
        this.macbookRewardDisplay.empty().appendText(`${Math.round(futureWealth / 2499).toLocaleString()} Macbook`);
        this.birkinBagRewardDisplay.empty().appendText(`${Math.round(futureWealth / 30000).toLocaleString()} Birkin Bag`);
        this.teslaRewardDisplay.empty().appendText(`${Math.round(futureWealth / 123740).toLocaleString()} Tesla`);
        this.eternoRewardDisplay.empty().appendText(`${Math.round(futureWealth / 8357011).toLocaleString()} Eterno Chungdam`);
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Hourglass;
//# sourceMappingURL=Hourglass.js.map