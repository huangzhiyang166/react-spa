import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import {login,getMemberInfo} from "@/api";
console.log(process.env);
let App = (props) => {
    return (
        <Provider store={props.store}>
            <p className="title">看我实现热更新!!!</p>
        </Provider>
    );
};
// 增加热更新
if (module.hot) {
    App = hot(module)(App);
}


login("123624","mmcs123","").then((res) => {
    console.log(res);
    getMemberInfo().then((infoRes) => {
        console.log(infoRes)
    })
})







export default App;