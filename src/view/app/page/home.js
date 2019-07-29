import React from "react";
import ReactDom from "react-dom";

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


export default function Home(){
    function onClick(e){
        Modal().then(({close}) => {
            console.log("aaaa");
            close();
        })
    }
    return(
        <div onClick={onClick}>
            ssssssss
        </div>
    )
}




