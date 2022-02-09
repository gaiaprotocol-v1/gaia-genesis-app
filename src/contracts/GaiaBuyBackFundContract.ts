import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import GaiaBuyBackFundArtifact from "./abi/artifacts/contracts/GaiaBuyBackFund.sol/GaiaBuyBackFund.json";
import Contract from "./Contract";
import GaiaNFTContract from "./GaiaNFTContract";

class GaiaBuyBackFundContract extends Contract {

    constructor() {
        super(Config.contracts.GaiaBuyBackFund, GaiaBuyBackFundArtifact.abi);
    }

    public async sellGaiaNFT(ids: BigNumberish[]) {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if (await GaiaNFTContract.isApprovedForAll(owner, this.address) !== true) {
                await GaiaNFTContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("sellGaiaNFT", ids);
        }
    }

    public async refundableKlay(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("refundableKlay"));
    }
}

export default new GaiaBuyBackFundContract();
