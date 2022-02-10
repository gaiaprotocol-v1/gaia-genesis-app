import { BodyNode, DomNode, el } from "@hanul/skynode";
import AOS from "aos";
import msg from "msg.js";
import { View, ViewParams } from "skyrouter";
import BrowserInfo from "../BrowserInfo";
import UserInfo from "../component/UserInfo";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        let select: DomNode<HTMLSelectElement>;

        BodyNode.append(
            (this.container = el(".layout",
                el("header.header",
                    el(".nav",
                        el(".logo",
                            el("a", { href: "/" }, el("img", { src: "/images/shared/img/logo.png", alt: "gaia protocol logo" })),
                        ),
                        el("input.menu-btn", { type: "checkbox", id: "menu-btn" }),
                        el("label.menu-icon", { for: "menu-btn" },
                            el("span.navicon"),
                        ),
                        el("ul.menu",
                            el("li.item", el("a", msg("DASHBOARD_MENU"), { click: () => { ViewUtil.go("/") } })),
                            el("li.item", el("a", msg("MINING_MENU"), { click: () => { ViewUtil.go("/mining") } })),
                            el("li.item", el("a", msg("BUYBACK_MENU"), { click: () => { ViewUtil.go("/buyback") } })),
                            el("li.item", el("a", msg("HOURGLASS_MENU"), { click: () => { ViewUtil.go("/hourglass") } })),
                            el("li.item",
                                select = el("select.language-select",
                                    el("option", "한국어 🇰🇷 ", { value: "ko" }),
                                    el("option", "English 🇺🇸 ", { value: "en" }),
                                    {
                                        change: () => {
                                            BrowserInfo.changeLanguage(select.domElement.value);
                                        },
                                    },
                                ),
                            ),
                            el("li.item", new UserInfo()),
                        ),
                    ),
                ),
                el("main", (this.content = el(".content"))),
                el("footer",
                    el(".footer-container",
                        el(".sns",
                            el("a.opensea", { href: "https://opensea.io/collection/gaia-kronos", target: "_blank" },
                                el("img", { src: "/images/shared/icn/opensea.svg" }),
                            ),
                            el("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" },
                                el("img", { src: "/images/shared/icn/discord.svg" }),
                            ),
                            el("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" },
                                el("img", { src: "/images/shared/icn/twitter.svg" }),
                            ),
                            el("a.gitbook", { href: "https://docs.gaiaprotocol.com/kr/", target: "_blank" },
                                el("img", { src: "/images/shared/icn/gitbook.svg" }),
                            ),
                        ),
                        el(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"),
                    ),
                ),
            )
            ),
        );
        select.domElement.value = BrowserInfo.language;
        this.init();
    }

    public set title(title: string) {
        document.title = `${title} | Gaia Protocol `;
    }

    private async init() {
        AOS.init();
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
