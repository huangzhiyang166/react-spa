import React from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    withRouter,
    Link,
    Prompt
} from "react-router-dom";
import { connect } from "react-redux";
const fn = function(){};
const AuthManager = {
    isLogin : false,
    login(cb=fn){
        this.isLogin = true;
        setTimeout(cb,100)
    },
    logout(cb=fn){
        this.isLogin = false;
        setTimeout(cb,100)
    }
};

const AuthButton = withRouter(({history}) => {
    const logined = () => (
        <p>
            welcome!
            <button onClick={() => {
                AuthManager.logout(() => {
                    history.push("/")
                })
            }}>
                Sign out
            </button>
        </p>
    );
    const logout = () => (<p>You are not logged in.</p>);
    return AuthManager.isLogin ? logined() : logout();
})

const co = () => new Promise((resolve,reject) => {
    const a = window.confirm("请先登录..");
    a ? resolve() : reject();
})

const PrivateRuote = ({component:Component,...rest}) => {
    return (
        <Route {...rest} render={(props) => {
            if(AuthManager.isLogin) return <Component {...props}/>;
            return <Redirect to={{
                pathname : "/login",
                state : {
                    from : props.location
                }
            }}/>
        }}/>
    )
}

const PrivateRuoteStore = ({component:Component,...rest}) => {
    class PrivateRuoteStore extends React.Component{
        render(){
            return(
                <Route {...rest} render={(props) => {
                    if(AuthManager.isLogin) return <Component {...props}/>;
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
    // return connect((state) => ({
    //     isLogin : state.loginInfo.isLogin
    // }))(PrivateRuoteStore);
    return <PrivateRuoteStore/>
}



const Public = () => (<h3>Public</h3>);
const Protected = () => (<h3>Protected</h3>);

export default function(){
    return(
        <Router>
            <div>
                <AuthButton/>
                <Prompt when={false} message={(location) => {
                    console.log(location);
                    return true;
                }}/>
                <ul>
                    <li>
                        <Link to="/public">public page</Link>
                    </li>
                    <li>
                        <Link to="/protected">protected page</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public}/>
                <PrivateRuoteStore path="/protected" component={Protected}/>
            </div>
        </Router>
    )
}


