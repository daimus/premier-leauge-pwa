import '../../components/header-bar/header-bar.component';
import '../../components/standing-table/standing-table.component';
import '../../components/preloader-small/preloader-small.component';
import html from './standings.html';
import './standings.css';

import { fetchStandings } from '../../utils/api';

export const open = () => {
	const main = document.querySelector('main');
	main.innerHTML = html;

	const standingTable = document.querySelector('standing-table');
	const preloaderSmallComponent = document.querySelector('preloader-small');

	fetchStandings().then(data => {
		preloaderSmallComponent.destroy();
		standingTable.items = data.standings[0].table;
	}).catch(error => {
		preloaderSmallComponent.destroy();
		M.toast({html: `Having trouble with intenet connection or API request limit reached 😢`});
	});
	
	return Promise.resolve();
}

export const close = () => {
	return Promise.resolve();
}