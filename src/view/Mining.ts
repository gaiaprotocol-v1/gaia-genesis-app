import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import MiningItem from "../component/MiningItem";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private interval: any;

    constructor() {
        Layout.current.title = "Mining";
        Layout.current.content.append(
            this.container = el(".mining-view",
                el(".title", { "data-aos": "zoom-in" },
                    el("h1", "Mining"),
                    el("p", "소유한 NFT로부터 채굴"),
                ),
                el(".my-nft-container", { "data-aos": "zoom-in" },
                    el(".tool-box",
                        el(".title-wrap",
                            el("h2", "나의 NFT"),
                            el("p", "총 이자: KRNO 12"),
                        ),
                        el("button.all-mining-button", "모두 KRNO로 받기"),
                        el("button.all-mining-button", "모두 KLAY로 받기"),
                    ),
                    el(".nft-container", { "data-aos": "zoom-in" },
                        new MiningItem(132),
                        new MiningItem(3333),
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