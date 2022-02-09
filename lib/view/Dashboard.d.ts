import { View, ViewParams } from "skyrouter";
export default class Mining implements View {
    private container;
    private krnoPriceDisplay;
    private apyDisplay;
    private buybackBalanceDisplay;
    private interval;
    constructor();
    private loadKRNOPrice;
    private loadAPY;
    private loadBuybackBalance;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Dashboard.d.ts.map