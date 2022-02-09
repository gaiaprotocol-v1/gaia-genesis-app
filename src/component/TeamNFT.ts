import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../CommonUtil";
import GaiaBuyBackFundContract from "../contracts/GaiaBuyBackFundContract";
import GaiaOperationContract from "../contracts/GaiaOperationContract";

export default class TeamNFT extends DomNode {

    private klayDisplay: DomNode;
    private refundableKlayDisplay: DomNode;

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
                        this.klayDisplay = el("p", "... KLAY"),
                    ),
                    el(".content-wrap",
                        el("h2", "받을 수 있는 KLAY수량"),
                        this.refundableKlayDisplay = el("p", "... KLAY"),
                    ),
                ),
            ),
        );
        this.load();
    }

    private async load() {

        const klay = await GaiaOperationContract.claimableKlay([0]);
        this.klayDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(klay))} KLAY`);

        const refundableKlay = await GaiaBuyBackFundContract.refundableKlay();
        this.refundableKlayDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(refundableKlay))} KLAY`);
    }

    public delete() {
        super.delete();
    }
}
