import Contract from "./Contract";

class lpContract extends Contract {

    constructor() {
        super("0xdf5caf79899407da1c1b31389448861a9846956d", [{
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
        }]);
    }

    public async getCurrentPool(): Promise<any> {
        return await this.runMethod("getCurrentPool");
    }
}

export default new lpContract();
