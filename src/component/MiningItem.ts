import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../CommonUtil";
import GaiaNFTContract from "../contracts/GaiaNFTContract";
import GaiaOperationContract from "../contracts/GaiaOperationContract";
import ViewUtil from "../view/ViewUtil";
import Prompt from "./dialogue/Prompt";

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
            el("img", { src: "/images/shared/img/sneakpeek1.jpeg" }),
            this.nameDisplay = el("h3"),
            el("a",
                el("img.send", { src: "/images/shared/icn/send.svg", alt: "send icon" }),
                {
                    click: () => new Prompt("전송하기", "전송받을 지갑 주소를 입력해주시기 바랍니다. 전송이 완료되면 절대 되찾을 수 없으니, 지갑 주소를 여러번 확인하시기 바랍니다.", "전송", async (to) => {
                        await GaiaNFTContract.transfer(to, this.id);
                        ViewUtil.waitTransactionAndRefresh();
                    }),
                }),
            el(".content-wrap",
                el(".amount-wrap",
                    this.krnoDisplay = el(".krno", "... KRNO"),
                    this.klayDisplay = el(".klay", "... KLAY"),
                ),
                el(".button-wrap",
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
