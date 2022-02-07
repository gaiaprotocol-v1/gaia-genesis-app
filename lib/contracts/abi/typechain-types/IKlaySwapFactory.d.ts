import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IKlaySwapFactoryInterface extends utils.Interface {
    contractName: "IKlaySwapFactory";
    functions: {
        "exchangeKctPos(address,uint256,address,uint256,address[])": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "exchangeKctPos", values: [string, BigNumberish, string, BigNumberish, string[]]): string;
    decodeFunctionResult(functionFragment: "exchangeKctPos", data: BytesLike): Result;
    events: {};
}
export interface IKlaySwapFactory extends BaseContract {
    contractName: "IKlaySwapFactory";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IKlaySwapFactoryInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, path: string[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, path: string[], overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, path: string[], overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, path: string[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, path: string[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IKlaySwapFactory.d.ts.map