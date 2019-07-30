import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancer(applyMiddleware(thunk)));
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducer", () => {
        const nextRootReducer = require("./reducer").default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;


