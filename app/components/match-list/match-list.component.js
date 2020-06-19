import "../match-item/match-item.component";

class MatchList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
    }

    disconnectedCallback() {}
    attributeChangedCallback() {}
    adoptedCallback() {}

    set items (items){
        this._items = items;
        this.render();
    }

    render() {
        this._items.forEach(element => {
            const matchItemComponent = document.createElement("match-item");
            matchItemComponent.item = element;
            this.appendChild(matchItemComponent);
        });
    }

}

customElements.define("match-list", MatchList);