import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../CommonUtil";
import GaiaNFTContract from "../contracts/GaiaNFTContract";
import GaiaOperationContract from "../contracts/GaiaOperationContract";
import NFTAirdropContract from "../contracts/NFTAirdropContract";
import ViewUtil from "../view/ViewUtil";
import Alert from "./shared/dialogue/Alert";
import Prompt from "./shared/dialogue/Prompt";

export default class NewTransferItem extends DomNode {

    private imageDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;
    private krnoDisplay: DomNode;
    private klayDisplay: DomNode;
    private emergencyDisplay: DomNode;

    private id = -1;
    private krno = BigNumber.from(0);
    private klay = BigNumber.from(0);

    constructor() {
        super(".mining-item");
        this.append(
            this.imageDisplay = el("img"),
            this.nameDisplay = el("h3"),
            el("a",
                el("img.send", { src: "/images/shared/icn/send.svg", alt: "send icon" }),
                {
                    click: () => new Prompt(msg("SEND_PROMPT_TITLE"), msg("SEND_PROMPT_DESC"), msg("SEND_PROMPT_BUTTON"), async (to) => {
                        await GaiaNFTContract.transferLegacy(to, this.id);
                        ViewUtil.waitTransactionAndRefresh();
                    }),
                }),
            el(".content-wrap",
                el("section",
                    el("header", msg("MY_INTEREST_DESC")),
                    el(".amount-wrap",
                        this.krnoDisplay = el(".krno", "... KRNO"),
                        this.klayDisplay = el(".klay", "... KLAY"),
                    ),
                ),
            ),
            el(".content-wrap",
                el("section",
                    el("header", "이머전시 리워드"),
                    el(".amount-wrap",
                        this.emergencyDisplay = el(".klay", "... KLAY"),
                    ),
                ),
            ),
        );
    }

    public init(id: number, reward: BigNumber, collected: BigNumber) {
        this.id = id;
        this.imageDisplay.domElement.src = `https://storage.googleapis.com/gaia-protocol/kronos/${id}.png`;
        this.nameDisplay.appendText(`#${this.id}`);
        this.loadKRNO();
        this.loadKlay();
        this.emergencyDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(reward.sub(collected)), 5)} KLAY`);
    }

    private async loadKRNO() {
        this.krno = await GaiaOperationContract.claimableKRNO([this.id]);
        this.krnoDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatUnits(this.krno, 9))} KRNO`);
    }

    private async loadKlay() {
        this.klay = await GaiaOperationContract.claimableKlay([this.id]);
        this.klayDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(this.klay))} KLAY`);
    }

    public delete() {
        super.delete();
    }
}
