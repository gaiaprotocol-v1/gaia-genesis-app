import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../CommonUtil";
import GaiaOperationContract from "../contracts/GaiaOperationContract";
import ViewUtil from "../view/ViewUtil";

export default class MiningItem extends DomNode {

    private nameDisplay: DomNode;
    private krnoDisplay: DomNode;
    private klayDisplay: DomNode;

    private id = -1;
    private krno = BigNumber.from(0);
    private klay = BigNumber.from(0);

    constructor() {
        super(".mining-item");
        this.append(
            el("img", { src: "/images/nft/sneakpeek1.jpeg" }),
            this.nameDisplay = el("h3"),
            el("img.send", { src: "/images/icon/send.svg", alt: "send icon" }),
            el(".content-wrap",
                el(".amount-wrap",
                    this.krnoDisplay = el(".krno", "... KRNO"),
                    this.klayDisplay = el(".klay", "... KLAY"),
                ),
                el("button.krno-button", "KRON 받기", {
                    click: async () => {
                        await GaiaOperationContract.claim([this.id], [this.krno]);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
                el("button.klay-button", "KLAY로 받기", {
                    click: async () => {
                        await GaiaOperationContract.claimKlayViaZap([this.id], [this.krno], this.klay, []);
                        ViewUtil.waitTransactionAndRefresh();
                    },
                }),
            ),
        );
    }

    public init(id: number) {
        this.id = id;
        this.nameDisplay.appendText(`#${this.id}`);
        this.loadKRNO();
        this.loadKlay();
    }

    private async loadKRNO() {
        this.krno = await GaiaOperationContract.claimableKRNO([this.id]);
        this.krnoDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(this.krno))} KRNO`);
    }

    private async loadKlay() {
        this.klay = await GaiaOperationContract.claimableKlay([this.id]);
        this.klayDisplay.empty().appendText(`${CommonUtil.numberWithCommas(utils.formatEther(this.klay))} KLAY`);
    }

    public delete() {
        super.delete();
    }
}
