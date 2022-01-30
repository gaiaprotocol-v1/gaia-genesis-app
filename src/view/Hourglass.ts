import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Hourglass implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.content.append(
            this.container = el(".hourglass-view", { "data-aos": "zoom-in" },
                el(".title",
                    el("h1", "Hourglass"),
                    el("p", "Estimate Your Returns")
                ),
                el(".content",
                    el(".content-wrap",
                        el("h2", "Current KRNO Price"),
                        el("p", "$316"),
                    ),
                    el(".content-wrap",
                        el("h2", "Current Reward Yield"),
                        el("p", "0.664%"),
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