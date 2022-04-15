import { BigNumber, BigNumberish } from "ethers";
import GaiaNFTAirdropArtifact from "./abi/airdrop/artifacts/contracts/GaiaNFTAirdrop.sol/GaiaNFTAirdrop.json";
import Contract from "./Contract";

class NFTAirdropContract extends Contract {

    constructor() {
        super("0x38227a720D85C1b1b7a2b9f843540Fd8E930f4Ca", GaiaNFTAirdropArtifact.abi);
    }

    public async airdropReward(airdropId: BigNumberish): Promise<BigNumber> {
        return BigNumber.from((await this.runMethod("airdrops", airdropId))[3]);
    }

    public async airdropCollected(airdropId: BigNumberish, id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("airdropCollected", airdropId, id));
    }

    public async collectAirdropReward(airdropId: BigNumberish, ids: BigNumberish[]) {
        if (ids.length > 25) {
            await this.runWalletMethodWithLargeGas("collectAirdropReward", airdropId, ids);
        } else {
            await this.runWalletMethod("collectAirdropReward", airdropId, ids);
        }
    }
}

export default new NFTAirdropContract();
