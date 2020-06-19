import '../../components/header-bar/header-bar.component';
import '../../components/team-collection/team-collection.component';
import '../../components/search-bar/search-bar.component';

import html from "./followed.html";

export const open = () => {
	const main = document.querySelector("main");
	main.innerHTML = html;

	const headerBarComponent = document.querySelector('header-bar');
	const teamCollectionComponent = document.querySelector('team-collection');
	const searchBarComponent = document.createElement('search-bar');

	headerBarComponent.widget = searchBarComponent.outerHTML;

	const onSearchEvent = () => {
		teamCollectionComponent.searchQuery = searchBarComponent.searchQuery;
	}

	searchBarComponent.searchEvent = onSearchEvent;

	return Promise.resolve();
}

export const close = () => {
	return Promise.resolve();
}