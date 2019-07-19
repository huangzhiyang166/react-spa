import React,{lazy,Suspense} from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import Header from "./header";
import Leftbar from "./leftbar";
import Footer from "./footer";
const Home = lazy(() => import(/* webpackChunkName: 'home.page' */"@app/page/home"));
const Detail = lazy(() => import(/* webpackChunkName: 'detail.page' */"@app/page/detail"));
const List = lazy(() => import(/* webpackChunkName: 'list.page' */"@app/page/list"));
const Loading = () => (<div>loading...</div>);



export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <div id="rootContainer">
                <Header/>
                <Leftbar/>
                <div className="mainContainer">
                    <Router>
                        <Suspense fallback={Loading()}>
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <Route path="/list/abs" render={(props) => {
                                    return <List {...props}/>
                                }}/>
                                <Route path="/detail" exact component={Detail}/>
                            </Switch>
                        </Suspense>
                    </Router>
                </div>
                <Footer/>
            </div>
        )
    }
}
