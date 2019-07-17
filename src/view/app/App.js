import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import {login,getMemberInfo} from "@/api";
let App = (props) => {
    function onClick(e){
        import(/* webpackChunkName:'aa' */ "./aa").then((module) => {
            const aa = module.default;
            aa();
        })
        aa();
    }
    return (
        <Provider store={props.store}>
            <p onClick={onClick} className="title">看我实现热更新!!!</p>
        </Provider>
    );
};
// 增加热更新
if(module.hot){
    App = hot(module)(App);
}


login("123624","mmcs123","").then((res) => {
    console.log(res);
    getMemberInfo().then((infoRes) => {
        console.log(infoRes)
    })
})







export default App;