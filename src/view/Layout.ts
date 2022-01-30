import { BodyNode, DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import AOS from 'aos';

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
                            el("span.navicon")
                        ),
                        el("ul.menu",
                            el("li.item", el("a", "Mining", { click: () => { SkyRouter.go("/mining") } })),
                            el("li.item", el("a", "Buyback", { click: () => { SkyRouter.go("/buyback") } })),
                            el("li.item", el("a", "Hourglass", { click: () => { SkyRouter.go("/hourglass") } })),
                            el("li.item", el("a.connect-wallet", "Connect Wallet"))
                        ),
                    )
                ),
                el("main", (this.content = el(".content"))),
                el("footer",
                    el(".footer-container",
                        el(".sns",
                            el("a.discord", { href: "https://discord.com/invite/SjM4meh3hd", target: "_blank" },
                                el("img", { src: "/images/community/discord.svg" })
                            ),
                            el("a.telegram", { href: "https://t.me/gaiaprotocol", target: "_blank" },
                                el("img", { src: "/images/community/telegram.svg" })
                            ),
                            el("a.twitter", { href: "https://twitter.com/gaia_protocol", target: "_blank" },
                                el("img", { src: "/images/community/twitter.svg" })
                            ),
                            el("a.kakaotalk", { href: "https://open.kakao.com/o/ggBYKEUd", target: "_blank" },
                                el("img", { src: "/images/community/kakao-talk.svg" })
                            ),
                            el("a.gitbook", { href: "https://docs.gaiaprotocol.com/kr/", target: "_blank" },
                                el("img", { src: "/images/community/gitbook.svg" })
                            ),
                        ),
                        el(".copyright", "COPYRIGHT ⓒ Gaia Protocol. ALL RIGHTS RESERVED")
                    )
                )
            ))
        );
        this.init()
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
