"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("./Contract"));
class lpContract extends Contract_1.default {
    constructor() {
        super("0xdf5caf79899407da1c1b31389448861a9846956d", {
            "constant": true,
            "inputs": [],
            "name": "getCurrentPool",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        });
    }
}
exports.default = new lpContract();
//# sourceMappingURL=sKRNOContract%20copy.js.map