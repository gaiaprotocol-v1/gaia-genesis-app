import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.title = "홈"
        Layout.current.content.append(
            this.container = el(".dashboard-view", { "data-aos": "zoom-in" },
                el(".title",
                    el("h1", "가이아 프로토콜"),
                    el("p", "소유한 NFT 요약")
                ),
                el(".content",
                    el(".content-wrap",
                        el("h2", "KRNO 가격"),
                        el("p", "$316"),
                    ),
                    el(".content-wrap",
                        el("h2", "APY"),
                        el("p", "150,760.4%"),
                    ),
                    el(".content-wrap",
                        el("h2", "바이백 펀드"),
                        el("p", "$231,321"),
                    ),
                    el(".content-wrap",
                        el("h2", "소유한 sKRNO 수량"),
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