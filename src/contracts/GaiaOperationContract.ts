import Config from "../Config";
import GaiaOperationArtifact from "./abi/artifacts/contracts/GaiaOperation.sol/GaiaOperation.json";
import Contract from "./Contract";

class GaiaOperationContract extends Contract {

    constructor() {
        super(Config.contracts.GaiaOperation, GaiaOperationArtifact.abi);
    }
}

export default new GaiaOperationContract();
