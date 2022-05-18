"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const aos_1 = __importDefault(require("aos"));
const Sentry = __importStar(require("@sentry/browser"));
const tracing_1 = require("@sentry/tracing");
const BrowserInfo_1 = __importDefault(require("../BrowserInfo"));
const MobileMenu_1 = __importDefault(require("../component/shared/menu/MobileMenu"));
const PCMenu_1 = __importDefault(require("../component/shared/menu/PCMenu"));
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
class Layout {
    constructor() {
        Layout.current = this;
        let select;
        skynode_1.BodyNode.append((this.container = (0, skynode_1.el)(".layout", (0, skynode_1.el)("header.header", (0, skynode_1.el)(".nav", (0, skynode_1.el)(".logo", (0, skynode_1.el)("a", { href: "/" }, (0, skynode_1.el)("img", { src: "/images/shared/img/logo.png", alt: "gaia genesis logo" }))), new PCMenu_1.default(), (0, skynode_1.el)(".right", select = (0, skynode_1.el)("select.language-select", (0, skynode_1.el)("option", "한국어 🇰🇷 ", { value: "ko" }), (0, skynode_1.el)("option", "English 🇺🇸 ", { value: "en" }), {
            change: () => {
                BrowserInfo_1.default.changeLanguage(select.domElement.value);
            },
        }), new UserInfo_1.default(), (0, skynode_1.el)("a.menu-button", (0, skynode_1.el)("i.fas.fa-bars"), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.right - 170, top: rect.bottom }).appendTo(skynode_1.BodyNode);
            },
        })))), (0, skynode_1.el)("main", (this.content = (0, skynode_1.el)(".content"))), (0, skynode_1.el)("footer", (0, skynode_1.el)(".footer-container", (0, skynode_1.el)(".sns", (0, skynode_1.el)("a.opensea", { href: "https://opensea.io/collection/gaia-genesis", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/opensea.svg" })), (0, skynode_1.el)("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/discord.svg" })), (0, skynode_1.el)("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/twitter.svg" })), (0, skynode_1.el)("a.gitbook", { href: "https://gaiaprotocol.notion.site/Gaia-Kronos-Docs-3268938f02a34b3eb9e86179bdc8b767", target: "_blank" }, (0, skynode_1.el)("img", { src: "/images/shared/icn/gitbook.svg" }))), (0, skynode_1.el)(".link-tree", (0, skynode_1.el)("a.kronos", "Gaia Kronos", { href: "https://app.gaiakronos.com/", target: "_blank" }), (0, skynode_1.el)(".hr"), (0, skynode_1.el)("a.supernova", "Gaia Supernova", { href: "https://app.gaiasupernova.com/", target: "_blank" }), (0, skynode_1.el)(".hr"), (0, skynode_1.el)("a.stableDAO", "Gaia Stable DAO", { href: "https://gaiastabledao.com/", target: "_blank" })), (0, skynode_1.el)(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"))))));
        select.domElement.value = BrowserInfo_1.default.language;
        this.init();
    }
    set title(title) {
        document.title = `${title} | Gaia Genesis `;
    }
    async init() {
        aos_1.default.init();
        Sentry.init({
            dsn: "https://37374b4d9f9042b9bfb21700d0dba387@o1156298.ingest.sentry.io/6237477",
            integrations: [new tracing_1.BrowserTracing()],
            tracesSampleRate: 1.0,
        });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map