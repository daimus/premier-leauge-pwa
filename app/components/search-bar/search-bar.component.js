import "./search-bar.style.css";

class SearchBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {}
    attributeChangedCallback() {}
    adoptedCallback() {}

    set searchEvent(event){
        document.querySelector('#searchButton').addEventListener('click', event);
    }

    get searchQuery(){
        return document.querySelector('#searchInput').value;
    }

    render() {
        this.innerHTML = `<form action="" class="search-form">
        <div class="col s8 m4">
            <input placeholder="Search clubs..." type="text" class="validate" id="searchInput">
        </div>
        <div class="col s4 m2">
            <button type="button" class="btn-flat" id="searchButton"><i class="material-icons">search</i></button>
        </div>
        </form>`;
    }

}

customElements.define("search-bar", SearchBar);