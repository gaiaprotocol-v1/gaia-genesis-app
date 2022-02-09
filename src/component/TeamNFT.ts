import { DomNode, el } from "@hanul/skynode";

export default class TeamNFT extends DomNode {
    constructor() {
        super(".team-nft-container");
        this.append(
            el(".content", { "data-aos": "zoom-in" },
                el(".team-item",
                    el("h3", "최초의 가이아"),
                    el("img", { src: "/images/shared/img/sneakpeek1.jpeg" }),
                ),
                el(".team-info",
                    el(".content-wrap",
                        el("h2", "민팅가"),
                        el("p", "1,000 KLAY"),
                    ),
                    el(".content-wrap",
                        el("h2", "쌓인 복리 이자"),
                        el("p", "9,999 KLAY"),
                    ),
                    el(".content-wrap",
                        el("h2", "받을 수 있는 KLAY수량"),
                        el("p", "8,999 KLAY"),
                    ),
                ),
            ),
        )
    }

    public delete() {
        super.delete();
    }
}
