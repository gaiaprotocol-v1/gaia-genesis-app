import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import msg from "msg.js";
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
                    el("h3", msg("GENESIS_GAIA_TITLE")),
                    el("img", { src: "https://storage.googleapis.com/gaia-protocol/kronos/genesis.png" }),
                ),
                el(".team-info",
                    el(".content-wrap",
                        el("h2", msg("MINT_PRICE_TITLE")),
                        el("p", "1,000 KLAY"),
                    ),
                    el(".content-wrap",
                        el("h2", msg("COMPOUND_INTEREST_TITLE")),
                        this.klayDisplay = el("p", "... KLAY"),
                    ),
                    el(".content-wrap",
                        el("h2", msg("RECEIVE_KLAY_TITLE")),
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
