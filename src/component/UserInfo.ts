import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import CommonUtil from "../CommonUtil";
import Wallet from "../klaytn/Wallet";

export default class UserInfo extends DomNode {

    private connectWalletButton: DomNode;
    private addressDisplay: DomNode;

    constructor() {
        super(".user-info");
        this.append(
            this.connectWalletButton = el("a.connect-wallet", msg("CONNECT_WALLET_BUTTON"), {
                click: () => Wallet.connect(),
            }),
            this.addressDisplay = el("a.wallet-address"),
        );
        this.addressDisplay.style({ display: "none" });
        Wallet.on("connect", this.connectHandler);
        this.loadAddress();
    }

    private connectHandler = () => {
        this.loadAddress();
    };

    private async loadAddress() {
        const address = await Wallet.loadAddress();
        if (address !== undefined && this.deleted !== true) {
            if (this.connectWalletButton.deleted !== true) {
                this.connectWalletButton.delete();
            }
            this.addressDisplay.style({ display: "block" });
            this.addressDisplay.empty().appendText(CommonUtil.shortenAddress(address));
        }
    }

    public delete() {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
