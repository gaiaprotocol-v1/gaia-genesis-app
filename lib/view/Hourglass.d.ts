import { View, ViewParams } from "skyrouter";
export default class Hourglass implements View {
    private container;
    private krnoPriceDisplay;
    private rewardDisplay;
    private totalSKRNODisplay;
    private kronRewardDisplay;
    private currentWealthDisplay;
    private futureWealthDisplay;
    private macbookRewardDisplay;
    private teslaRewardDisplay;
    private birkinBagRewardDisplay;
    private eternoRewardDisplay;
    private daysDisplay;
    private initPriceInput;
    private currentPriceInput;
    private rewardInput;
    private futureInput;
    private slider;
    private interval;
    private totalSKRNO;
    constructor();
    private init;
    private loadKRNOPrice;
    private loadReward;
    private setCurrentKRNOPriceOnFuture;
    private loadTotalSKRNO;
    private setSwiper;
    private setWealth;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Hourglass.d.ts.map