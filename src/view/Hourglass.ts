import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import lpContract from "../contracts/lpContract";
import sKRNOContract from "../contracts/sKRNOContract";
import StakingContract from "../contracts/StakingContract";
import Layout from "./Layout";
import Swiper from 'swiper';

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
            this.container = el("section.hourglass-view", { "data-aos": "zoom-in" },
                el("header",
                    el("h1", "Hourglass"),
                    el("h2", "수익률 산정")
                ),
                el("section",
                    el("section.content",
                        el("article",
                            el("header", "현재 KRNO 가격"),
                            this.krnoPriceDisplay = el("p", "$..."),
                        ),
                        el("article",
                            el("header", "현재 보상 수익률"),
                            this.rewardDisplay = el("p", "...%"),
                        ),
                        el("article",
                            el("header", "보유한 NFT의 총 sKRNO"),
                            this.totalSKRNODisplay = el("p", "0"),
                        ),
                    ),
                    el("hr"),
                    el(".input-container",
                        el(".input-wrap",
                            el("label", "총 sKRNO 수량"),
                            this.amountInput = el("input",),
                        ),
                        el(".input-wrap",
                            el("label", "민팅 당시 KRNO 가격 ($)"),
                            this.priceInput = el("input",),
                        ),
                        el(".input-wrap",
                            el("label", "수익률 (%)"),
                            this.rewardInput = el("input",),
                        ),
                        el(".input-wrap",
                            el("label", "예측 KRNO 가격 ($)"),
                            this.futureInput = el("input",),
                        ),
                    ),
                    el(".input-wrap",
                        this.slider = el("input.slider", { type: "range", value: "0", min: "0", max: "365", onChnage: () => { console.log("siba") } }),
                        el("label", `${this.slider.domElement.value} days`)
                    ),
                    el("button", "계산"),
                    el(".reward-container",
                        el(".content-wrap",
                            el("header", "최초 투자"),
                            el("p", `${this.getInitialInvestment()} $`),
                        ),
                        el(".content-wrap",
                            el("header", "현재 재산"),
                            el("p", `${this.getInitialInvestment()} $`),
                        ),
                        el(".content-wrap",
                            el("header", "KRNO 보상"),
                            el("p", "0 KRNO"),
                        ),
                        el(".content-wrap",
                            el("header", "예상 재산"),
                            el("p", "0 $"),
                        ),
                    ),
                    el("hr"),
                ),
                el(".goods-container",
                    el(".swiper",
                        el(".swiper-wrapper",
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/macbook-pro.png", alt: "" }),
                                el(".text-warp",
                                    el("header", "0 Macbook"),
                                    el("p", "Macbook M1 Pro 16inch"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/modelS.png", alt: "" }),
                                el(".text-warp",
                                    el("header", "0 Tesla"),
                                    el("p", "Tesla Model S Plaid"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/birkin-bag.png", alt: "" }),
                                el(".text-warp",
                                    el("header", "0 Birkin Bag"),
                                    el("p", "Hermes Birkin Bag"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: "" }),
                                el(".text-warp",
                                    el("header", "0 Eterno Chungdam"),
                                    el("p", "Eterno Chungdam 243.17㎡"),
                                ),
                            ),
                        ),
                        el(".swiper-button-prev"),
                        el(".swiper-button-next"),
                    ),
                ),
            ),
        );

        this.init();
    }

    private init() {
        this.setSwiper();
        this.loadKRNOPrice();
        this.loadReward();
    }

    private async loadKRNOPrice(): Promise<void> {
        const pool = await lpContract.getCurrentPool();
        this.krnoPriceDisplay.empty().appendText(`$${CommonUtil.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
    }

    private async loadReward(): Promise<void> {
        const stakingRebaseValue = (await StakingContract.epoch()).distribute / await sKRNOContract.circulatingSupply();
        this.rewardDisplay.empty().appendText(`${CommonUtil.numberWithCommas(String(stakingRebaseValue * 100))}%`);
    }

    private setSwiper(): void {
        console.log(this.slider.domElement.value);
        new Swiper('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    private getInitialInvestment(): number {
        return Number(this.priceInput.domElement.value) * Number(this.amountInput.domElement.value);
    }

    private calReward() {
        // 맥북 $ 2,499.00
        // 테슬라 모델s $ 123,740
        // 버킨백 $ 30,000
        // 청담에테르노 $ 8,357,011.53
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}