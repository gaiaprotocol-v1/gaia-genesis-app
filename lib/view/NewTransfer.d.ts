import { View, ViewParams } from "skyrouter";
export default class NewTransfer implements View {
    private container;
    private idInput;
    private totalKRNODisplay;
    private totalKlayDisplay;
    private totalEmergencyDisplay;
    private rebaseDisplay;
    private nftList;
    private interval;
    private tokenIds;
    private krnos;
    private totalKlay;
    constructor();
    private loadNFTsDebouncer;
    private loadNFTs;
    private loadRebase;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=NewTransfer.d.ts.map