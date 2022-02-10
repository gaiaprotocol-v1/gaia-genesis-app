"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const GaiaOperation_json_1 = __importDefault(require("./abi/gaia-kronos/artifacts/contracts/GaiaOperation.sol/GaiaOperation.json"));
const Contract_1 = __importDefault(require("./Contract"));
class GaiaOperationContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.GaiaOperation, GaiaOperation_json_1.default.abi);
    }
    async claimableKRNO(ids) {
        return ethers_1.BigNumber.from(await this.runMethod("claimableKRNO", ids));
    }
    async claimableKlay(ids) {
        return ethers_1.BigNumber.from(await this.runMethod("claimableKlay", ids));
    }
    async claim(ids, amounts) {
        await this.runWalletMethod("claim", ids, amounts);
    }
    async claimKlayViaZap(ids, amounts, minAmount, swapRouteArray) {
        await this.runWalletMethod("claimKlayViaZap", ids, amounts, minAmount, swapRouteArray);
    }
    async getKRNOBalance(id) {
        return ethers_1.BigNumber.from(await this.runMethod("getKRNOBalance", id));
    }
}
exports.default = new GaiaOperationContract();
//# sourceMappingURL=GaiaOperationContract.js.map