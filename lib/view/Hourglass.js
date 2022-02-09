"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const lpContract_1 = __importDefault(require("../contracts/lpContract"));
const sKRNOContract_1 = __importDefault(require("../contracts/sKRNOContract"));
const StakingContract_1 = __importDefault(require("../contracts/StakingContract"));
const Layout_1 = __importDefault(require("./Layout"));
const swiper_1 = __importDefault(require("swiper"));
class Hourglass {
    constructor() {
        Layout_1.default.current.title = "Hourglass";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.hourglass-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)("header", (0, skynode_1.el)("h1", "Hourglass"), (0, skynode_1.el)("h2", "수익률 산정")), (0, skynode_1.el)("section", (0, skynode_1.el)("section.content", (0, skynode_1.el)("article", (0, skynode_1.el)("header", "현재 KRNO 가격"), this.krnoPriceDisplay = (0, skynode_1.el)("p", "$...")), (0, skynode_1.el)("article", (0, skynode_1.el)("header", "현재 보상 수익률"), this.rewardDisplay = (0, skynode_1.el)("p", "...%")), (0, skynode_1.el)("article", (0, skynode_1.el)("header", "보유한 NFT의 총 sKRNO"), this.totalSKRNODisplay = (0, skynode_1.el)("p", "0"))), (0, skynode_1.el)("hr"), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "총 sKRNO 수량"), this.amountInput = (0, skynode_1.el)("input")), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "민팅 당시 KRNO 가격 ($)"), this.priceInput = (0, skynode_1.el)("input")), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "수익률 (%)"), this.rewardInput = (0, skynode_1.el)("input")), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "예측 KRNO 가격 ($)"), this.futureInput = (0, skynode_1.el)("input"))), (0, skynode_1.el)(".input-wrap", this.slider = (0, skynode_1.el)("input.slider", { type: "range", value: "0", min: "0", max: "365", onChnage: () => { console.log("siba"); } }), (0, skynode_1.el)("label", `${this.slider.domElement.value} days`)), (0, skynode_1.el)("button", "계산"), (0, skynode_1.el)(".reward-container", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "최초 투자"), (0, skynode_1.el)("p", `${this.getInitialInvestment()} $`)), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "현재 재산"), (0, skynode_1.el)("p", `${this.getInitialInvestment()} $`)), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "KRNO 보상"), (0, skynode_1.el)("p", "0 KRNO")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("header", "예상 재산"), (0, skynode_1.el)("p", "0 $"))), (0, skynode_1.el)("hr")), (0, skynode_1.el)(".goods-container", (0, skynode_1.el)(".swiper", (0, skynode_1.el)(".swiper-wrapper", (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/macbook-pro.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)("header", "0 Macbook"), (0, skynode_1.el)("p", "Macbook M1 Pro 16inch"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/modelS.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)("header", "0 Tesla"), (0, skynode_1.el)("p", "Tesla Model S Plaid"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/birkin-bag.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)("header", "0 Birkin Bag"), (0, skynode_1.el)("p", "Hermes Birkin Bag"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)("header", "0 Eterno Chungdam"), (0, skynode_1.el)("p", "Eterno Chungdam 243.17㎡")))), (0, skynode_1.el)(".swiper-button-prev"), (0, skynode_1.el)(".swiper-button-next")))));
        this.init();
    }
    init() {
        this.setSwiper();
        this.loadKRNOPrice();
        this.loadReward();
    }
    async loadKRNOPrice() {
        const pool = await lpContract_1.default.getCurrentPool();
        this.krnoPriceDisplay.empty().appendText(`$${CommonUtil_1.default.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
    }
    async loadReward() {
        const stakingRebaseValue = (await StakingContract_1.default.epoch()).distribute / await sKRNOContract_1.default.circulatingSupply();
        this.rewardDisplay.empty().appendText(`${CommonUtil_1.default.numberWithCommas(String(stakingRebaseValue * 100))}%`);
    }
    setSwiper() {
        console.log(this.slider.domElement.value);
        new swiper_1.default('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    getInitialInvestment() {
        return Number(this.priceInput.domElement.value) * Number(this.amountInput.domElement.value);
    }
    calReward() {
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Hourglass;
//# sourceMappingURL=Hourglass.js.map