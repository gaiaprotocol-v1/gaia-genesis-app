import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import CommonUtil from "../CommonUtil";
import GaiaBuyBackFundContract from "../contracts/GaiaBuyBackFundContract";
import ViewUtil from "../view/ViewUtil";
import Confirm from "./shared/dialogue/Confirm";

export default class BuybackItem extends DomNode {

    private imageDisplay: DomNode<HTMLImageElement>;
    private nameDisplay: DomNode;

    private id = -1;

    constructor(refundableKlay: BigNumber) {
        super(".buyback-item");
        this.append(
            this.imageDisplay = el("img"),
            this.nameDisplay = el("h3"),
            el("p", `${CommonUtil.numberWithCommas(utils.formatEther(refundableKlay))} KLAY`),
            el("button", msg("BUYBACK_BUTTON"), {
                click: () => {
                    new Confirm("바이백 확인", "정말 바이백 하시겠습니까? 바이백 이후에는 다시는 NFT를 되찾을 수 없습니다.", "바이백 진행", async () => {
                        await GaiaBuyBackFundContract.sellGaiaNFT([this.id]);
                        ViewUtil.waitTransactionAndRefresh();
                    });
                },
            }),
        )
    }

    public init(id: number) {
        this.id = id;
        this.imageDisplay.domElement.src = `https://storage.googleapis.com/gaia-protocol/kronos/${id}.png`;
        this.nameDisplay.appendText(`#${this.id}`);
    }

    public delete() {
        super.delete();
    }
}
