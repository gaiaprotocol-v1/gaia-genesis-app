import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class GaiaOperationContract extends Contract {
    constructor();
    claimableKRNO(ids: BigNumberish[]): Promise<BigNumber>;
    claimableKlay(ids: BigNumberish[]): Promise<BigNumber>;
    claim(ids: BigNumberish[], amounts: BigNumber[]): Promise<void>;
    claimKlayViaZap(ids: BigNumberish[], amounts: BigNumber[], minAmount: BigNumber, swapRouteArray: string[]): Promise<void>;
    initialKRNOEach(): Promise<BigNumber>;
    getKRNOBalance(id: BigNumberish): Promise<BigNumber>;
}
declare const _default: GaiaOperationContract;
export default _default;
//# sourceMappingURL=GaiaOperationContract.d.ts.map