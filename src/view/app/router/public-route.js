import React from "react";
const Login = () => (<h3>Login</h3>)
export default [{
	path : "/login",
	exact : true,
	requireAuth : false,
	component : Login
}];