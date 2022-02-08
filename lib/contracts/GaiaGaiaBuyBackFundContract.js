"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const GaiaOperation_json_1 = __importDefault(require("./abi/artifacts/contracts/GaiaOperation.sol/GaiaOperation.json"));
const Contract_1 = __importDefault(require("./Contract"));
class GaiaGaiaBuyBackFundContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.GaiaOperation, GaiaOperation_json_1.default.abi);
    }
}
exports.default = new GaiaGaiaBuyBackFundContract();
//# sourceMappingURL=GaiaGaiaBuyBackFundContract.js.map