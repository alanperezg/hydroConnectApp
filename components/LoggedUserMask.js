import React from 'react';
import Head from 'next/head';
import Router from "next/router";
import { Header } from '../components/Header';


export class LoggedUserMask extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(localStorage.getItem('token') == undefined){
            Router.push({pathname: '/'});
        }
    }
    render(){
        return(
            <div>
                <style jsx global>{`
                    html,body{
                        margin: 0;
                        padding: 0;
                        background-color: rgb(228, 231, 234);
                        font-family: 'Roboto', sans-serif;
                        color: #313131;
                    }
                    .hide{
                        display: none!important;
                    }
                    .Appcontent{
                        max-width: 1000px;
                        margin: ${(this.props.showHeaderDevices === true ? '162px' : '114px')} auto 40px auto;
                        max-width: 1000px;
                        padding: 10px;
                    }
                `}</style>
                <Head>
                    <title>{this.props.pageTitle}</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap" rel="stylesheet"></link>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" rel="stylesheet"></link>
                    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                </Head>
                <Header showDevices={this.props.showHeaderDevices} devices={this.props.devices} selectedDevice={this.props.selectedDevice} onDevicesSelectChange={this.props.onDevicesSelectChange} deviceConnected={this.props.deviceConnected}></Header>
                <div className="Appcontent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
LoggedUserMask.defaultProps = {
    pageTitle: "",
    showHeaderDevices: false
}