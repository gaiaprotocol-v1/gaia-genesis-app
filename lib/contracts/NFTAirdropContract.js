"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const GaiaNFTAirdrop_json_1 = __importDefault(require("./abi/airdrop/artifacts/contracts/GaiaNFTAirdrop.sol/GaiaNFTAirdrop.json"));
const Contract_1 = __importDefault(require("./Contract"));
class NFTAirdropContract extends Contract_1.default {
    constructor() {
        super("0x38227a720D85C1b1b7a2b9f843540Fd8E930f4Ca", GaiaNFTAirdrop_json_1.default.abi);
    }
    async airdropReward(airdropId) {
        return ethers_1.BigNumber.from((await this.runMethod("airdrops", airdropId))[3]);
    }
    async airdropCollected(airdropId, id) {
        return ethers_1.BigNumber.from(await this.runMethod("airdropCollected", airdropId, id));
    }
    async collectAirdropReward(airdropId, ids) {
        if (ids.length > 25) {
            await this.runWalletMethodWithLargeGas("collectAirdropReward", airdropId, ids);
        }
        else {
            await this.runWalletMethod("collectAirdropReward", airdropId, ids);
        }
    }
}
exports.default = new NFTAirdropContract();
//# sourceMappingURL=NFTAirdropContract.js.map