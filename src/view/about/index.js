import "@/assets/styles/aaa.scss";
import React from "react";
import ReactDom from "react-dom";
import {getToday} from "@/util";
import Footbar from "@/component/foot-right";
getToday();
Footbar();
ReactDom.render(
    <h1>hello, world!</h1>,
    document.getElementById("root")
);