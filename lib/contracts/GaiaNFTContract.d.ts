import { BigNumber } from "ethers";
import KIP17Contract from "./standard/KIP17Contract";
declare class GaiaNFTContract extends KIP17Contract {
    constructor();
    totalSupply(): Promise<BigNumber>;
}
declare const _default: GaiaNFTContract;
export default _default;
//# sourceMappingURL=GaiaNFTContract.d.ts.map