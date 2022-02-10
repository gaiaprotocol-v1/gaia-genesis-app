"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKlaySwapFactory__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "inToken",
                type: "address",
            },
            {
                name: "inAmount",
                type: "uint256",
            },
            {
                name: "outToken",
                type: "address",
            },
            {
                name: "outAmountMin",
                type: "uint256",
            },
            {
                name: "path",
                type: "address[]",
            },
        ],
        name: "exchangeKctPos",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
    },
];
class IKlaySwapFactory__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IKlaySwapFactory__factory = IKlaySwapFactory__factory;
IKlaySwapFactory__factory.abi = _abi;
//# sourceMappingURL=IKlaySwapFactory__factory.js.map