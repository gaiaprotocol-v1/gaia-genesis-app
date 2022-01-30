import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.content.append(
            this.container = el(".dashboard-view", { "data-aos": "zoom-in" },
                el(".title",
                    el("h1", "Gaia Protocol"),
                    el("p", "Summary Your NFT")
                ),
                el(".content",
                    el(".content-wrap",
                        el("h2", "KRNO Price"),
                        el("p", "$316"),
                    ),
                    el(".content-wrap",
                        el("h2", "APY"),
                        el("p", "150,760.4%"),
                    ),
                    el(".content-wrap",
                        el("h2", "Buyback Fund"),
                        el("p", "$231,321"),
                    ),
                    el(".content-wrap",
                        el("h2", "Your sKRNO Balance"),
                        el("p", "0"),
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