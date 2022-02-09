import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import lpContract from "../contracts/lpContract";
import sKRNOContract from "../contracts/sKRNOContract";
import StakingContract from "../contracts/StakingContract";
import Layout from "./Layout";

export default class Hourglass implements View {

    private container: DomNode;
    private krnoPriceDisplay: DomNode;
    private rewardDisplay: DomNode;
    private totalSKRNODisplay: DomNode;

    private amountInput: DomNode<HTMLInputElement>;
    private priceInput: DomNode<HTMLInputElement>;
    private rewardInput: DomNode<HTMLInputElement>;
    private futureInput: DomNode<HTMLInputElement>;
    private slider: DomNode<HTMLInputElement>;
    private interval: any;

    constructor() {
        Layout.current.title = "Hourglass";
        Layout.current.content.append(
            this.container = el(".hourglass-view", { "data-aos": "zoom-in" },
                el(".title",
                    el("h1", "Hourglass"),
                    el("p", "수익률 산정")
                ),
                el(".content",
                    el(".content-wrap",
                        el("h2", "현재 KRNO 가격"),
                        this.krnoPriceDisplay = el("p", "$..."),
                    ),
                    el(".content-wrap",
                        el("h2", "현재 보상 수익률"),
                        this.rewardDisplay = el("p", "...%"),
                    ),
                    el(".content-wrap",
                        el("h2", "보유한 NFT의 총 sKRNO"),
                        this.totalSKRNODisplay = el("p", "0"),
                    ),
                ),
                el("hr"),
                el(".input-container",
                    el(".input-wrap",
                        el("label", "총 sKRNO 수량"),
                        this.amountInput = el("input", "")
                    ),
                    el(".input-wrap",
                        el("label", "민팅 당시 KRNO 가격 ($)"),
                        this.priceInput = el("input", "")
                    ),
                    el(".input-wrap",
                        el("label", "수익률 (%)"),
                        this.rewardInput = el("input", "")
                    ),
                    el(".input-wrap",
                        el("label", "예측 KRNO 가격 ($)"),
                        this.futureInput = el("input", "")
                    ),
                ),
                el(".input-wrap",
                    this.slider = el("input.slider", { type: "range", value: "0", min: "0", max: "365" }),
                    el("label", `${this.slider.domElement.value} days`)
                ),
                el(".reward-container",
                    el(".content-wrap",
                        el(".title", "최초 투자"),
                        el("p", `${this.getInitialInvestment()} $`),
                    ),
                    el(".content-wrap",
                        el(".title", "현재 재산"),
                        el("p", `${this.getInitialInvestment()} $`),
                    ),
                    el(".content-wrap",
                        el(".title", "KRNO 보상"),
                        el("p", "0 KRNO"),
                    ),
                    el(".content-wrap",
                        el(".title", "잠재 수익률"),
                        el("p", "0 $"),
                    ),
                ),
                el("hr"),
                el(".goods-container",
                    el(".swiper swiperContainer",
                        el(".swiper-wrapper",
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/macbook-pro.png", alt: "" }),
                                el(".text-warp",
                                    el(".title", "0 Macbook"),
                                    el(".caption", "Macbook M1 Pro 16inch"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/modelS.png", alt: "" }),
                                el(".text-warp",
                                    el(".title", "0 Tesla"),
                                    el(".caption", "Tesla Model S Plaid"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/modelS.png", alt: "" }),
                                el(".text-warp",
                                    el(".title", "0 Tesla"),
                                    el(".caption", "Tesla Model S Plaid"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: "" }),
                                el(".text-warp",
                                    el(".title", "0 Eterno Chungdam"),
                                    el(".caption", "Eterno Chungdam 488.18㎡"),
                                ),
                            ),
                        ),
                        el(".swiper-button-next"),
                        el(".swiper-button-prev"),
                    ),
                ),
            ),
        );

        this.loadKRNOPrice();
        this.loadReward();
    }

    private async loadKRNOPrice() {
        const pool = await lpContract.getCurrentPool();
        this.krnoPriceDisplay.empty().appendText(`$${CommonUtil.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
    }

    private async loadReward() {
        const stakingRebaseValue = (await StakingContract.epoch()).distribute / await sKRNOContract.circulatingSupply();
        this.rewardDisplay.empty().appendText(`${CommonUtil.numberWithCommas(String(stakingRebaseValue * 100))}%`);
    }

    private getInitialInvestment(): number {
        return Number(this.priceInput.domElement.value) * Number(this.amountInput.domElement.value);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}