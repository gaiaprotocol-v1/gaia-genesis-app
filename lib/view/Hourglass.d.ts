import { View, ViewParams } from "skyrouter";
export default class Hourglass implements View {
    private container;
    private krnoPriceDisplay;
    private rewardDisplay;
    private totalSKRNODisplay;
    private amountInput;
    private priceInput;
    private rewardInput;
    private futureInput;
    private slider;
    private interval;
    constructor();
    private init;
    private loadKRNOPrice;
    private loadReward;
    private setSwiper;
    private getInitialInvestment;
    private calReward;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Hourglass.d.ts.map