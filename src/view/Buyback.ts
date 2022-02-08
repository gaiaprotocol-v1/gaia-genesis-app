import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import TeamNFT from "../component/TeamNFT";
import Layout from "./Layout";

export default class Buyback implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.title = "Buyback";
        Layout.current.content.append(
            this.container = el(".buyback-view", { "data-aos": "zoom-in" },
                el(".title",
                    el("h1", "Buyback"),
                    el("p", "가이아 바이백 펀드")
                ),
                new TeamNFT(),
                el(".nft-container",
                    el(".nft-item",
                        el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
                        el("h3", "가이아#3212"),
                        el("p", "1,000 KLAY"),
                        el("button", "바이백")
                    ),
                ),
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}