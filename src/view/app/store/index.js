import { createStore, applyMiddleware, compose } from "redux";
import globalStore from "./global";
import thunk from "redux-thunk";
const {actions,reducers,actionTypes} = globalStore;
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancer(applyMiddleware(thunk)));
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./global", () => {
        const nextRootReducer = require("./global").default.reducers;
        store.replaceReducer(nextRootReducer);
    });
}

export {actions,actionTypes};

export default store;


