import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from "./reducers";

const middleware = [thunk];

const defaultState = {}

const store = createStore(
    reducers,
    defaultState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

export default store;