import { DomNode, el } from "@hanul/skynode";

export default class BuybackItem extends DomNode {

    constructor(private id: number) {
        super(".buyback-item");
        this.append(
            el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
            el("h3", "가이아#3212"),
            el("p", "1,000 KLAY"),
            el("button", "바이백"),
        )
    }

    public delete() {
        super.delete();
    }
}
