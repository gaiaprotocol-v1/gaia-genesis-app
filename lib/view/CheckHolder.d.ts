import { View, ViewParams } from "skyrouter";
import DiscordUserInfo from "../DiscordUserInfo";
export default class CheckHolder implements View {
    private container;
    discordUser: DiscordUserInfo | undefined;
    constructor();
    private checkDiscordLogin;
    private checkWalletConnected;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=CheckHolder.d.ts.map