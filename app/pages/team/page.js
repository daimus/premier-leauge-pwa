import '../../components/header-bar/header-bar.component';
import '../../components/regular-table/regular-table.component';
import '../../components/team-info/team-info.component';
import '../../components/preloader-small/preloader-small.component';
import html from './team.html';

import { getTeam } from '../../utils/api';
import { get } from '../../utils/idxdb';

export const open = (teamId) => {
	const main = document.querySelector("main");
	main.innerHTML = html;

	const preloaderSmallComponent = document.querySelector('preloader-small');

	get(parseInt(teamId)).then(data => {
		if (data == undefined) {
			getTeam(teamId).then(data => {
				preloaderSmallComponent.destroy();
				render(data);
			}).catch(error => {
				preloaderSmallComponent.destroy();
				M.toast({ html: `<span>Please connect to internet to get team information 😉 </span><a href="javascript:history.back()" class="btn-flat toast-action">Back</a>` });
			})
		} else {
			preloaderSmallComponent.destroy();
			render(data);
		}
	}).catch(error => {
		preloaderSmallComponent.destroy();
		M.toast({ html: `<span>Can't find team in database 😢 </span><a href="javascript:history.back()" class="btn-flat toast-action">Back</a>` });
	});

	return Promise.resolve();
}

export const close = () => {
	return Promise.resolve();
}

const render = (data) => {
	const headerBarComponent = document.querySelector('header-bar');
	const regularTableComponent = document.querySelector('regular-table');
	const teamInfoComponent = document.createElement('team-info');
	teamInfoComponent.item = data;

	headerBarComponent.widget = teamInfoComponent.innerHTML;

	let body = [];
	data.squad.forEach(element => {
		body.push([
			element.name,
			element.position ? element.position : element.role,
			new Date().getFullYear() - new Date(element.dateOfBirth).getFullYear(),
			element.nationality
		]);
	});
	regularTableComponent.items = {
		thead: [
			'Name',
			'Position',
			'Age',
			'Nationality'
		],
		tbody: body
	};
}