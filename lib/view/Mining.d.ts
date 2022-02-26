import { View, ViewParams } from "skyrouter";
export default class Mining implements View {
    private container;
    private idInput;
    private totalKRNODisplay;
    private totalKlayDisplay;
    private rebaseDisplay;
    private nftList;
    private interval;
    private tokenIds;
    private krnos;
    private totalKlay;
    constructor();
    private resizeDebouncer;
    private loadNFTs;
    private loadRebase;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Mining.d.ts.map