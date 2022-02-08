import Config from "../Config";
import GaiaBuyBackFundArtifact from "./abi/artifacts/contracts/GaiaBuyBackFund.sol/GaiaBuyBackFund.json";
import Contract from "./Contract";

class GaiaBuyBackFundContract extends Contract {

    constructor() {
        super(Config.contracts.GaiaBuyBackFund, GaiaBuyBackFundArtifact.abi);
    }
}

export default new GaiaBuyBackFundContract();
