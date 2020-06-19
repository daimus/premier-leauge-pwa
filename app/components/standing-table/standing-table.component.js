import './standing-table.style.css'
import preloader from '../preloader-small/preloader-small.html';

import { getTeam } from '../../utils/api';
import { add, get, destroy } from '../../utils/idxdb';

class StandingTable extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
    }

    disconnectedCallback() { }
    attributeChangedCallback() { }
    adoptedCallback() { }

    set items(items) {
        this._items = items;
        this.render();
    }

    render() {
        let self = this;
        let tbody = ``;
        this._items.forEach(element => {
            tbody += `<tr class="spacer">
                <td colspan="10"></td>
            </tr>
            <tr class="highlighted">
                <td>${element.position}</td>
                <td><a href="/#/team/${element.team.id}"><img src="${element.team.crestUrl}" alt="${element.team.name}" class="team-crest" />${element.team.name}</a> <button class="btn-flat tooltipped" data-position="bottom" data-tooltip="Follow ${element.team.name}" data-teamid="${element.team.id}"></button> </td>
                <td>${element.playedGames}</td>
                <td>${element.won}</td>
                <td>${element.draw}</td>
                <td>${element.lost}</td>
                <td>${element.goalsFor}</td>
                <td>${element.goalsAgainst}</td>
                <td>${element.goalDifference}</td>
                <td>${element.points}</td>
            </tr>`;
        });
        this.innerHTML = `<div style="overflow-x:auto">
        <table class="classement-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Club</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>PTS</th>
                </tr>
            </thead>
            <tbody>
                ${tbody}
            </tbody>
        </table>
        </div>`;

        const tooltippedElement = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltippedElement);

        for (let i = 0; i < tooltippedElement.length; i++) {
            const teamId = parseInt(tooltippedElement[i].getAttribute("data-teamid"));
            get(teamId).then(team => {
                if (team !== undefined){
                    tooltippedElement[i].innerHTML = '<i class="material-icons color-success">playlist_add_check</i>';
                    tooltippedElement[i].setAttribute('data-tooltip', `Unfollow ${team.name}`);
                    tooltippedElement[i].addEventListener("click", () => {
                        tooltippedElement[i].innerHTML = preloader;
                        destroy(teamId).then(response => {
                            M.toast({html: `You're not following ${team.name} anymore`});
                            self.render();
                        }).catch((error) => {
                            M.toast({html: `Error happen when unfollow team 🙁`});
                            tooltippedElement[i].innerHTML = '<i class="material-icons color-success">playlist_add_check</i>';
                        });
                    });
                } else {
                    tooltippedElement[i].innerHTML = '<i class="material-icons color-primary">playlist_add</i>';
                    tooltippedElement[i].addEventListener("click", () => {
                        tooltippedElement[i].innerHTML = preloader;
                        getTeam(teamId).then(data => {
                            add(data).then(response => {
                                M.toast({html: `You're following ${data.name} 😎`});
                                self.render();
                            });
                        }).catch((error) => {
                            M.toast({html: `Please connect the internet to follow team 😉`});
                            tooltippedElement[i].innerHTML = '<i class="material-icons color-primary">playlist_add</i>';
                        });
                    });
                }
            });
        }
    }

}

customElements.define("standing-table", StandingTable);