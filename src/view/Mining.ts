import Debouncer from "@hanul/debouncer";
import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import SkyUtil from "skyutil";
import CommonUtil from "../CommonUtil";
import MiningItem from "../component/MiningItem";
import Alert from "../component/shared/dialogue/Alert";
import Confirm from "../component/shared/dialogue/Confirm";
import GaiaNFTContract from "../contracts/GaiaNFTContract";
import GaiaOperationContract from "../contracts/GaiaOperationContract";
import StakingContract from "../contracts/StakingContract";
import ExtWallet from "../klaytn/ExtWallet";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Mining implements View {

    private container: DomNode;
    private idInput: DomNode<HTMLInputElement>;
    private totalKRNODisplay: DomNode;
    private totalKlayDisplay: DomNode;
    private rebaseDisplay: DomNode;
    private nftList: DomNode;
    private interval: any;

    private tokenIds: number[] = [];
    private krnos: BigNumber[] = [];
    private totalKlay = BigNumber.from(0);

    constructor() {
        Layout.current.title = msg("MINING_TITLE");
        Layout.current.content.append(
            this.container = el("section.mining-view",
                el("header", { "data-aos": "zoom-in" },
                    el(".title-container",
                        el("h1", msg("MINING_TITLE")),
                        this.rebaseDisplay = el("h2", msg("REBASE_TIME_DESC").replace(/{time}/, String("0"))),
                    ),
                    el(".input-container",
                        this.idInput = el("input", { placeholder: "NFT ID" }),
                        el("button", msg("CHECK_INTEREST_TITLE"), {
                            click: async () => {
                                const id = this.idInput.domElement.value;
                                const krno = await GaiaOperationContract.claimableKRNO([id]);
                                const klay = await GaiaOperationContract.claimableKlay([id]);
                                new Alert(msg("CHECK_INTEREST_TITLE"),
                                    msg("CHECK_INTEREST_DESC")
                                        .replace(/{id}/, String(id))
                                        .replace(/{krnoAmount}/, String(CommonUtil.numberWithCommas(utils.formatUnits(krno, 9))))
                                        .replace(/{klayAmount}/, String(CommonUtil.numberWithCommas(utils.formatEther(klay))))
                                );
                            }
                        }),
                    ),
                ),
                el("article", { "data-aos": "zoom-in" },
                    el(".tool-box",
                        el(".title-container",
                            el("header", msg("MY_NFT_TITLE")),
                            this.totalKRNODisplay = el("p", msg("MY_INTEREST_KRNO_DESC").replace(/{amount}/, String("..."))),
                            this.totalKlayDisplay = el("p", msg("MY_INTEREST_KLAY_DESC").replace(/{amount}/, String("..."))),
                        ),
                        el(".button-container",
                            el("button.all-mining-button", msg("ALL_CLAIM_KRNO_TITLE"), {
                                click: () => {
                                    new Confirm(msg("ALL_CLAIM_KRNO_TITLE"), msg("CLAIM_ALERT_DESC"), msg("CLAIM_ALERT_BUTTON"), async () => {
                                        await GaiaOperationContract.claim(this.tokenIds, this.krnos);
                                        ViewUtil.waitTransactionAndRefresh();
                                    });
                                },
                            }),
                            el("button.all-mining-button", msg("ALL_CLAIM_KLAY_TITLE"), {
                                click: () => {
                                    new Confirm(msg("ALL_CLAIM_KLAY_TITLE"), msg("CLAIM_ALERT_DESC"), msg("CLAIM_ALERT_BUTTON"), async () => {
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
        this.interval = setInterval(() => this.loadRebase(), 1000);
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
            this.totalKRNODisplay.empty().appendText(`${msg("MY_INTEREST_KRNO_DESC").replace(/{amount}/, String(utils.formatUnits(totalKRNO, 9)))}`);
            this.totalKlay = await GaiaOperationContract.claimableKlay(this.tokenIds);
            this.totalKlayDisplay.empty().appendText(`${msg("MY_INTEREST_KLAY_DESC").replace(/{amount}/, String(utils.formatEther(this.totalKlay)))}`);
        }
    }

    private async loadRebase() {
        const stakingRebaseTime = (await StakingContract.epoch()).endTime;
        const blockNumber = await ExtWallet.loadBlockTime();
        const diff = stakingRebaseTime - blockNumber;
        const hour = Math.floor(diff / 3600);
        const min = Math.floor((diff % 3600) / 60);

        this.rebaseDisplay.empty().appendText(msg("REBASE_TIME_DESC")
            .replace(/{hour}/, String(hour))
            .replace(/{min}/, String(min)));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}