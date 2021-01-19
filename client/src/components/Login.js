import React, { Component, useState } from 'react';
import './Login.css';

export default class Login extends Component {

    constructor() {
        super()

        this.state = {
            email: "",
            password: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        this.setState({
            email: "",
            password: ""
        })

        // TODO add api submit and cookie to be received
    }

    render() {
        return (
            <div className="Login">
                <div className="text">Login</div>
                <LoginInputs
                    email={this.state.email}
                    password={this.state.password}
                    onChange={this.handleInputChange}
                />
                <LoginButton onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

function LoginButton(props) {
    return (<button onClick={props.onSubmit}>Login</button>

    );
}

function LoginInputs(props) {
    const isEmpty = (text) => {
        return text === "";
    }

    const [show, setShow] = useState(false);

    const showClick = () => {
        setShow(!show)
    }

    const emptyStyle = { fontWeight: "bold", textAlign: "center" };
    const otherStyle = { fontWeight: "lighter", fontSize: "100%" }



    return (
        <div className="inputs">
            <input
                name="email"
                placeholder="Email"
                value={props.email}
                onChange={props.onChange}

                style={isEmpty(props.email) ? emptyStyle : otherStyle}

            />
            <input
                name="password"
                placeholder="Password"
                value={props.password}
                onChange={props.onChange}

                type={show ? "text" : "password"}

                style={isEmpty(props.password) ? emptyStyle : otherStyle}

            />
            <div className="show">
                <div className="text">Show Password</div>
                <div className="circle" onClick={showClick} style={show ? { backgroundColor: "#a5a5a5" } : {}} ></div>
            </div>

        </div >
    );
}