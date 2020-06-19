"use strict";

const baseUrl = 'https://daimus.github.io/premier-leauge-pwa/';
let currentPage;
let currentAction;

// Bootstraping for Page Shell.
export const bootstrap = (page) => {
	getCurrentPage();
	currentPage = page;
	currentAction = currentPage.open()
		.then(() => {
			// Register Service Worker
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', () => registerServiceWorker());
			}
		});
	registerRouter();
}

// Bootstrapping for App Shell (or hybrid Page Shell page)
export const bootstrapAsync = (pageName) => {
	currentAction = Promise.resolve();
	openPage({
		page: pageName
	}).then(() => {
		// Register Service Worker
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => registerServiceWorker());
		}
	});
	registerRouter();
}

// Register service worker & request notification permission
const registerServiceWorker = async () => {
	const register = await navigator.serviceWorker.register("/sw.js").then(registration => {
		console.log('[SW] Service worker registered');
	}).catch(error => {
		console.error('[SW] Service worker registration failed', error);
	});
	await navigator.serviceWorker.ready;
	requestNotificationPermission();
}

// Bind router to events
const registerRouter = () => {
	window.addEventListener("popstate", event => {
		openPage(event.state || {
			page: getCurrentPage()
		});
	});
}

// Get current page from URL
export const getCurrentPage = () => {
	let uri = location.href;
	uri = uri.substring(0, uri.indexOf('?') != -1 ? uri.indexOf('?') : uri.indexOf('?').length).substring(uri.indexOf(baseUrl) + baseUrl.length).split('/');
	return (uri.length == 1) ? 'matches' : uri[1];
}

export const getParams = () => {
	let uri = location.href;
	uri = uri.substring(0, uri.indexOf('?') != -1 ? uri.indexOf('?') : uri.indexOf('?').length).substring(uri.indexOf(baseUrl) + baseUrl.length).split('/');
	let params = uri.splice(2);
	return params;
}

// Open page
const openPage = (state) => {
	const pageName = state.page;
	const uriSegment = location.href.split('/');
	currentAction = currentAction
		.then(() => currentPage && currentPage.close())
		.then(() => import(`./pages/${pageName}/page`))
		.then(newPage => {
			currentPage = newPage;
			return currentPage.open(getParams());
		})
		// Display error page
		.catch(err => {
			console.log(err);
			return import("./pages/error/page")
				.then(newPage => {
					currentPage = newPage;
					return currentPage.open(err);
				});
		});
	return currentAction;
}

// Router logic to navigate to other page
export const navigate = (pageName) => {
	const uriSegment = pageName.split('/');
	pageName = uriSegment[0];
	const state = { page: pageName };
	window.history.pushState(state, pageName, `${baseUrl}#/${pageName}/${getParams().join('/')}`);
	openPage(state);
}

// Request notification permission & Subscribe Firebase Cloud Message Push Notification
const requestNotificationPermission = () => {
	if ('Notification' in window) {
		Notification.requestPermission().then(result => {
			if (('PushManager' in window)) {
				navigator.serviceWorker.getRegistration().then(registration => {
					registration.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: urlBase64ToUint8Array('BEtm6g5f-E-PDQsmlCLJR4tDnHMG_Dmh1Z7HVn18CSFYWOLJxJFefWIzz5669f79NHl_zj3r_2Lbxuf0UEEm9Z4')
					}).then(subscribe => {
						console.groupCollapsed('FCM Subscription');
						console.log('Endpoint: ', subscribe.endpoint);
						console.log('P256DH Key: ', btoa(String.fromCharCode.apply(
							null, new Uint8Array(subscribe.getKey('p256dh')))));
						console.log('Auth Key: ', btoa(String.fromCharCode.apply(
							null, new Uint8Array(subscribe.getKey('auth')))));
						console.groupEnd('FCM Subscription');
					}).catch(e => {
						console.error('Subscription Fail: ', e.message);
					});
				});
			}
		});
	}
}

const urlBase64ToUint8Array = (base64String) => {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, '+')
		.replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
