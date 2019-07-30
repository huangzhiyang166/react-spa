import {combineReducers} from "redux";
const files = require.context(".",true,/\.js$/);
const modules = {};
files.keys().forEach((key) => {
    if(key=="./index.js" || key=="./reducer.js") return false;
    if(!/.*index\.js$/.test(key)) return false;
    const newKey = key.replace(/(\.\/|\/index\.js)/g,"");
    modules[newKey] = files(key).reducer;
})
const reducer = combineReducers(modules);


export default reducer;