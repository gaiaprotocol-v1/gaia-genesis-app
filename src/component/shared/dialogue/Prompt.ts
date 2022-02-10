import { DomNode, el, Popup } from "@hanul/skynode";
import msg from "msg.js";

export default class Prompt extends Popup {

    public content: DomNode;
    private input: DomNode<HTMLInputElement>;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm: (value: string) => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(".dialogue.prompt",
                el("h2", title),
                el("p", message),
                el(".input-container",
                    this.input = el("input"),
                ),
                el(".button-container",
                    el("button", msg("CANCEL_BUTTON"), {
                        click: () => this.delete(),
                    }),
                    el("button", confirmTitle, {
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
