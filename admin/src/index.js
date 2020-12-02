import React from 'react';
import ReactDOM from 'react-dom';
import 'notyf/notyf.min.css';
import './custom.scss';
import App from 'containers/App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import * as serviceWorker from './serviceWorker';
import "bootstrap"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck, faCoffee, faCreditCard, faUsers, faSignOutAlt, faTimes, faPlus, faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas, faCheck, faCoffee, faCreditCard, faUsers, faSignOutAlt, faTimes, faPlus, faMoneyCheckAlt)

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
