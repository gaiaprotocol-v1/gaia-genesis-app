import { DomNode, el } from "@hanul/skynode";
import GaiaBuyBackFundContract from "../contracts/GaiaBuyBackFundContract";
import ViewUtil from "../view/ViewUtil";

export default class BuybackItem extends DomNode {

    private nameDisplay: DomNode;

    private id = -1;

    constructor() {
        super(".buyback-item");
        this.append(
            el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
            this.nameDisplay = el("h3"),
            el("p", "1,000 KLAY"),
            el("button", "바이백", {
                click: async () => {
                    await GaiaBuyBackFundContract.sellGaiaNFT([this.id]);
                    ViewUtil.waitTransactionAndRefresh();
                },
            }),
        )
    }

    public init(id: number) {
        this.id = id;
        this.nameDisplay.appendText(`#${this.id}`);
    }

    public delete() {
        super.delete();
    }
}
