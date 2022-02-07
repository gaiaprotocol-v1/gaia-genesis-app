import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface MockStakingInterface extends utils.Interface {
    contractName: "MockStaking";
    functions: {
        "renounceManagement()": FunctionFragment;
        "claim(address)": FunctionFragment;
        "index()": FunctionFragment;
        "pushManagement(address)": FunctionFragment;
        "manager()": FunctionFragment;
        "pullManagement()": FunctionFragment;
        "stake(uint256,address)": FunctionFragment;
        "contractBalance()": FunctionFragment;
        "epoch()": FunctionFragment;
        "sKRNO()": FunctionFragment;
        "unstake(uint256,bool)": FunctionFragment;
        "rebase()": FunctionFragment;
        "KRNO()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "renounceManagement", values?: undefined): string;
    encodeFunctionData(functionFragment: "claim", values: [string]): string;
    encodeFunctionData(functionFragment: "index", values?: undefined): string;
    encodeFunctionData(functionFragment: "pushManagement", values: [string]): string;
    encodeFunctionData(functionFragment: "manager", values?: undefined): string;
    encodeFunctionData(functionFragment: "pullManagement", values?: undefined): string;
    encodeFunctionData(functionFragment: "stake", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "contractBalance", values?: undefined): string;
    encodeFunctionData(functionFragment: "epoch", values?: undefined): string;
    encodeFunctionData(functionFragment: "sKRNO", values?: undefined): string;
    encodeFunctionData(functionFragment: "unstake", values: [BigNumberish, boolean]): string;
    encodeFunctionData(functionFragment: "rebase", values?: undefined): string;
    encodeFunctionData(functionFragment: "KRNO", values?: undefined): string;
    decodeFunctionResult(functionFragment: "renounceManagement", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "index", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pushManagement", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "manager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pullManagement", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "epoch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sKRNO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unstake", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rebase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "KRNO", data: BytesLike): Result;
    events: {
        "OwnershipPushed(address,address)": EventFragment;
        "OwnershipPulled(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnershipPushed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipPulled"): EventFragment;
}
export declare type OwnershipPushedEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipPushedEventFilter = TypedEventFilter<OwnershipPushedEvent>;
export declare type OwnershipPulledEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipPulledEventFilter = TypedEventFilter<OwnershipPulledEvent>;
export interface MockStaking extends BaseContract {
    contractName: "MockStaking";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MockStakingInterface;
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
        renounceManagement(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        claim(arg0: string, overrides?: CallOverrides): Promise<[void]>;
        index(overrides?: CallOverrides): Promise<[BigNumber]>;
        pushManagement(newOwner_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        manager(overrides?: CallOverrides): Promise<[string]>;
        pullManagement(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        stake(_amount: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        contractBalance(overrides?: CallOverrides): Promise<[BigNumber]>;
        epoch(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            number,
            number
        ] & {
            number: BigNumber;
            distribute: BigNumber;
            length: number;
            endBlock: number;
        }>;
        sKRNO(overrides?: CallOverrides): Promise<[string]>;
        unstake(_amount: BigNumberish, _trigger: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        rebase(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        KRNO(overrides?: CallOverrides): Promise<[string]>;
    };
    renounceManagement(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    claim(arg0: string, overrides?: CallOverrides): Promise<void>;
    index(overrides?: CallOverrides): Promise<BigNumber>;
    pushManagement(newOwner_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    manager(overrides?: CallOverrides): Promise<string>;
    pullManagement(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    stake(_amount: BigNumberish, _recipient: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    contractBalance(overrides?: CallOverrides): Promise<BigNumber>;
    epoch(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        number,
        number
    ] & {
        number: BigNumber;
        distribute: BigNumber;
        length: number;
        endBlock: number;
    }>;
    sKRNO(overrides?: CallOverrides): Promise<string>;
    unstake(_amount: BigNumberish, _trigger: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    rebase(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    KRNO(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        renounceManagement(overrides?: CallOverrides): Promise<void>;
        claim(arg0: string, overrides?: CallOverrides): Promise<void>;
        index(overrides?: CallOverrides): Promise<BigNumber>;
        pushManagement(newOwner_: string, overrides?: CallOverrides): Promise<void>;
        manager(overrides?: CallOverrides): Promise<string>;
        pullManagement(overrides?: CallOverrides): Promise<void>;
        stake(_amount: BigNumberish, _recipient: string, overrides?: CallOverrides): Promise<boolean>;
        contractBalance(overrides?: CallOverrides): Promise<BigNumber>;
        epoch(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            number,
            number
        ] & {
            number: BigNumber;
            distribute: BigNumber;
            length: number;
            endBlock: number;
        }>;
        sKRNO(overrides?: CallOverrides): Promise<string>;
        unstake(_amount: BigNumberish, _trigger: boolean, overrides?: CallOverrides): Promise<void>;
        rebase(overrides?: CallOverrides): Promise<void>;
        KRNO(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "OwnershipPushed(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipPushedEventFilter;
        OwnershipPushed(previousOwner?: string | null, newOwner?: string | null): OwnershipPushedEventFilter;
        "OwnershipPulled(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipPulledEventFilter;
        OwnershipPulled(previousOwner?: string | null, newOwner?: string | null): OwnershipPulledEventFilter;
    };
    estimateGas: {
        renounceManagement(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        claim(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        index(overrides?: CallOverrides): Promise<BigNumber>;
        pushManagement(newOwner_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        manager(overrides?: CallOverrides): Promise<BigNumber>;
        pullManagement(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        stake(_amount: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        contractBalance(overrides?: CallOverrides): Promise<BigNumber>;
        epoch(overrides?: CallOverrides): Promise<BigNumber>;
        sKRNO(overrides?: CallOverrides): Promise<BigNumber>;
        unstake(_amount: BigNumberish, _trigger: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        rebase(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        KRNO(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        renounceManagement(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        claim(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        index(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pushManagement(newOwner_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        manager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pullManagement(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        stake(_amount: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        contractBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        epoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sKRNO(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unstake(_amount: BigNumberish, _trigger: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        rebase(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        KRNO(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=MockStaking.d.ts.map