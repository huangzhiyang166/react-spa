import { createStore } from "redux";
import {combineReducers} from "redux";

const files = require.context(".",true,/\.js$/);
const modules = {};

files.keys().forEach((key) => {
    if(key=="./index.js") return false;
    if(!/.*index\.js$/.test(key)) return false;
    const newKey = key.replace(/(\.\/|\/index\.js)/g,"");
    modules[newKey] = files(key).reducer;
})

const reducer = combineReducers(modules);

export const configureStore = () => {
    const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./reducer", () => {
            const nextRootReducer = require("./reducer").default;
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store;
};