import './team-info.style.css';

class TeamInfo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() { }
    attributeChangedCallback() { }
    adoptedCallback() { }

    set item(item) {
        this._item = item;
        this.render();
    }

    render() {
        this.innerHTML = `<div class="col s12 m4 l2 xl2">
            <img src="${this._item.crestUrl}" alt="${this._item.name}" class="team-crestImage" />
        </div>
        <div class="col s12 m8 l10 xl10 team-detail">
            <h1 class="team-name">${this._item.name} / <span>${this._item.tla}</span> - <small>Since: ${this._item.founded}</small></h1>
            <table>
                <tr>
                    <td><i class="material-icons">place</i></td>
                    <td>${this._item.venue} - ${this._item.address}</td>
                </tr>
                <tr>
                    <td><i class="material-icons">language</i></td>
                    <td><a href="${this._item.website}" target="_blank">${this._item.website}</a></td>
                </tr>
                <tr>
                    <td><i class="material-icons">palette</i></td>
                    <td>${this._item.clubColors}</td>
                </tr>
            </table>
        </div>`;
    }

}

customElements.define("team-info", TeamInfo);