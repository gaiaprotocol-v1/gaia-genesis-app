"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGaiaBuyBackFund__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        constant: true,
        inputs: [],
        name: "refundableKlay",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "sellGaiaNFT",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "gaiaNFT",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "buyBack",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "gaiaOperation",
        outputs: [
            {
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [],
        name: "CloseBuyBack",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "recipient",
                type: "address",
            },
            {
                indexed: false,
                name: "amount",
                type: "uint256",
            },
        ],
        name: "WithdrawKlay",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                name: "seller",
                type: "address",
            },
            {
                indexed: false,
                name: "refundedKlay",
                type: "uint256",
            },
        ],
        name: "Sell",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                name: "newGaiaOperation",
                type: "address",
            },
        ],
        name: "UpdateGaiaOperation",
        type: "event",
    },
];
class IGaiaBuyBackFund__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IGaiaBuyBackFund__factory = IGaiaBuyBackFund__factory;
IGaiaBuyBackFund__factory.abi = _abi;
//# sourceMappingURL=IGaiaBuyBackFund__factory.js.map