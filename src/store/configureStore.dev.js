import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import thunk from 'redux-thunk';

export default function configureStore() {
    return createStore(
        rootReducer,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        composeEnhancer(applyMiddleware(thunk))
    );
}