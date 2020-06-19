import html from './error.html';
import './error.css';

export const open = (err) => {
	const main = document.querySelector("main");
	main.innerHTML = html;

	document.querySelector('h2').innerHTML = `${err}`;

	return Promise.resolve();
}

export const close = () => {
	return Promise.resolve();
}
