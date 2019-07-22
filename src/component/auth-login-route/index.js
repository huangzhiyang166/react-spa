import React from "react";
import { connect } from "react-redux";
import {Route,Redirect} from "react-router-dom";
export default function AuthLoginRoute({component:Component,render,...rest}){
    class AuthLoginRoute extends React.Component{
        render(){
            return(
                <Route {...rest} render={(props) => {
                    if(this.props.isLogin){
						if(Component) return <Component {...props} {...rest}/>;
						if(render) return render({...props,...rest});
					}
                    return <Redirect to={{
                        pathname : "/login",
                        state : {
                            from : props.location
                        }
                    }}/>
                }}/>
            )
        }
    }
    const AuthLoginRouteStore = connect((state) => ({
        isLogin : state.userInfo.isLogin
    }))(AuthLoginRoute);
    return <AuthLoginRouteStore/>
}