import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKronosStaking, IKronosStakingInterface } from "../IKronosStaking";
export declare class IKronosStaking__factory {
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
    static createInterface(): IKronosStakingInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKronosStaking;
}
//# sourceMappingURL=IKronosStaking__factory.d.ts.map