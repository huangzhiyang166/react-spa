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
const Layout = (props) => (<div className="layout">{props.children}</div>);
const Home = (props) => (<h3>Home</h3>);
const Detail = (props) => {
	return(
		<div className="page detail">
			page detail
			{props.children}
		</div>
	)
}
const Login = () => (<h3>Login</h3>);
const NotFound = () => (<h3>NotFound</h3>);
const About = (props) => {
	console.log(props);
	return (<h3>About</h3>);
};
const publicRoutes = [{
	path : "/login",
	component : Login
}];
const privateRoutes = [{
	path : "/",
	exact : true,
	component : Home,
},{
	path : "/detail",
	component : Detail,
	children : [{
		path : "/detail/about",
		component : About,
		title : "ssssssssss",
		meta : {
			a : "aaaaaaaaa"
		}
	}]
}]

export default function(){
    return(
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Layout>
					<Switch>
						<MapRoute routes={privateRoutes}/>
						<Route component={NotFound}/>
					</Switch>
				</Layout>
            </Switch>
        </Router>
    )
}


