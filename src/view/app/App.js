import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
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
export default App;