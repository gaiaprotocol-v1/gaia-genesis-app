import { DomNode } from "@hanul/skynode";
import { BigNumber } from "ethers";
export default class NewTransferItem extends DomNode {
    private imageDisplay;
    private nameDisplay;
    private krnoDisplay;
    private klayDisplay;
    private emergencyDisplay;
    private id;
    private krno;
    private klay;
    constructor();
    init(id: number, reward: BigNumber, collected: BigNumber): void;
    private loadKRNO;
    private loadKlay;
    delete(): void;
}
//# sourceMappingURL=NewTransferItem.d.ts.map