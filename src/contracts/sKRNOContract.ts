import Contract from "./Contract";

class sKRNOContract extends Contract {

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

    public async circulatingSupply(): Promise<any> {
        return await this.runMethod("circulatingSupply");
    }
}

export default new sKRNOContract();
