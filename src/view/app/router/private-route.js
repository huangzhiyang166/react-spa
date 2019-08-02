import React,{Suspense,lazy} from "react";
import Home from "@app/page/home"
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
// const OrderQuery = lazy(() => import(/*webpackChunkName : 'orderQuery'*/"@app/page/order-query"));
const Booking = lazy(() => import(/*webpackChunkName : 'booking'*/"@app/page/booking"));
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
},
// {
// 	path : "/orderquery",
// 	exact : true,
// 	requireAuth : true,
// 	component : OrderQuery,
// },
{
	path : "/booking",
	exact : true,
	requireAuth : true,
	component : Booking,
}];
