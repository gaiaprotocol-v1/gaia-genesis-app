import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface GaiaBuyBackFundInterface extends utils.Interface {
    contractName: "GaiaBuyBackFund";
    functions: {
        "withdrawToken(address,address,uint256)": FunctionFragment;
        "withdrawGaiaNFT(uint256[],address)": FunctionFragment;
        "closeBuyBack()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "withdrawKlay(address,uint256)": FunctionFragment;
        "refundableKlay()": FunctionFragment;
        "owner()": FunctionFragment;
        "isOwner()": FunctionFragment;
        "sellGaiaNFT(uint256[])": FunctionFragment;
        "gaiaNFT()": FunctionFragment;
        "buyBack()": FunctionFragment;
        "gaiaOperation()": FunctionFragment;
        "updateGaiaOperation(address)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "withdrawToken", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdrawGaiaNFT", values: [BigNumberish[], string]): string;
    encodeFunctionData(functionFragment: "closeBuyBack", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "withdrawKlay", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "refundableKlay", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "isOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "sellGaiaNFT", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "gaiaNFT", values?: undefined): string;
    encodeFunctionData(functionFragment: "buyBack", values?: undefined): string;
    encodeFunctionData(functionFragment: "gaiaOperation", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateGaiaOperation", values: [string]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    decodeFunctionResult(functionFragment: "withdrawToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawGaiaNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "closeBuyBack", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawKlay", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "refundableKlay", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sellGaiaNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "gaiaNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyBack", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "gaiaOperation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateGaiaOperation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "CloseBuyBack()": EventFragment;
        "WithdrawKlay(address,uint256)": EventFragment;
        "Sell(uint256,address,uint256)": EventFragment;
        "UpdateGaiaOperation(address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CloseBuyBack"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WithdrawKlay"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Sell"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdateGaiaOperation"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type CloseBuyBackEvent = TypedEvent<[], {}>;
export declare type CloseBuyBackEventFilter = TypedEventFilter<CloseBuyBackEvent>;
export declare type WithdrawKlayEvent = TypedEvent<[
    string,
    BigNumber
], {
    recipient: string;
    amount: BigNumber;
}>;
export declare type WithdrawKlayEventFilter = TypedEventFilter<WithdrawKlayEvent>;
export declare type SellEvent = TypedEvent<[
    BigNumber,
    string,
    BigNumber
], {
    id: BigNumber;
    seller: string;
    refundedKlay: BigNumber;
}>;
export declare type SellEventFilter = TypedEventFilter<SellEvent>;
export declare type UpdateGaiaOperationEvent = TypedEvent<[
    string
], {
    newGaiaOperation: string;
}>;
export declare type UpdateGaiaOperationEventFilter = TypedEventFilter<UpdateGaiaOperationEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface GaiaBuyBackFund extends BaseContract {
    contractName: "GaiaBuyBackFund";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: GaiaBuyBackFundInterface;
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
        withdrawToken(token: string, recipient: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdrawGaiaNFT(ids: BigNumberish[], recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        closeBuyBack(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdrawKlay(recipient: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        refundableKlay(overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        isOwner(overrides?: CallOverrides): Promise<[boolean]>;
        sellGaiaNFT(ids: BigNumberish[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        gaiaNFT(overrides?: CallOverrides): Promise<[string]>;
        buyBack(overrides?: CallOverrides): Promise<[boolean]>;
        gaiaOperation(overrides?: CallOverrides): Promise<[string]>;
        updateGaiaOperation(newGaiaOperation: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    withdrawToken(token: string, recipient: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdrawGaiaNFT(ids: BigNumberish[], recipient: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    closeBuyBack(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdrawKlay(recipient: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    refundableKlay(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    isOwner(overrides?: CallOverrides): Promise<boolean>;
    sellGaiaNFT(ids: BigNumberish[], overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    gaiaNFT(overrides?: CallOverrides): Promise<string>;
    buyBack(overrides?: CallOverrides): Promise<boolean>;
    gaiaOperation(overrides?: CallOverrides): Promise<string>;
    updateGaiaOperation(newGaiaOperation: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        withdrawToken(token: string, recipient: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        withdrawGaiaNFT(ids: BigNumberish[], recipient: string, overrides?: CallOverrides): Promise<void>;
        closeBuyBack(overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        withdrawKlay(recipient: string, amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
        refundableKlay(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        isOwner(overrides?: CallOverrides): Promise<boolean>;
        sellGaiaNFT(ids: BigNumberish[], overrides?: CallOverrides): Promise<void>;
        gaiaNFT(overrides?: CallOverrides): Promise<string>;
        buyBack(overrides?: CallOverrides): Promise<boolean>;
        gaiaOperation(overrides?: CallOverrides): Promise<string>;
        updateGaiaOperation(newGaiaOperation: string, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "CloseBuyBack()"(): CloseBuyBackEventFilter;
        CloseBuyBack(): CloseBuyBackEventFilter;
        "WithdrawKlay(address,uint256)"(recipient?: string | null, amount?: null): WithdrawKlayEventFilter;
        WithdrawKlay(recipient?: string | null, amount?: null): WithdrawKlayEventFilter;
        "Sell(uint256,address,uint256)"(id?: BigNumberish | null, seller?: string | null, refundedKlay?: null): SellEventFilter;
        Sell(id?: BigNumberish | null, seller?: string | null, refundedKlay?: null): SellEventFilter;
        "UpdateGaiaOperation(address)"(newGaiaOperation?: null): UpdateGaiaOperationEventFilter;
        UpdateGaiaOperation(newGaiaOperation?: null): UpdateGaiaOperationEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        withdrawToken(token: string, recipient: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdrawGaiaNFT(ids: BigNumberish[], recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        closeBuyBack(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdrawKlay(recipient: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        refundableKlay(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        isOwner(overrides?: CallOverrides): Promise<BigNumber>;
        sellGaiaNFT(ids: BigNumberish[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        gaiaNFT(overrides?: CallOverrides): Promise<BigNumber>;
        buyBack(overrides?: CallOverrides): Promise<BigNumber>;
        gaiaOperation(overrides?: CallOverrides): Promise<BigNumber>;
        updateGaiaOperation(newGaiaOperation: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        withdrawToken(token: string, recipient: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdrawGaiaNFT(ids: BigNumberish[], recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        closeBuyBack(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdrawKlay(recipient: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        refundableKlay(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sellGaiaNFT(ids: BigNumberish[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        gaiaNFT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        buyBack(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        gaiaOperation(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        updateGaiaOperation(newGaiaOperation: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=GaiaBuyBackFund.d.ts.map