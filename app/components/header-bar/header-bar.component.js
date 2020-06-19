import "./header-bar.style.css";

class HeaderBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {}
    attributeChangedCallback() {}
    adoptedCallback() {}

    set widget(widget){
        this._widget = widget;
        this.render();
    }

    render() {
        this.innerHTML = `<div class="header-bar">
        <div class="container pl-background">
            <div class="row">
            ${(this._widget == undefined) ? `` : this._widget}
            </div>
        </div>
        </div>`;
    }

}

customElements.define("header-bar", HeaderBar);