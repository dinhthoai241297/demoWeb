import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import './assets/css/main.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.dev';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
