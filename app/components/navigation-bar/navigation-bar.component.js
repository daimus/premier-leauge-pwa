import { navigate } from "../../app";
import "./navigation-bar.style.css";

class NavigationBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.registerRouter();
    }

    disconnectedCallback() {}
    attributeChangedCallback() {}
    adoptedCallback() {}

    render() {
        this.innerHTML = `<nav class="nav-extended ">
        <div class="container">
            <div class="nav-content nav-center">
                <ul class="tabs tabs-transparent">
                    <li class="tab">
                        <a href="./#/matches" class="tab-item" id="navMatches">
                            <i class="material-icons">perm_contact_calendar</i>
                            <span class="hide-on-small-only">MATCH</span>
                        </a>
                    </li>
                    <li class="tab">
                        <a href="./#/standings" class="tab-item" id="navStandings">
                            <i class="material-icons">insert_chart</i>
                            <span class="hide-on-small-only">STANDING</span>
                        </a>
                    </li>
                    <li class="tab">
                        <a href="./#/followed" class="tab-item" id="navFollowed">
                            <i class="material-icons">playlist_play</i>
                            <span class="hide-on-small-only">FOLLOWED TEAMS</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </nav>`;
    }

    registerRouter() {
        document.getElementById("navMatches").addEventListener("click", (event) => {
            event.preventDefault();
            navigate("matches");
        });
        document.getElementById("navStandings").addEventListener("click", (event) => {
            event.preventDefault();
            navigate("standings");
        });
        document.getElementById("navFollowed").addEventListener("click", (event) => {
            event.preventDefault();
            navigate("followed");
        });
    }

}

customElements.define("navigation-bar", NavigationBar);