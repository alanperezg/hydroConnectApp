import React from 'react';
import Head from 'next/head';
import {Header} from '../components/Header';


export class LoggedUserMask extends React.Component{
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
                    }
                `}</style>
                <Head>
                    <title>Dashboard</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap" rel="stylesheet"></link>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" rel="stylesheet"></link>
                    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                </Head>
                <Header showDevices={this.props.showHeaderDevices}></Header>
                <div className="Appcontent">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
LoggedUserMask.defaultProps = {
    showHeaderDevices: false
}