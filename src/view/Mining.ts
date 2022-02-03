import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.content.append(
            this.container = el(".mining-view",
                el(".title", { "data-aos": "zoom-in" },
                    el("h1", "Mining"),
                    el("p", "Mining Your NFT"),
                ),
                el(".team-nft-container", { "data-aos": "zoom-in" },
                    el(".content",
                        el("h2", "Team NFT"),
                        el(".team-item",
                            el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
                            el("h3", "가이아#0"),
                            el("p.amount", "KRNO 12"),
                            el("p.caption", "(= 1,200 KLAY)"),
                        ),
                    ),
                ),
                el(".my-nft-container", { "data-aos": "zoom-in" },
                    el(".tool-box",
                        el(".title-wrap",
                            el("h2", "My NFT"),
                            el("p", "총 이자: KRNO 12"),
                        ),
                        el("button.all-mining-button", "All Mining"),
                    ),
                    el(".nft-container", { "data-aos": "zoom-in" },
                        el(".nft-item",
                            el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
                            el("h3", "가이아#3212"),
                            el(".content-wrap",
                                el("p.amount", "KRNO 12"),
                                el("button", "Mining")
                            ),
                        ),
                    ),
                ),
            ).appendTo(BodyNode)
        )
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}