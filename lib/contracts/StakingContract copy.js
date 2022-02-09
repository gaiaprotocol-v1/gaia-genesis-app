"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("./Contract"));
class StakingContract extends Contract_1.default {
    constructor() {
        super("0x39281362641Da798De3801B23BFBA19155B57f13", {
            "inputs": [],
            "name": "epoch",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "number",
                    "type": "uint256"
                }, {
                    "internalType": "uint256",
                    "name": "distribute",
                    "type": "uint256"
                }, {
                    "internalType": "uint32",
                    "name": "length",
                    "type": "uint32"
                }, {
                    "internalType": "uint32",
                    "name": "endTime",
                    "type": "uint32"
                }],
            "stateMutability": "view",
            "type": "function"
        });
    }
}
exports.default = new StakingContract();
//# sourceMappingURL=StakingContract%20copy.js.map