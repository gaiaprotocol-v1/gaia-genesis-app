import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKLP, IKLPInterface } from "../IKLP";
export declare class IKLP__factory {
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
    static createInterface(): IKLPInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKLP;
}
//# sourceMappingURL=IKLP__factory.d.ts.map