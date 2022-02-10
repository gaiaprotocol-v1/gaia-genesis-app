import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import CommonUtil from "../CommonUtil";
import GaiaBuyBackFundContract from "../contracts/GaiaBuyBackFundContract";
import lpContract from "../contracts/lpContract";
import sKRNOContract from "../contracts/sKRNOContract";
import StakingContract from "../contracts/StakingContract";
import Klaytn from "../klaytn/Klaytn";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private krnoPriceDisplay: DomNode;
    private apyDisplay: DomNode;
    private buybackBalanceDisplay: DomNode;
    private interval: any;

    constructor() {
        Layout.current.title = msg("DASHBOARD_TITLE");
        Layout.current.content.append(
            this.container = el("section.dashboard-view", { "data-aos": "zoom-in" },
                el("header",
                    el("h1", msg("DASHBOARD_TITLE")),
                    el("h2", msg("DASHBOARD_DESC")),
                ),
                el("img", { src: "/images/view/banner.png" }),
                el("article",
                    el(".content-wrap",
                        el("header", msg("KRNO_PRICE_TITLE")),
                        this.krnoPriceDisplay = el("p", "$..."),
                    ),
                    el(".content-wrap",
                        el("header", msg("ARY_TITLE")),
                        this.apyDisplay = el("p", "...%"),
                    ),
                    el(".content-wrap",
                        el("header", msg("BUYBACK_TITLE")),
                        this.buybackBalanceDisplay = el("p", "... KLAY"),
                    ),
                    /*el(".content-wrap",
                        el("header", "Holders"),
                        el("p", "1,000"),
                    ),*/
                ),
            ),
        );

        this.loadKRNOPrice();
        this.loadAPY();
        this.loadBuybackBalance();
    }

    private async loadKRNOPrice() {
        const pool = await lpContract.getCurrentPool();
        if (this.container.deleted !== true) {
            this.krnoPriceDisplay.empty().appendText(`$ ${CommonUtil.numberWithCommas(String(pool[0] / pool[1] / 10e8))}`);
        }
    }

    private async loadAPY() {
        const stakingRebaseValue = (await StakingContract.epoch()).distribute / await sKRNOContract.circulatingSupply();
        const apy = (Math.pow(1 + stakingRebaseValue, 365 * 3) - 1) * 100;
        if (this.container.deleted !== true) {
            this.apyDisplay.empty().appendText(`${CommonUtil.numberWithCommas(String(apy))}%`);
        }
    }

    private async loadBuybackBalance() {
        const balance = await Klaytn.balanceOf(GaiaBuyBackFundContract.address);
        if (this.container.deleted !== true) {
            this.buybackBalanceDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(balance))} KLAY`);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}