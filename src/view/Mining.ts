import Debouncer from "@hanul/debouncer";
import { DomNode, el } from "@hanul/skynode";
import dayjs from 'dayjs';
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
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
import NFTAirdropContract from "../contracts/NFTAirdropContract";
import StakingContract from "../contracts/StakingContract";
import Klaytn from "../klaytn/Klaytn";
import Wallet from "../klaytn/Wallet";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

export default class Mining implements View {

    private container: DomNode;
    // private idInput: DomNode<HTMLInputElement>;
    // private totalKRNODisplay: DomNode;
    // private totalKlayDisplay: DomNode;
    private totalEmergencyDisplay: DomNode;
    // private rebaseDisplay: DomNode;
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
                        // this.rebaseDisplay = el("h2", msg("REBASE_TIME_DESC").replace(/{time}/, String("0"))),
                    ),
                    // el(".input-container",
                    //     this.idInput = el("input", { placeholder: "NFT ID" }),
                    //     el("button", msg("CHECK_INTEREST_TITLE"), {
                    //         click: async () => {
                    //             const id = this.idInput.domElement.value;
                    //             const krno = await GaiaOperationContract.claimableKRNO([id]);
                    //             const klay = await GaiaOperationContract.claimableKlay([id]);
                    //             new Alert(msg("CHECK_INTEREST_TITLE"),
                    //                 msg("CHECK_INTEREST_DESC")
                    //                     .replace(/{id}/, String(id))
                    //                     // .replace(/{krnoAmount}/, String(CommonUtil.numberWithCommas(utils.formatUnits(krno, 9))))
                    //                     .replace(/{klayAmount}/, String(CommonUtil.numberWithCommas(utils.formatEther(klay))))
                    //             );
                    //         }
                    //     }),
                    // ),
                ),
                el("article", { "data-aos": "zoom-in" },
                    el(".warning-container",
                        el("p", "현재 프로토콜 수정중에 있습니다."),
                    ),
                    el(".tool-box",
                        el(".title-container",
                            el("header", msg("MY_NFT_TITLE")),
                            // this.totalKRNODisplay = el("p", msg("MY_INTEREST_KRNO_DESC").replace(/{amount}/, String("..."))),
                            // this.totalKlayDisplay = el("p", msg("MY_INTEREST_KLAY_DESC").replace(/{amount}/, String("..."))),
                            this.totalEmergencyDisplay = el("p", "총 이머전시 리워드: ... KLAY"),
                        ),
                        el(".button-container",
                            //     // el("button.all-mining-button", msg("ALL_CLAIM_KRNO_TITLE"), {
                            //     //     click: () => {
                            //     //         // new Confirm(msg("ALL_CLAIM_KRNO_TITLE"), msg("CLAIM_ALERT_DESC"), msg("CLAIM_ALERT_BUTTON"), async () => {
                            //     //             await GaiaOperationContract.claim(this.tokenIds, this.krnos);
                            //     //             ViewUtil.waitTransactionAndRefresh();
                            //     //         });
                            //     //     },
                            //     // }),
                            //     el("button.all-mining-button", msg("ALL_CLAIM_KLAY_TITLE"), {
                            //         click: () => {
                            //             new Confirm(msg("ALL_CLAIM_KLAY_TITLE"), msg("CLAIM_ALERT_DESC"), msg("CLAIM_ALERT_BUTTON"), async () => {
                            //                 await GaiaOperationContract.claimKlayViaZap(this.tokenIds, this.krnos, this.totalKlay, []);
                            //                 ViewUtil.waitTransactionAndRefresh();
                            //             });
                            //         },
                            //     }),
                            el("button.all-mining-button", "모든 이머전시 리워드 받기", {
                                click: async () => {
                                    await NFTAirdropContract.collectAirdropReward(0, this.tokenIds);
                                    ViewUtil.waitTransactionAndRefresh();
                                },
                            }),
                        ),
                    ),
                    this.nftList = el("article.nft-container", { "data-aos": "zoom-in" },),
                ),
            ),
        );

        this.loadNFTsDebouncer.run();
        this.interval = setInterval(() => this.loadRebase(), 1000);
        Wallet.on("connect", () => this.loadNFTsDebouncer.run());
    }

    private loadNFTsDebouncer: Debouncer = new Debouncer(200, () => this.loadNFTs());

    private async loadNFTs() {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const reward = await NFTAirdropContract.airdropReward(0);

            const balance = (await GaiaNFTContract.balanceOf(address)).toNumber();
            const promises: Promise<void>[] = [];

            this.tokenIds = [];

            let totalEmergency = BigNumber.from(0);
            SkyUtil.repeat(balance, (i: number) => {
                const promise = async (index: number) => {
                    const item = new MiningItem().appendTo(this.nftList);
                    const tokenId = (await GaiaNFTContract.tokenOfOwnerByIndex(address, index)).toNumber();
                    const collected = await NFTAirdropContract.airdropCollected(0, tokenId);
                    if (tokenId === 0) {
                        item.delete();
                    } else {
                        item.init(tokenId, reward, collected);
                        const krno = await GaiaOperationContract.claimableKRNO([tokenId]);
                        this.tokenIds.push(tokenId);
                        this.krnos.push(krno);
                        totalEmergency = totalEmergency.add(reward.sub(collected));
                    }
                };
                promises.push(promise(i));
            });
            await Promise.all(promises);

            const totalKRNO = await GaiaOperationContract.claimableKRNO(this.tokenIds);
            // this.totalKRNODisplay.empty().appendText(`${msg("MY_INTEREST_KRNO_DESC").replace(/{amount}/, String(utils.formatUnits(totalKRNO, 9)))}`);
            this.totalKlay = await GaiaOperationContract.claimableKlay(this.tokenIds);
            // this.totalKlayDisplay.empty().appendText(`${msg("MY_INTEREST_KLAY_DESC").replace(/{amount}/, String(utils.formatEther(this.totalKlay)))}`);
            this.totalEmergencyDisplay.empty().appendText(`총 이머전시 리워드: ${String(utils.formatEther(totalEmergency))} KLAY`);
        }
    }

    private async loadRebase() {
        const stakingRebaseTime = (await StakingContract.epoch()).endTime;
        const blockNumber = await Klaytn.loadBlockTime();
        const diff = stakingRebaseTime - blockNumber;
        let hour = Math.floor(diff / 3600);
        let min = Math.floor((diff % 3600) / 60);

        if (Math.sign(hour) <= 0) {
            hour = 0;
        }

        let round = dayjs().diff('2022-02-11', 'days') * 3;
        const current = dayjs();

        dayjs.extend(isSameOrAfter);
        if (current.isSameOrAfter(current.set('h', 23).set('m', 4))) {
            round = round + 3;
        } else if (current.isSameOrAfter(current.set('h', 15).set('m', 4))) {
            round = round + 2;
        } else if (current.isSameOrAfter(current.set('h', 7).set('m', 4))) {
            round = round + 1;
        }

        // this.rebaseDisplay.empty().appendText(msg("REBASE_TIME_DESC")
        //     .replace(/{hour}/, String(hour))
        //     .replace(/{min}/, String(min))
        //     .replace(/{round}/, String(round + 1)));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        clearInterval(this.interval);
        this.container.delete();
    }
}