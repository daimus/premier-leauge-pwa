import "./match-item.style.css";

class MatchItem extends HTMLElement {
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
        this.innerHTML = `<div class="col m6 s12">
        <div class="card match-card">
            <div class="card-content">
                <div class="row mb0">
                    <div class="col m12 s12 match-info">
                        <span>${new Date(this._item.utcDate).toDateString()} ${new Date(this._item.utcDate).toLocaleTimeString()}</span>
                    </div>
                    <div class="col m5 s5 right-align">
                        <div class="team-logo">
                            <div class="score">${this._item.score.fullTime.homeTeam !== null ? this._item.score.fullTime.homeTeam : '-'}</div>
                            <div class="team-name text-black">${this._item.homeTeam.name}</div>
                        </div>
                    </div>
                    <div class="col m2 s2 center-align">
                        <div class="versase">vs</div>
                    </div>
                    <div class="col m5 s5 left-align">
                        <div class="team-logo">
                            <div class="score">${this._item.score.fullTime.awayTeam !== null ? this._item.score.fullTime.awayTeam : '-'}</div>
                            <div class="team-name text-black">${this._item.awayTeam.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;
    }
}

customElements.define("match-item", MatchItem);