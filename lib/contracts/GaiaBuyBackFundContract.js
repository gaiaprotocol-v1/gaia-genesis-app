"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const GaiaBuyBackFund_json_1 = __importDefault(require("./abi/artifacts/contracts/GaiaBuyBackFund.sol/GaiaBuyBackFund.json"));
const Contract_1 = __importDefault(require("./Contract"));
const GaiaNFTContract_1 = __importDefault(require("./GaiaNFTContract"));
class GaiaBuyBackFundContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.GaiaBuyBackFund, GaiaBuyBackFund_json_1.default.abi);
    }
    async sellGaiaNFT(ids) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if (await GaiaNFTContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                await GaiaNFTContract_1.default.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("sellGaiaNFT", ids);
        }
    }
    async refundableKlay() {
        return ethers_1.BigNumber.from(await this.runMethod("refundableKlay"));
    }
}
exports.default = new GaiaBuyBackFundContract();
//# sourceMappingURL=GaiaBuyBackFundContract.js.map