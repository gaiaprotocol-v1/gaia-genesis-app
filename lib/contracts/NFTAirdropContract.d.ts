import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class NFTAirdropContract extends Contract {
    constructor();
    airdropReward(airdropId: BigNumberish): Promise<BigNumber>;
    airdropCollected(airdropId: BigNumberish, id: BigNumberish): Promise<BigNumber>;
    collectAirdropReward(airdropId: BigNumberish, ids: BigNumberish[]): Promise<void>;
}
declare const _default: NFTAirdropContract;
export default _default;
//# sourceMappingURL=NFTAirdropContract.d.ts.map