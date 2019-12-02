import React from 'react';
import { SimpleMask } from '../components/SimpleMask';
import { TextInput } from '../components/TextInput';
import { PasswordInput } from '../components/PasswordInput';
import { Api } from '../functions/Api';
import Router from "next/router";


export class Login extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        wrongCredentialsAlert: false,
        emailInput: "",
        passwordInput: ""
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleLoginClick = this.handleLoginClick.bind(this);
    }


    handleInputChange(name, value){
      let state = {};
      state[name] = value;
      this.setState(state);
    }

    handleLoginClick(){
      let data = {email: this.state.emailInput, password: this.state.passwordInput};
      Api.post('login', data, (qRes) => {
        if(qRes.token !== null){
            localStorage.setItem('token', qRes.token);
            Router.push({pathname: '/dashboard'});
        }else{
            this.setState({wrongCredentialsAlert: true});
        }
    });
    }
    render(){
        return (
            <SimpleMask pageTitle="Login - Hydroconnect">
                <div className="main">
                    <style jsx>{`
                        .main{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: rgb(228,231,234);
                            font-family: 'Roboto',sans-serif;
                            color: #313131;  
                            min-height: 400px;  
                        }
                        .logo > img{
                            height: 50px;
                        }
                        .loginForm{
                            background-color: #fff;
                            padding: 40px;
                            border-radius: 5px;
                            border: 1px solid #DFE2E6;
                        }
                        .loginForm > .row:nth-last-child(n+2){
                            margin-bottom: 20px;
                        }
                        .btn{
                            width: 100%;
                            font-size: 14px;
                            text-align: center;
                            border-radius: 5px;
                            background-color: #85982f;
                            color: #fff;
                            padding: 10px;
                            box-sizing: border-box;
                            cursor: pointer;
                        }
                        .btn:hover{
                            background-color: #708222;
                        }
                        .alertMsg{
                            font-size: 14px;
                            text-align: center;
                            margin-bottom: 20px;
                            color: #F44336;
                        }
                    `}</style>
                    <div className="loginContainer">
                        <div className="logo">
                        
                        </div>
                        <div className="loginForm">
                            <div className={"alertMsg "+(this.state.wrongCredentialsAlert ? '':'hide')}>Usuario o contraseña incorrectos</div>
                            <div className="row">
                                <TextInput placeholder="Email" name="emailInput" value={this.state.emailInput} onChange={this.handleInputChange} width="100%"/>
                            </div>
                            <div className="row">
                                <PasswordInput placeholder="Contraseña" name="passwordInput" value={this.state.passwordInput} onChange={this.handleInputChange} width="100%"/>
                            </div>
                            <div className="row">
                                <div className="btn" onClick={this.handleLoginClick}>Login</div>
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleMask>
        );
    }
}

export default Login;