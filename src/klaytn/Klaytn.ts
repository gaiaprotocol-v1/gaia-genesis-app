import { BigNumber } from "@ethersproject/bignumber";

class Klaytn {

    public caver = new (window as any).Caver(new (window as any).Caver.providers.WebsocketProvider("wss://klaytn04.fandom.finance/ws/", {
        reconnect: {
            auto: true,
            delay: 1000,
            maxAttempts: true,
            onTimeout: false
        },
    }));

    public createContract(address: string, abi: any) {
        return this.caver.contract.create(abi, address);
    }

    public async balanceOf(address: string) {
        return BigNumber.from(await this.caver.klay.getBalance(address));
    }

    public async loadBlockNumber() {
        return await this.caver.klay.getBlockNumber();
    }

    public async loadBlockTime() {
        const current = await this.caver.klay.getBlockNumber();
        const block = await this.caver.klay.getBlock(current);
        return this.caver.utils.hexToNumber(block.timestamp);
    }
}

export default new Klaytn();
