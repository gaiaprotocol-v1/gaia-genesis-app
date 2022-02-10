import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IsKRNO, IsKRNOInterface } from "../IsKRNO";
export declare class IsKRNO__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IsKRNOInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IsKRNO;
}
//# sourceMappingURL=IsKRNO__factory.d.ts.map