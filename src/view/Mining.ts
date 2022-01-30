import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.content.append(
            this.container = el(".mining-view", { "data-aos": "zoom-in" },
                el(".title",
                    el("h1", "Mining"),
                    el("p", "Mining Your NFT")
                ),
                el(".tool-box",
                    el("button.all-mining-button", "All Mining"),
                ),
                el(".nft-container",
                    el(".nft-item",
                        el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
                        el("h3", "가이아#3212"),
                        el("p.amount", "KRNO 12"),
                        el("p.caption", "1,200 KLAY"),
                        el("button", "Mining")
                    )
                )
            ).appendTo(BodyNode)
        )
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}