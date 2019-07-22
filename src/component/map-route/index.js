
import React from "react";
import {Switch} from "react-router-dom";
import AuthLoginRoute from "@/component/auth-login-route";
export default function MapRoute({routes}){
	if(!Array.isArray(routes) || routes.length==0) return null;
	return routes.map((route,index) => {
		const {component:Component,children,...rest} = route;
		return <AuthLoginRoute {...rest} key={index} render={(props) => {
			return(
				<Component {...props} {...rest}>
				{Array.isArray(children) ? (
					<Switch>
						<MapRoute routes={[...children]}/>
					</Switch>
				) : null}
				</Component>
			)
		}}/>
	})
}