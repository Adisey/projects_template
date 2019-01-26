// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

// Instruments
import { store } from './init/store';
import { history } from './init/middleware/core';

// Styles
import './index.css';
// Components
import App from './navigation/App';
import * as serviceWorker from './serviceWorker';
render(
    <Provider store = { store }>
        <Router history = { history }>
            <App />
        </Router>
    </Provider>,

    document.getElementById('root')
);

serviceWorker.unregister();
