import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import superagent from "superagent";
import DiscordUserInfo from "../DiscordUserInfo";
import Wallet from "../klaytn/Wallet";
import Store from "../Store";
import Layout from "./Layout";

export default class CheckHolder implements View {

    private container: DomNode;

    public discordUser: DiscordUserInfo | undefined;
    private codeStore = new Store("codeStore");

    constructor() {
        Layout.current.title = msg("HOLDER_CHECK_TITLE");
        Layout.current.content.append(this.container = el("section.check-holder",
            el("header",
                el("h1", msg("HOLDER_CHECK_TITLE")),
                el("h2", msg("HOLDER_CHECK_DESC"))
            ),
            el("article",
                el("img", { src: "/images/shared/img/earth.png", alt: "earth" }),
                el("a.discord-login-button", msg("HOLDER_CHECK_BUTTON"), {
                    href: "https://discord.com/api/oauth2/authorize?client_id=939800869740871693&redirect_uri=https%3A%2F%2Fapp.gaiaprotocol.com%2Fcheckholder&response_type=code&scope=identify",
                }),
            ),
        ));
        this.checkDiscordLogin();
    }

    private async checkDiscordLogin() {

        let code = this.codeStore.get<string>("code");
        if (code === undefined) {
            code = new URLSearchParams(window.location.search).get("code")!;
            if (code !== null) {
                try {
                    await superagent.get("https://api.gaiaprotocol.com/discord/token").query({
                        code,
                        redirect_uri: `${window.location.protocol}//${window.location.host}/checkholder`,
                    });
                    this.codeStore.set("code", code, true);
                } catch (error) {
                    console.error(error);
                    code = undefined;
                }
            } else {
                code = undefined;
            }
        }

        if (code === undefined) {
            this.codeStore.delete("code");
        } else {
            try {
                const result = await superagent.get("https://api.gaiaprotocol.com/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            } catch (error) {
                console.error(error);
                this.codeStore.delete("code");
            }
        }
    }

    private async checkWalletConnected(code: string) {
        if (await Wallet.connected() !== true) {
            await Wallet.connect();
        }
        const address = await Wallet.loadAddress();
        if (address !== undefined) {

            const message = "Check Holder";
            const signResult = await Wallet.signMessage(message);

            try {
                const result = await fetch("https://api.gaiaprotocol.com/checkholder/kronos", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage: signResult.signedMessage,
                        klipSignKey: signResult.klipSignKey,
                        address,
                    }),
                });
                if ((await result.json()).isHolder === true) {
                    alert(msg("HOLDER_CHECK_SUCCESS_DESC"));
                } else {
                    alert(msg("HOLDER_CHECK_FAIL_DESC"));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
