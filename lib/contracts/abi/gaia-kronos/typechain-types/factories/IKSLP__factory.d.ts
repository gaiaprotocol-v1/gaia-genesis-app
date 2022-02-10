import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKSLP, IKSLPInterface } from "../IKSLP";
export declare class IKSLP__factory {
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
    static createInterface(): IKSLPInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKSLP;
}
//# sourceMappingURL=IKSLP__factory.d.ts.map