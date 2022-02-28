"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const superagent_1 = __importDefault(require("superagent"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const Store_1 = __importDefault(require("../Store"));
const Layout_1 = __importDefault(require("./Layout"));
class CheckHolder {
    constructor() {
        this.codeStore = new Store_1.default("codeStore");
        Layout_1.default.current.title = (0, msg_js_1.default)("HOLDER_CHECK_TITLE");
        Layout_1.default.current.content.append(this.container = (0, skynode_1.el)("section.check-holder", (0, skynode_1.el)("header", (0, skynode_1.el)("h1", (0, msg_js_1.default)("HOLDER_CHECK_TITLE")), (0, skynode_1.el)("h2", (0, msg_js_1.default)("HOLDER_CHECK_DESC"))), (0, skynode_1.el)("article", (0, skynode_1.el)("img", { src: "/images/shared/img/earth.png", alt: "earth" }), (0, skynode_1.el)("a.discord-login-button", (0, msg_js_1.default)("HOLDER_CHECK_BUTTON"), {
            href: "https://discord.com/api/oauth2/authorize?client_id=939800869740871693&redirect_uri=https%3A%2F%2Fapp.gaiakronos.com%2Fcheckholder&response_type=code&scope=identify",
        }))));
        this.checkDiscordLogin();
    }
    async checkDiscordLogin() {
        let code = this.codeStore.get("code");
        if (code === undefined) {
            code = new URLSearchParams(window.location.search).get("code");
            if (code !== null) {
                try {
                    await superagent_1.default.get("https://api.gaiaprotocol.com/discord/token").query({
                        code,
                        redirect_uri: `${window.location.protocol}//${window.location.host}/checkholder`,
                    });
                    this.codeStore.set("code", code, true);
                }
                catch (error) {
                    console.error(error);
                    code = undefined;
                }
            }
            else {
                code = undefined;
            }
        }
        if (code === undefined) {
            this.codeStore.delete("code");
        }
        else {
            try {
                const result = await superagent_1.default.get("https://api.gaiaprotocol.com/discord/me").query({ code });
                this.discordUser = result.body;
                this.checkWalletConnected(code);
            }
            catch (error) {
                console.error(error);
                this.codeStore.delete("code");
            }
        }
    }
    async checkWalletConnected(code) {
        if (await Wallet_1.default.connected() !== true) {
            await Wallet_1.default.connect();
        }
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const message = "Check Holder";
            const signResult = await Wallet_1.default.signMessage(message);
            try {
                const result = await fetch("https://api.gaiaprotocol.com/checkholder/kronos", {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage: signResult.signedMessage,
                        klipAddress: signResult.klipAddress,
                        address,
                    }),
                });
                if ((await result.json()).isHolder === true) {
                    alert((0, msg_js_1.default)("HOLDER_CHECK_SUCCESS_DESC"));
                }
                else {
                    alert((0, msg_js_1.default)("HOLDER_CHECK_FAIL_DESC"));
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = CheckHolder;
//# sourceMappingURL=CheckHolder.js.map