import "./team-collection.style.css";
import { getAll, destroy } from '../../utils/idxdb';
import { navigate } from '../../app';

class TeamCollection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        getAll().then(data => {
            this._items = data;
            this.render();
        });
    }

    disconnectedCallback() {}
    attributeChangedCallback() {}
    adoptedCallback() {}

    set items(items){
        this._items = items;
        this.render();
    }

    set searchQuery(query){
        getAll().then(data => {
            this._items = [];
            data.forEach(element => {
                if (element.name.toLowerCase().indexOf(query.toLowerCase()) !== -1){
                    this._items.push(element);
                }
            });
            this.render();
        });
    }

    render() {
        let self = this;
        let teams = '';
        if (this._items.length > 0){
            this._items.forEach(element => {
                teams += `<ul class="collection team-collection">
                <li class="collection-item avatar">
                    <div class="team-content" data-teamid="${element.id}">
                        <img src="${element.crestUrl}" alt="${element.name}" class="circle">
                        <span class="title">${element.name} - ${element.tla}</span>
                        <p>${element.activeCompetitions.length} Active Competition</p>
                    </div>
                    <button type="button" class="btn-flat secondary-content destroy color-danger" data-teamid="${element.id}" data-position="bottom" data-tooltip="Unfollow ${element.name}"><i class="material-icons">delete_forever</i></button>
                </li>
                </ul>`;
            });
        } else {
            teams = `<div class="col s12 m12 l12 xl12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Oops!</span>
                <p>Followed team not found 😥</p>
              </div>
              <div class="card-action">
                <a href="./#/standings">Go to Standings Page</a>
              </div>
            </div>
          </div>`;
        }

        this.innerHTML = teams;

        const destroyElement = document.querySelectorAll('.destroy');
        M.Tooltip.init(destroyElement);
        for(let i = 0; i < destroyElement.length; i++){
            destroyElement[i].addEventListener("click", event => {
                event.preventDefault();
                console.log('clicked');
                const teamId = parseInt(destroyElement[i].getAttribute("data-teamid"));
                destroy(teamId).then(response => {
                    getAll().then(data => {
                        self._items = data;
                        self.render();
                    });
                }).catch((error) => {
                    M.toast({html: `Error happen when unfollow team 😢`});
                });
            });
        }

        const teamContentElement = document.querySelectorAll('.team-content');
        for(let i = 0; i < teamContentElement.length; i++){
            teamContentElement[i].addEventListener("click", event => {
                event.preventDefault();
                const teamId = parseInt(teamContentElement[i].getAttribute("data-teamid"));
                navigate(`team/${teamId}`);
            });
        }
    }

}

customElements.define("team-collection", TeamCollection);
