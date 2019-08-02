import React,{lazy,Suspense} from "react";
import loadable from "react-loadable";
import {
    HashRouter as Router,
    Route,
    Redirect,
    withRouter,
    Switch,
    Link,
    Prompt
} from "react-router-dom";
import MapRoute from "@/component/map-route";
import publicRoutes from "./public-route";
import privateRoutes from "./private-route";
const Loading = () => (<div>Loading...</div>);
const OrderQuery = lazy(() => import("@app/page/order-query"));
// // const OrderQuery = () => import(/* webpackChunkName: "orderQuery" */"@app/page/order-query");
// const OrderQuery = loadable({
//     loading: Loading,
//     loader: () => import(/* webpackChunkName: "orderQuery" */"@app/page/order-query")
// })
const Layout = (props) => (<div className="layout">{props.children}</div>);
export default function(){
    return(
        <Router>
            <Switch>
                <MapRoute routes={publicRoutes}/>
            </Switch>
            <Switch>
                <Layout>
                        <Switch>
                            {/* <Route exact path="/orderquery" component={OrderQuery}/> */}
                            <MapRoute routes={privateRoutes}/>
                        </Switch>
				</Layout>
            </Switch>
        </Router>
    )
}


