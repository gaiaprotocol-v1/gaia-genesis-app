"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("./Contract"));
class sKRNOContract extends Contract_1.default {
    constructor() {
        super("0x6555F93f608980526B5cA79b3bE2d4EdadB5C562", [{
                "inputs": [],
                "name": "circulatingSupply",
                "outputs": [{
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }],
                "stateMutability": "view",
                "type": "function"
            }]);
    }
    async circulatingSupply() {
        return await this.runMethod("circulatingSupply");
    }
}
exports.default = new sKRNOContract();
//# sourceMappingURL=sKRNOContract.js.map