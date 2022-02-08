import Debouncer from "@hanul/debouncer";
import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import SkyUtil from "skyutil";
import MiningItem from "../component/MiningItem";
import GaiaNFTContract from "../contracts/GaiaNFTContract";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";

export default class Mining implements View {

    private container: DomNode;
    private nftList: DomNode;
    private interval: any;

    constructor() {
        Layout.current.title = "Mining";
        Layout.current.content.append(
            this.container = el(".mining-view",
                el(".title", { "data-aos": "zoom-in" },
                    el("h1", "Mining"),
                    el("p", "소유한 NFT로부터 채굴"),
                ),
                el(".my-nft-container", { "data-aos": "zoom-in" },
                    el(".tool-box",
                        el(".title-wrap",
                            el("h2", "나의 NFT"),
                            el("p", "총 이자: KRNO 12"),
                        ),
                        el("button.all-mining-button", "모두 KRNO로 받기"),
                        el("button.all-mining-button", "모두 KLAY로 받기"),
                    ),
                    this.nftList = el(".nft-container", { "data-aos": "zoom-in" }),
                ),
            ),
        );

        this.resizeDebouncer.run();
        Wallet.on("connect", () => this.resizeDebouncer.run());
    }

    private resizeDebouncer: Debouncer = new Debouncer(200, () => this.loadNFTs());

    private async loadNFTs() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = (await GaiaNFTContract.balanceOf(address)).toNumber();
            const promises: Promise<void>[] = [];
            SkyUtil.repeat(balance, (i: number) => {
                const promise = async (index: number) => {
                    const tokenId = await GaiaNFTContract.tokenOfOwnerByIndex(address, index);
                    new MiningItem(tokenId.toNumber()).appendTo(this.nftList);
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}