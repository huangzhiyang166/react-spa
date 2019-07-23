import React from "react";
const Home = (props) => (<h3>Home</h3>);
const Detail = (props) => {
	return(
		<div className="page detail">
			page detail
			{props.children}
		</div>
	)
}
const About = (props) => {
	return (<h3>About</h3>);
};
export default [{
	path : "/",
	exact : true,
	requireAuth : true,
	component : Home,
},{
	path : "/detail",
	component : Detail,
	requireAuth : false,
	children : [{
		path : "about",
		component : About,
		title : "ssssssssss",
		requireAuth : true,
		meta : {
			a : "aaaaaaaaa"
		}
	}]
}];
