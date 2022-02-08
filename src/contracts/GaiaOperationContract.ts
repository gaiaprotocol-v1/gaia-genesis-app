import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import GaiaOperationArtifact from "./abi/artifacts/contracts/GaiaOperation.sol/GaiaOperation.json";
import Contract from "./Contract";

class GaiaOperationContract extends Contract {

    constructor() {
        super(Config.contracts.GaiaOperation, GaiaOperationArtifact.abi);
    }

    public async claimableKRNO(ids: BigNumberish[]): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableKRNO", ids));
    }

    public async claimableKlay(ids: BigNumberish[]): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("claimableKlay", ids));
    }

    public async claim(ids: BigNumberish[], amounts: BigNumber[]) {
        await this.runWalletMethod("claim", ids, amounts);
    }

    public async claimKlayViaZap(ids: BigNumberish[], amounts: BigNumber[], minAmount: BigNumber, swapRouteArray: string[]) {
        await this.runWalletMethod("claimKlayViaZap", ids, amounts, minAmount, swapRouteArray);
    }
}

export default new GaiaOperationContract();
