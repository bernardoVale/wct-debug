import WSIElement from "wsi-element";
import getTemplate from "./content-modal.template";

import "./content-modal.sass";

export default class ContentModal extends WSIElement {
    static DEFAULT_BUTTON_TYPE = "span";
    static DEFAULT_TEXT_SHOW = "show modal";

    static get observedAttributes() {
        return ["button-type", "open", "text-show"];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === "open") {
            if (newValue !== null) {
                this.focus();
                this.setAttribute("aria-disabled", "false");
            } else {
                this.setAttribute("aria-disabled", "true");
            }
        }
    }

    onConnected() {
        this._init();
    }

    onConnecting() {
        this.templateString = this.templateString || getTemplate();
    }

    /**
     * Collapses the content area to the prescribed height
     */
    _hide() {
        requestAnimationFrame(() => {
            this.open = false;
        });
    }

    /**
     * Initilize the start state of the component
     */
    _init() {
        this.buttonType = this.getAttribute("button-type") || ContentModal.DEFAULT_BUTTON_TYPE;
        this.textShow = this.getAttribute("text-show") || ContentModal.DEFAULT_TEXT_SHOW;

        this._toggleLink = this._setupToggleLink();
        this._setupCloseButton();
        this.setAttribute("tabindex", "-1");
    }

    /**
     *
     * @return {Element} toggleLink control to toggle the modal visibility
     */
    _setupToggleLink() {
        let toggleLink = document.createElement(this.buttonType);

        toggleLink.textContent = this.textShow;
        toggleLink.classList.add("modal-button");
        toggleLink.addEventListener("click", e => this._toggle(e));
        this.appendChild(toggleLink);

        return toggleLink;
    }

    /**
     * Expand the content area to the full content height
     */
    _show() {
        requestAnimationFrame(() => {
            this.open = true;
        });
    }

    /**
     * Create modal toggle link
     */
    _setupCloseButton() {
        let closeButton = this.querySelector(".close-button");
        closeButton.addEventListener("click", e => this._toggle(e));
    }

    /**
     * Toggle event
     *
     * Trigger(s): [click]
     */
    _toggle() {
        this.open ? this._hide() : this._show();
    }

    get buttonType() { return this.getAttribute("button-type"); }
    set buttonType(value) { this.setAttribute("button-type", value); }

    get open() { return this.hasAttribute("open"); }
    set open(value) {
        if (value) {
            this.setAttribute("open", "");
        } else {
            this.removeAttribute("open");
        }
    }

    get textShow() { return this.getAttribute("text-show"); }
    set textShow(value) { this.setAttribute("text-show", value); }
}

ContentModal.defineElement("content-modal", ContentModal);
