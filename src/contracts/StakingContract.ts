import Contract from "./Contract";

class StakingContract extends Contract {

    constructor() {
        super("0x39281362641Da798De3801B23BFBA19155B57f13", [{
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
        }]);
    }

    public async epoch(): Promise<any> {
        return await this.runMethod("epoch");
    }
}

export default new StakingContract();
