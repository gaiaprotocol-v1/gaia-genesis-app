"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
class Klaytn {
    constructor() {
        this.caver = new window.Caver(new window.Caver.providers.WebsocketProvider("wss://klaytn01.fandom.finance/ws/", {
            reconnect: {
                auto: true,
                delay: 1000,
                maxAttempts: true,
                onTimeout: false
            },
        }));
    }
    createContract(address, abi) {
        return this.caver.contract.create(abi, address);
    }
    async balanceOf(address) {
        return bignumber_1.BigNumber.from(await this.caver.klay.getBalance(address));
    }
    async loadBlockNumber() {
        return await this.caver.klay.getBlockNumber();
    }
    async loadBlockTime() {
        const current = await this.caver.klay.getBlockNumber();
        const block = await this.caver.klay.getBlock(current);
        return this.caver.utils.hexToNumber(block.timestamp);
    }
}
exports.default = new Klaytn();
//# sourceMappingURL=Klaytn.js.map