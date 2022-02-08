import { View, ViewParams } from "skyrouter";
export default class Hourglass implements View {
    private container;
    private amountInput;
    private priceInput;
    private rewardInput;
    private futureInput;
    private slider;
    private interval;
    constructor();
    getInitialInvestment(): number;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Hourglass.d.ts.map