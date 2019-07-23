
import React from "react";
import {Switch} from "react-router-dom";
import AuthLoginRoute from "@/component/auth-login-route";
export default function MapRoute({routes,parentPath=""}){
	if(!Array.isArray(routes) || routes.length==0) return null;
	return routes.map((route,index) => {
		const {component:Component,children,path,...rest} = route;
		let _path = path;
		if(parentPath){
			_path = parentPath + "/" + path;
		}
		return <AuthLoginRoute path={_path} {...rest} key={index} render={(props) => {
			return(
				<Component {...props} {...rest}>
				{Array.isArray(children) ? (
					<Switch>
						<MapRoute routes={[...children]} parentPath={path}/>
					</Switch>
				) : null}
				</Component>
			)
		}}/>
	})
}