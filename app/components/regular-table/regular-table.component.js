class RegularTable extends HTMLElement {
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
        let thead = ``;
        this._items.thead.forEach(element => {
            thead += `<th>${element}</th>`;
        });
        let tbody = ``;
        this._items.tbody.forEach(element => {
            tbody += `<tr>`;
            element.forEach(elem => {
                tbody += `<td>${elem}</td>`;
            });
            tbody += `</tr>`;
        });


        this.innerHTML = `<div style="overflow-x:auto">
            <table>
                <thead><tr>${thead}</tr></thead>
                <tbody>${tbody}</tbody>
            </table>
        </div>`;
    }

}

customElements.define("regular-table", RegularTable);