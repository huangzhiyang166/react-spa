import React, { useState, useEffect }  from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import {actions as globalActions,actionTypes as globalActionTypes} from "@app/store";
const {app:actions} = globalActions;
const {app:actionTypes} = globalActionTypes;
console.log(actions);
console.log(actionTypes);

const Modal = () => new Promise((resolve,reject) => {

    const mountEl = document.createElement("div");
    document.body.appendChild(mountEl);


    class ModalContainer extends React.Component{
        constructor(props){
            super(props);
            this.el = document.createElement("div");
            document.getElementById("modal-root").appendChild(this.el);
        }
        componentWillUnmount(){
            document.getElementById("modal-root").removeChild(this.el)
        }
        onClick = (e) => {
            const {close} = this;
            resolve({close});
        }
        close = () => {
            ReactDom.unmountComponentAtNode(mountEl)
            document.body.removeChild(mountEl);
        }
        render(){
            const Modal = () => (
                <div className="modalContainer">
                    {this.props.children}
                    <button onClick={this.onClick}>click</button>
                </div>
            )
            return ReactDom.createPortal(<Modal/>,this.el);
        }
    }

    ReactDom.render(<ModalContainer/>,mountEl);

})

const Hello = (props) => {
    return <div>hello..</div>;
}


export default connect((state)=>{
    console.log(state);
    return state
})((props) => {
    return(
        <div>
            aaaaaaaaaa
                <Hello/>
        </div>
    )
})



