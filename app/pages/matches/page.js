import '../../components/header-bar/header-bar.component';
import '../../components/preloader-small/preloader-small.component';
import '../../components/match-list/match-list.component';
import html from './matches.html';

import { fetchCompetitionMatch, getCompetition } from '../../utils/api';

export const open = () => {
	const main = document.querySelector('main');
	main.innerHTML = html;

	const headerBarComponent = document.querySelector('header-bar');
	const matchListComponent = document.querySelector('match-list');
	const preloaderSmallComponent = document.querySelector('preloader-small');

	headerBarComponent.widget = `<div class="col s12 m12 l12 xl12 color-white">
		<h1>Premier Leauge</h1>
	</div>`;

	getCompetition().then(response => {
		headerBarComponent.widget = `<div class="col s12 m12 l12 xl12 color-white">
			<h1>Premier Leauge</h1>
			<span>Season ${new Date(response.currentSeason.startDate).getFullYear()} / ${new Date(response.currentSeason.endDate).getFullYear()} is ${(new Date(response.currentSeason.endDate) > new Date()) ? 'ongoing' : 'ends'}</span>
		</div>`;
		fetchCompetitionMatch(response.currentSeason.currentMatchday).then(data => {
			preloaderSmallComponent.destroy();
			matchListComponent.items = data.matches.reverse();
		}).catch((error) => {
			preloaderSmallComponent.destroy();
			M.toast({html: `Having trouble with intenet connection or API request limit reached 😢`});
		});
	}).catch(error => {
		preloaderSmallComponent.destroy();
		M.toast({html: `Having trouble with intenet connection or API request limit reached 😢`});
	});

	return Promise.resolve();
}

export const close = () => {
	return Promise.resolve();
}