import React from "react";
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
                        <MapRoute routes={privateRoutes}/>
					</Switch>
				</Layout>
            </Switch>
        </Router>
    )
}


