import { View, ViewParams } from "skyrouter";
export default class Mining implements View {
    private container;
    private krnoPriceDisplay;
    private apyDisplay;
    private genesisInterestBalanceDisplay;
    private interestBalanceDisplay;
    private krnoDisplay;
    private roundBalanceDisplay;
    private interval;
    constructor();
    private init;
    private loadRebaseRound;
    private loadGenesisGaiaKlay;
    private loadGaiaKlay;
    private loadKRNOPrice;
    private loadAPY;
    private loadBuybackBalance;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Dashboard.d.ts.map