import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IKlaySwapFactory, IKlaySwapFactoryInterface } from "../IKlaySwapFactory";
export declare class IKlaySwapFactory__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IKlaySwapFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IKlaySwapFactory;
}
//# sourceMappingURL=IKlaySwapFactory__factory.d.ts.map