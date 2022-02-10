"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const aos_1 = __importDefault(require("aos"));
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header.header", (0, skynode_1.el)(".nav", (0, skynode_1.el)(".logo", (0, skynode_1.el)("a", { href: "/" }, (0, skynode_1.el)("img", { src: "/images/shared/img/logo.png", alt: "gaia protocol logo" }))), (0, skynode_1.el)("input.menu-btn", { type: "checkbox", id: "menu-btn" }), (0, skynode_1.el)("label.menu-icon", { for: "menu-btn" }, (0, skynode_1.el)("span.navicon")), (0, skynode_1.el)("ul.menu", (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Dashboard", { href: "/" })), (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Mining", { href: "/mining" })), (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Buyback", { href: "/buyback" })), (0, skynode_1.el)("li.item", (0, skynode_1.el)("a", "Hourglass", { href: "/hourglass" })), (0, skynode_1.el)("li.item.user-info", new UserInfo_1.default())))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", (0, skynode_1.el)(".footer-container", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a.opensea", { href: "https://opensea.io/collection/gaia-kronos", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/opensea.svg" })), (0, skynode_1.el)("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/discord.svg" })), (0, skynode_1.el)("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/twitter.svg" })), (0, skynode_1.el)("a.gitbook", { href: "https://docs.gaiaprotocol.com/kr/", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/gitbook.svg" }))), (0, skynode_1.el)(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"))))));
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