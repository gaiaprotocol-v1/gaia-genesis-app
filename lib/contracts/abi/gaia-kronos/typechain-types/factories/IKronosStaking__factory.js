"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IKronosStaking__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: false,
        inputs: [
            {
                name: "_recipient",
                type: "address",
            },
        ],
        name: "claim",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_amount",
                type: "uint256",
            },
            {
                name: "_recipient",
                type: "address",
            },
        ],
        name: "stake",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "_amount",
                type: "uint256",
            },
            {
                name: "_trigger",
                type: "bool",
            },
        ],
        name: "unstake",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "rebase",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IKronosStaking__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IKronosStaking__factory = IKronosStaking__factory;
IKronosStaking__factory.abi = _abi;
//# sourceMappingURL=IKronosStaking__factory.js.map