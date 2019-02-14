/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

import sagas from './sagas';
import createSagaMiddleware from 'redux-saga';
import { promiseMiddleware } from './middleware';
// import reducers from './reducers';
import api from './reducers/api';

const reducers = combineReducers({ api });

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
	promiseMiddleware
];

const composeEnhancers = ((typeof window !== 'undefined') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(...middleware)
)(createStore);

export default function configureStore(initialState = {}) {
	const store = createStoreWithMiddleware(reducers, initialState);

	// run saga watchers
	_.forEach(_.values(sagas), sagaMiddleware.run);

	return store;
}
