import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import Router from "@app/router";
let App = (props) => {
    return (
        <Provider store={props.store}>
            <Router/>
        </Provider>
    );
};
// 增加热更新
if(module.hot){
    App = hot(module)(App);
}
export default App;