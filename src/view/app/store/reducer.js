import {combineReducers} from "redux";
const createReducer = (initState,reducers) => {
    return function(state=initState,{type,payload}){
        const reducer = reducers[type];
        return reducer ? reducer(state,payload) : state;
    }
}
const globalStore = {};
const files = require.context(".",true,/\.js$/);
files.keys().forEach((key) => {
    if(key=="./index.js" || key=="./reducer.js") return false;
    if(!/.*index\.js$/.test(key)) return false;
    const m = files(key);
    let {namespace,initState,reducers} = m;
    if(!initState || !reducers) return false;
    if(typeof namespace!=="string" || !namespace){
        namespace = key.replace(/(\.\/|\/index\.js)/g,"");
    }
    globalStore[namespace] = createReducer(initState,reducers)
})

const pageStore = {};
const pageStoreFiles = require.context("../page",true,/\.js$/);
const getStoreName = (key) => key.replace(/.*\/(.*)\/store.*\.js$/g,(...args) => (args[1]));
pageStoreFiles.keys().filter((key) => {
    return key.endsWith("store.js") || key.endsWith("store/index.js")
}).forEach((key) => {
    const m = pageStoreFiles(key);
    let {namespace,initState,reducers} = m;
    if(!initState || !reducers) return false;
    if(typeof namespace!=="string" || !namespace){
        namespace = getStoreName(key);
    }
    pageStore[namespace] = createReducer(initState,reducers)
})
//如果页面级store跟全局store有重名，则提示(页面级store会覆盖全局store)
for(let key in pageStore){
    if(globalStore[key]){
        console.warn(`全局store与页面级store重名："${key}" 页面级store将覆盖全局store.`);
    }
}
const reducer = Object.assign({},globalStore,pageStore);
export default combineReducers(reducer);