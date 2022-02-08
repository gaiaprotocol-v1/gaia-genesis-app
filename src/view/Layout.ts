import { BodyNode, DomNode, el } from "@hanul/skynode";
import AOS from "aos";
import { View, ViewParams } from "skyrouter";
import UserInfo from "../component/UserInfo";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;
    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;

        BodyNode.append(
            (this.container = el(".layout",
                el("header.header",
                    el(".nav",
                        el(".logo",
                            el("a", { href: "/" }, el("img", { src: "/images/logo.png", alt: "gaia protocol logo" })),
                        ),
                        el("input.menu-btn", { type: "checkbox", id: "menu-btn" }),
                        el("label.menu-icon", { for: "menu-btn" },
                            el("span.navicon"),
                        ),
                        el("ul.menu",
                            el("li.item", el("a", "Dashboard", { click: () => { ViewUtil.go("/") } })),
                            el("li.item", el("a", "Mining", { click: () => { ViewUtil.go("/mining") } })),
                            el("li.item", el("a", "Buyback", { click: () => { ViewUtil.go("/buyback") } })),
                            el("li.item", el("a", "Hourglass", { click: () => { ViewUtil.go("/hourglass") } })),
                            el("li.item.user-info", new UserInfo()),
                        ),
                    ),
                ),
                el("main", (this.content = el(".content"))),
                el("footer",
                    el(".footer-container",
                        el(".sns",
                            el("a.opensea", { href: "https://opensea.io", target: "_blank" },
                                el("img", { src: "/images/community/opensea.svg" }),
                            ),
                            el("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" },
                                el("img", { src: "/images/community/discord.svg" }),
                            ),
                            el("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" },
                                el("img", { src: "/images/community/twitter.svg" }),
                            ),
                            el("a.gitbook", { href: "https://docs.gaiaprotocol.com/kr/", target: "_blank" },
                                el("img", { src: "/images/community/gitbook.svg" }),
                            ),
                        ),
                        el(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED"),
                    ),
                ),
            )),
        );
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
