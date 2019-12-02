import React from 'react';
import PropTypes from 'prop-types';
import Router from "next/router";
import Head from 'next/head'

export class SimpleMask extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(localStorage.getItem('token') != undefined){
            Router.push({pathname: '/dashboard'});
        }
    }
    render(){
        return (
            <div className="simple-mask">
                <Head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                    <title>{this.props.pageTitle}</title>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;display=swap" rel="stylesheet"/>
                </Head>
                <style global jsx>{`
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
                    #__next{
                        width: 100%;
                        height: 100%;
                    }
                    .simple-mask{
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
                {this.props.children}
            </div>
        );
    }
}
SimpleMask.propTypes = {
    pageTitle: PropTypes.string.isRequired
}