import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import "./style.scss";
const wrapper = document.getElementById("root");

ReactDOM.render(
    <App store={store}/>,
    wrapper
);