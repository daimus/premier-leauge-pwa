import html from "./preloader-small.html";

class PreloaderSmall extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {}
    attributeChangedCallback() {}
    adoptedCallback() {}

    render() {
        this.innerHTML = html;
    }

    destroy(){
        this.remove();
    }

}

customElements.define("preloader-small", PreloaderSmall);