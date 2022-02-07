import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface MockFactoryInterface extends utils.Interface {
    contractName: "MockFactory";
    functions: {
        "priceRatio()": FunctionFragment;
        "estimatePos(address,uint256,address)": FunctionFragment;
        "exchangeKctPos(address,uint256,address,uint256,address[])": FunctionFragment;
        "setPriceRatio(uint256)": FunctionFragment;
        "estimateNeg(address,address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "priceRatio", values?: undefined): string;
    encodeFunctionData(functionFragment: "estimatePos", values: [string, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "exchangeKctPos", values: [string, BigNumberish, string, BigNumberish, string[]]): string;
    encodeFunctionData(functionFragment: "setPriceRatio", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "estimateNeg", values: [string, string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "priceRatio", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "estimatePos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeKctPos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPriceRatio", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "estimateNeg", data: BytesLike): Result;
    events: {};
}
export interface MockFactory extends BaseContract {
    contractName: "MockFactory";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MockFactoryInterface;
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
        priceRatio(overrides?: CallOverrides): Promise<[BigNumber]>;
        estimatePos(arg0: string, inAmount: BigNumberish, arg2: string, overrides?: CallOverrides): Promise<[BigNumber] & {
            outAmount: BigNumber;
        }>;
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, arg4: string[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setPriceRatio(_priceRatio: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        estimateNeg(arg0: string, arg1: string, outAmount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            inAmount: BigNumber;
        }>;
    };
    priceRatio(overrides?: CallOverrides): Promise<BigNumber>;
    estimatePos(arg0: string, inAmount: BigNumberish, arg2: string, overrides?: CallOverrides): Promise<BigNumber>;
    exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, arg4: string[], overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setPriceRatio(_priceRatio: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    estimateNeg(arg0: string, arg1: string, outAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        priceRatio(overrides?: CallOverrides): Promise<BigNumber>;
        estimatePos(arg0: string, inAmount: BigNumberish, arg2: string, overrides?: CallOverrides): Promise<BigNumber>;
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, arg4: string[], overrides?: CallOverrides): Promise<void>;
        setPriceRatio(_priceRatio: BigNumberish, overrides?: CallOverrides): Promise<void>;
        estimateNeg(arg0: string, arg1: string, outAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        priceRatio(overrides?: CallOverrides): Promise<BigNumber>;
        estimatePos(arg0: string, inAmount: BigNumberish, arg2: string, overrides?: CallOverrides): Promise<BigNumber>;
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, arg4: string[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setPriceRatio(_priceRatio: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        estimateNeg(arg0: string, arg1: string, outAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        priceRatio(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        estimatePos(arg0: string, inAmount: BigNumberish, arg2: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        exchangeKctPos(inToken: string, inAmount: BigNumberish, outToken: string, outAmountMin: BigNumberish, arg4: string[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setPriceRatio(_priceRatio: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        estimateNeg(arg0: string, arg1: string, outAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=MockFactory.d.ts.map