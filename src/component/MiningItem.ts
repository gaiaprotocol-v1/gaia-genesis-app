import { DomNode, el } from "@hanul/skynode";

export default class MiningItem extends DomNode {

    constructor(private id: number) {
        super(".mining-item");
        this.append(
            el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
            el("h3", `#${id}`),
            el("img.send", { src: "/images/icon/send.svg", alt: "send icon" }),
            el(".content-wrap",
                el(".amount-wrap",
                    el(".krno", "12 KRNO"),
                    el(".klay", "1200 KLAY"),
                ),
                el("button.krno-button", "KRON 받기"),
                el("button.klay-button", "KLAY로 받기"),
            ),
        )
    }

    public delete() {
        super.delete();
    }
}
