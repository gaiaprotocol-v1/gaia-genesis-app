import { BigNumber } from "@ethersproject/bignumber";
declare class Klaytn {
    caver: any;
    createContract(address: string, abi: any): any;
    balanceOf(address: string): Promise<BigNumber>;
    loadBlockNumber(): Promise<any>;
    loadBlockTime(): Promise<any>;
}
declare const _default: Klaytn;
export default _default;
//# sourceMappingURL=Klaytn.d.ts.map