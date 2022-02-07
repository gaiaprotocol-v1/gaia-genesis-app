"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const aos_1 = __importDefault(require("aos"));
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header.header", (0, skynode_1.el)(".nav", (0, skynode_1.el)(".logo", (0, skynode_1.el)("a", { href: "/" }, (0, skynode_1.el)("img", { src: "/images/logo.png", alt: "gaia protocol logo" }))), (0, skynode_1.el)("input.menu-btn", { type: "checkbox", id: "menu-btn" }), (0, skynode_1.el)("label.menu-icon", { for: "menu-btn" }, (0, skynode_1.el)("span.navicon")), (0, skynode_1.el)("ul.menu", (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Mining", { click: () => { skyrouter_1.SkyRouter.go("/mining"); } })), (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Buyback", { click: () => { skyrouter_1.SkyRouter.go("/buyback"); } })), (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Hourglass", { click: () => { skyrouter_1.SkyRouter.go("/hourglass"); } })), (0, skynode_1.el)("li.item", new UserInfo_1.default())))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", (0, skynode_1.el)(".footer-container", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/community/discord.svg" })), (0, skynode_1.el)("a.telegram", { href: "https://t.me/gaiaprotocol", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/community/telegram.svg" })), (0, skynode_1.el)("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/community/twitter.svg" })), (0, skynode_1.el)("a.kakaotalk", { href: "https://open.kakao.com/o/ggBYKEUd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/community/kakao-talk.svg" })), (0, skynode_1.el)("a.gitbook", { href: "https://docs.gaiaprotocol.com/kr/", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/community/gitbook.svg" }))), (0, skynode_1.el)(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"))))));
        this.init();
    }
    set title(title) {
        document.title = `${title} | Gaia Protocol `;
    }
    async init() {
        aos_1.default.init();
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map