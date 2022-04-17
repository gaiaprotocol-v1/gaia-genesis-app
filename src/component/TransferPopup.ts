import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";

export default class TransferPopup extends Popup {

    public content: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor(
        confirm: (value: string) => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.transfer-popup",
                el("h2", msg("SEND_PROMPT_TITLE")),
                el("p", msg("SEND_PROMPT_DESC")),
                el(".warning-container",
                    el("img", { src: "/images/shared/icn/warning.svg", alt: "warning" }),
                    el("p.warning", msg("SEND_PROMPT_WARNING_DESC")),
                ),
                el(".input-container",
                    this.input = el("input", { placeholder: msg("SEND_PROMPT_INPUT"), min: "40" }),
                ),
                el(".button-container",
                    el("button", msg("CANCEL_BUTTON"), {
                        click: () => this.delete(),
                    }),
                    el("button", msg("SEND_PROMPT_BUTTON"), {
                        click: () => {
                            confirm(this.input.domElement.value);
                            this.delete();
                        },
                    }),
                ),
            ),
        );
    }
}
