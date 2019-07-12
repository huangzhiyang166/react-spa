import { createStore } from "redux";
import reducer from "./reducer";

// const store = createStore(reducer);
export const configureStore = () => {
    const store = createStore(reducer,{appInfo:{a:"init"}});
    
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./reducer", () => {
            const nextRootReducer = require("./reducer").default;
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store;
};