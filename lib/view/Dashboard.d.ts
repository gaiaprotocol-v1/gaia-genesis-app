import { View, ViewParams } from "skyrouter";
export default class Mining implements View {
    private container;
    private krnoPriceDisplay;
    private apyDisplay;
    private interestBalanceDisplay;
    private interestKRNODisplay;
    private interestEmergencyDisplay;
    private genesisInterestBalanceDisplay;
    private genesisKRNODisplay;
    private genesisEmergencyDisplay;
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