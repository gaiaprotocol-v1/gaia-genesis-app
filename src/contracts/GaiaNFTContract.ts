import { BigNumber } from "ethers";
import Config from "../Config";
import GaiaNFTArtifact from "./abi/gaia-kronos/artifacts/contracts/GaiaNFT.sol/GaiaNFT.json";
import KIP17Contract from "./standard/KIP17Contract";

class GaiaNFTContract extends KIP17Contract {

    constructor() {
        super(Config.contracts.GaiaNFT, GaiaNFTArtifact.abi);
    }

    public async totalSupply(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalSupply"));
    }
}

export default new GaiaNFTContract();
