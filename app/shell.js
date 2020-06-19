import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './assets/css/style.css';
import './assets/css/icon.css';

import './components/navigation-bar/navigation-bar.component';

import { bootstrapAsync, getCurrentPage } from './app';

bootstrapAsync(getCurrentPage());