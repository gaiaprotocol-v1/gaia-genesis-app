"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const aos_1 = __importDefault(require("aos"));
const BrowserInfo_1 = __importDefault(require("../BrowserInfo"));
const MobileMenu_1 = __importDefault(require("../component/shared/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/shared/menu/PCMenu"));
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
class Layout {
    constructor() {
        Layout.current = this;
        let select;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header.header", (0, skynode_1.el)(".nav", (0, skynode_1.el)(".logo", (0, skynode_1.el)("a", { href: "/" }, (0, skynode_1.el)("img", { src: "/images/shared/img/logo.png", alt: "gaia protocol logo" }))), new PCMenu_1.default(), (0, skynode_1.el)(".right", select = (0, skynode_1.el)("select.language-select", (0, skynode_1.el)("option", "한국어 🇰🇷 ", { value: "ko" }), (0, skynode_1.el)("option", "English 🇺🇸 ", { value: "en" }), {
            change: () => {
                BrowserInfo_1.default.changeLanguage(select.domElement.value);
            },
        }), new UserInfo_1.default(), (0, skynode_1.el)("a.menu-button", (0, skynode_1.el)("i.fas.fa-bars"), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        })))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", (0, skynode_1.el)(".footer-container", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a.opensea", { href: "https://opensea.io/collection/gaia-kronos", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/opensea.svg" })), (0, skynode_1.el)("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/discord.svg" })), (0, skynode_1.el)("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/twitter.svg" })), (0, skynode_1.el)("a.gitbook", { href: "https://docs.gaiakronos.com/kr/", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/gitbook.svg" }))), (0, skynode_1.el)(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"))))));
        select.domElement.value = BrowserInfo_1.default.language;
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