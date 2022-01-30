import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.content.append(
            this.container = el(".dashboard-view", { "data-aos": "zoom-in" },
            ).appendTo(BodyNode)
        )
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}