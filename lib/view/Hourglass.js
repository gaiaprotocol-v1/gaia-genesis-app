"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Hourglass {
    constructor() {
        Layout_1.default.current.title = "Hourglass";
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)(".hourglass-view", { "data-aos": "zoom-in" }, (0, skynode_1.el)(".title", (0, skynode_1.el)("h1", "Hourglass"), (0, skynode_1.el)("p", "수익률 산정")), (0, skynode_1.el)(".content", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "현재 KRNO 가격"), (0, skynode_1.el)("p", "$316")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "현재 보상 수익률"), (0, skynode_1.el)("p", "0.664%")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)("h2", "보유한 NFT의 총 sKRNO"), (0, skynode_1.el)("p", "0"))), (0, skynode_1.el)("hr"), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "총 sKRNO 수량"), this.amountInput = (0, skynode_1.el)("input", "")), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "민팅 당시 KRNO 가격 ($)"), this.priceInput = (0, skynode_1.el)("input", "")), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "수익률 (%)"), this.rewardInput = (0, skynode_1.el)("input", "")), (0, skynode_1.el)(".input-wrap", (0, skynode_1.el)("label", "예측 KRNO 가격 ($)"), this.futureInput = (0, skynode_1.el)("input", ""))), (0, skynode_1.el)(".input-wrap", this.slider = (0, skynode_1.el)("input.slider", { type: "range", value: "0", min: "0", max: "365" }), (0, skynode_1.el)("label", `${this.slider.domElement.value} days`)), (0, skynode_1.el)(".reward-container", (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)(".title", "최초 투자"), (0, skynode_1.el)("p", `${this.getInitialInvestment()} $`)), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)(".title", "현재 재산"), (0, skynode_1.el)("p", `${this.getInitialInvestment()} $`)), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)(".title", "KRNO 보상"), (0, skynode_1.el)("p", "0 KRNO")), (0, skynode_1.el)(".content-wrap", (0, skynode_1.el)(".title", "잠재 수익률"), (0, skynode_1.el)("p", "0 $"))), (0, skynode_1.el)("hr"), (0, skynode_1.el)(".goods-container", (0, skynode_1.el)(".swiper swiperContainer", (0, skynode_1.el)(".swiper-wrapper", (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/macbook-pro.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)(".title", "0 Macbook"), (0, skynode_1.el)(".caption", "Macbook M1 Pro 16inch"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/modelS.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)(".title", "0 Tesla"), (0, skynode_1.el)(".caption", "Tesla Model S Plaid"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/modelS.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)(".title", "0 Tesla"), (0, skynode_1.el)(".caption", "Tesla Model S Plaid"))), (0, skynode_1.el)(".swiper-slide", (0, skynode_1.el)("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: "" }), (0, skynode_1.el)(".text-warp", (0, skynode_1.el)(".title", "0 Eterno Chungdam"), (0, skynode_1.el)(".caption", "Eterno Chungdam 488.18㎡")))), (0, skynode_1.el)(".swiper-button-next"), (0, skynode_1.el)(".swiper-button-prev")))));
    }
    getInitialInvestment() {
        return Number(this.priceInput.domElement.value) * Number(this.amountInput.domElement.value);
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Hourglass;
//# sourceMappingURL=Hourglass.js.map