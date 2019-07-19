import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import Layout from "@app/layout";
let App = (props) => {
    return (
        <Provider store={props.store}>
            <Layout/>
        </Provider>
    );
};
// 增加热更新
if(module.hot){
    App = hot(module)(App);
}
export default App;