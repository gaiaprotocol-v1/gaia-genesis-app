import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import SkyUtil from "skyutil";
import Swiper from "swiper";
import CommonUtil from "../CommonUtil";
import GaiaNFTContract from "../contracts/GaiaNFTContract";
import GaiaOperationContract from "../contracts/GaiaOperationContract";
import lpContract from "../contracts/lpContract";
import sKRNOContract from "../contracts/sKRNOContract";
import StakingContract from "../contracts/StakingContract";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";

export default class Hourglass implements View {
    private container: DomNode;
    private krnoPriceDisplay: DomNode;
    private rewardDisplay: DomNode;
    private totalSKRNODisplay: DomNode;

    private initWealthDisplay: DomNode;
    private kronRewardDisplay: DomNode;
    private currentWealthDisplay: DomNode;
    private futureWealthDisplay: DomNode;

    private macbookRewardDisplay: DomNode;
    private teslaRewardDisplay: DomNode;
    private birkinBagRewardDisplay: DomNode;
    private eternoRewardDisplay: DomNode;

    private daysDisplay: DomNode;

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
                            el("header", "현재 보상이자"),
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
                            el("label", "sKRNO 수량"),
                            this.amountInput = el("input", {
                                value: "0",
                                change: () => {
                                    this.setWealth();
                                }
                            }),
                        ),
                        el(".input-wrap",
                            el("label", "민팅 당시 KRNO 가격 ($)"),
                            this.priceInput = el("input", {
                                value: "0",
                                change: () => {
                                    this.setWealth();
                                }
                            }),
                        ),
                        el(".input-wrap",
                            el("label", "보상이자 (%)"),
                            this.rewardInput = el("input", {
                                change: async () => {
                                    this.setWealth();
                                }
                            }),
                        ),
                        el(".input-wrap",
                            el("label", "예상 KRNO 가격 ($)"),
                            this.futureInput = el("input", {
                                change: () => {
                                    this.setWealth();
                                }
                            }),
                        ),
                    ),
                    el(".input-wrap",
                        this.slider = el("input.slider", {
                            type: "range", value: "30", min: "1", max: "365",
                            change: () => {
                                this.setWealth();
                            }
                        }),
                        el(".text-wrap",
                            this.daysDisplay = el("label", "30"),
                            el("label", "days")
                        ),
                    ),
                    el(".reward-container",
                        el(".content-wrap",
                            el("header", "최초 재산"),
                            this.initWealthDisplay = el("p", "0 $"),
                        ),
                        el(".content-wrap",
                            el("header", "현재 재산"),
                            this.currentWealthDisplay = el("p", "0 $"),
                        ),
                        el(".content-wrap",
                            el("header", "KRNO 보상"),
                            this.kronRewardDisplay = el("p", "0 KRNO"),
                        ),
                        el(".content-wrap",
                            el("header", "예상 재산"),
                            this.futureWealthDisplay = el("p", "0 $"),
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
                                    this.macbookRewardDisplay = el("header", "0 Macbook"),
                                    el("p", "Macbook M1 Pro 16inch"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/birkin-bag.png", alt: "" }),
                                el(".text-warp",
                                    this.birkinBagRewardDisplay = el("header", "0 Birkin Bag"),
                                    el("p", "Hermes Birkin Bag"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/modelS.png", alt: "" }),
                                el(".text-warp",
                                    this.teslaRewardDisplay = el("header", "0 Tesla"),
                                    el("p", "Tesla Model S Plaid"),
                                ),
                            ),
                            el(".swiper-slide",
                                el("img", { src: "/images/view/hourglass/ETERNO-CHUNGDAM.png", alt: "" }),
                                el(".text-warp",
                                    this.eternoRewardDisplay = el("header", "0 Eterno Chungdam"),
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
        this.loadTotalSKRNO();
    }

    private async loadKRNOPrice(): Promise<void> {
        const pool = await lpContract.getCurrentPool();
        const krnoPrice = CommonUtil.numberWithCommas(String(pool[0] / pool[1] / 10e8));
        this.krnoPriceDisplay.empty().appendText(`$ ${krnoPrice}`);

        this.priceInput.domElement.value = krnoPrice;
        this.futureInput.domElement.value = krnoPrice;
    }

    private async loadReward(): Promise<void> {
        const stakingRebaseValue = (await StakingContract.epoch()).distribute / await sKRNOContract.circulatingSupply();
        const reward = CommonUtil.numberWithCommas(String(stakingRebaseValue * 100));
        this.rewardDisplay.empty().appendText(`${reward}%`);
        this.rewardInput.domElement.value = reward;
    }

    private async loadTotalSKRNO(): Promise<void> {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {

            const balance = (await GaiaNFTContract.balanceOf(address)).toNumber();
            const promises: Promise<void>[] = [];

            let totalKRNO = BigNumber.from(0);
            SkyUtil.repeat(balance, (i: number) => {
                const promise = async (index: number) => {
                    const tokenId = (await GaiaNFTContract.tokenOfOwnerByIndex(address, index)).toNumber();
                    if (tokenId !== 0) {
                        totalKRNO = totalKRNO.add(await GaiaOperationContract.getKRNOBalance(tokenId));
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);

            this.totalSKRNODisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(totalKRNO))}`);
        }
    }

    private setSwiper(): void {
        new Swiper('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    private async setWealth(): Promise<void> {
        const price = parseFloat(this.priceInput.domElement.value);
        const rewardYield = parseFloat(this.rewardInput.domElement.value)
        const days = Number(this.slider.domElement.value);
        const futureMarketPrice = Number(this.futureInput.domElement.value);
        const sKRNOAmount = parseFloat(this.amountInput.domElement.value);

        this.daysDisplay.empty().appendText(this.slider.domElement.value);

        // initWealth
        const initWealth = sKRNOAmount * price;
        this.initWealthDisplay.empty().appendText(`${initWealth.toLocaleString()} $`);

        // currentWealth
        const pool = await lpContract.getCurrentPool();
        const currentWealth = sKRNOAmount * Number(CommonUtil.numberWithCommas(String(pool[0] / pool[1] / 10e8)));
        this.currentWealthDisplay.empty().appendText(`${currentWealth.toLocaleString()} $`);

        // rewardKrno
        let amount = sKRNOAmount;
        let estimatedReward = 0;
        for (let i = 0; i < days * 3; i++) {
            const nextAmount = (rewardYield / 100) * amount;
            amount += nextAmount;

            estimatedReward = amount - sKRNOAmount;
        }
        this.kronRewardDisplay.empty().appendText(`${estimatedReward.toLocaleString()} KRNO`);


        // futureWealthDisplay
        const futureWealth = (sKRNOAmount + estimatedReward) * futureMarketPrice
        this.futureWealthDisplay.empty().appendText(`${futureWealth.toLocaleString()} $`);

        // reward
        this.macbookRewardDisplay.empty().appendText(`${Math.round(futureWealth / 2499).toLocaleString()} Macbook`);
        this.birkinBagRewardDisplay.empty().appendText(`${Math.round(futureWealth / 30000).toLocaleString()} Birkin Bag`);
        this.teslaRewardDisplay.empty().appendText(`${Math.round(futureWealth / 123740).toLocaleString()} Tesla`);
        this.eternoRewardDisplay.empty().appendText(`${Math.round(futureWealth / 8357011).toLocaleString()} Eterno Chungdam`);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}