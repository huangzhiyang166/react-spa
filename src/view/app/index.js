import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "./store";
import "./style.scss";
const store = configureStore();
const wrapper = document.getElementById("root");

ReactDOM.render(
    <App store={store}/>,
    wrapper
);