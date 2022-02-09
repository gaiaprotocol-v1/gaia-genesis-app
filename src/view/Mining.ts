import Debouncer from "@hanul/debouncer";
import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import { View, ViewParams } from "skyrouter";
import SkyUtil from "skyutil";
import MiningItem from "../component/MiningItem";
import Confirm from "../component/shared/dialogue/Confirm";
import GaiaNFTContract from "../contracts/GaiaNFTContract";
import GaiaOperationContract from "../contracts/GaiaOperationContract";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Mining implements View {

    private container: DomNode;
    private totalKRNODisplay: DomNode;
    private totalKlayDisplay: DomNode;
    private nftList: DomNode;
    private interval: any;

    private tokenIds: number[] = [];
    private krnos: BigNumber[] = [];
    private totalKlay = BigNumber.from(0);

    constructor() {
        Layout.current.title = "Mining";
        Layout.current.content.append(
            this.container = el("section.mining-view",
                el("header", { "data-aos": "zoom-in" },
                    el("h1", "Mining"),
                    el("h2", "소유한 NFT로부터 채굴"),
                ),
                el("article", { "data-aos": "zoom-in" },
                    el(".tool-box",
                        el(".title-container",
                            el("header", "나의 NFT"),
                            this.totalKRNODisplay = el("p", "총 이자: ... KRNO"),
                            this.totalKlayDisplay = el("p", "총 이자: ... KLAY"),
                        ),
                        el(".button-container",
                            el("button.all-mining-button", "모두 KRNO로 받기", {
                                click: () => {
                                    new Confirm("KRON 받기", "이자를 수령하시겠습니까? 이자를 자주 수령하시면 복리 효과를 누리기 어려울 수 있습니다.", "계속 진행", async () => {
                                        await GaiaOperationContract.claim(this.tokenIds, this.krnos);
                                        ViewUtil.waitTransactionAndRefresh();
                                    });
                                },
                            }),
                            el("button.all-mining-button", "모두 KLAY로 받기", {
                                click: () => {
                                    new Confirm("KLAY로 받기", "이자를 수령하시겠습니까? 이자를 자주 수령하시면 복리 효과를 누리기 어려울 수 있습니다.", "계속 진행", async () => {
                                        await GaiaOperationContract.claimKlayViaZap(this.tokenIds, this.krnos, this.totalKlay, []);
                                        ViewUtil.waitTransactionAndRefresh();
                                    });
                                },
                            }),
                        ),
                    ),
                    this.nftList = el("article.nft-container", { "data-aos": "zoom-in" },),
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

            this.tokenIds = [];
            SkyUtil.repeat(balance, (i: number) => {
                const promise = async (index: number) => {
                    const item = new MiningItem().appendTo(this.nftList);
                    const tokenId = (await GaiaNFTContract.tokenOfOwnerByIndex(address, index)).toNumber();
                    if (tokenId === 0) {
                        item.delete();
                    } else {
                        item.init(tokenId);
                        this.tokenIds.push(tokenId);
                        this.krnos.push(await GaiaOperationContract.claimableKRNO([tokenId]));
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);

            const totalKRNO = await GaiaOperationContract.claimableKRNO(this.tokenIds);
            this.totalKRNODisplay.empty().appendText(`총 이자: ${utils.formatEther(totalKRNO)} KRNO`);
            this.totalKlay = await GaiaOperationContract.claimableKlay(this.tokenIds);
            this.totalKlayDisplay.empty().appendText(`총 이자: ${utils.formatEther(this.totalKlay)} KLAY`);
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}