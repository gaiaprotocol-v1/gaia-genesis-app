import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class GaiaBuyBackFundContract extends Contract {
    constructor();
    sellGaiaNFT(ids: BigNumberish[]): Promise<void>;
    refundableKlay(): Promise<BigNumber>;
}
declare const _default: GaiaBuyBackFundContract;
export default _default;
//# sourceMappingURL=GaiaBuyBackFundContract.d.ts.map