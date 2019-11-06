import React from 'react';
import Link from 'next/link';

export class Header extends React.Component{
    render(){
        return(
            <div>
                <style jsx>{`
                    .header{
                        box-shadow: rgba(0, 0, 0, 0.05) 5px 5px 10px 0px;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 100000;
                    }
                    .header > .headerTop{
                        display: flex;
                        padding: 22px 20px;
                        background-color: #fff;
                    }
                    .header > .headerTop > .title{
                        flex: 1;
                        align-items: center;
                        display: flex;
                    }
                    .header > .headerTop > .title div{
                        font-size: 22px;
                        font-weight: 300;
                        color: #85982f;
                    }
                    .header > .headerTop > .title img{
                        height: 31px;
                    }
                    .header > .headerTop > ul{
                        list-style-type: none;
                        margin: 0px;
                        padding: 0px;
                        display: flex;
                        align-items: center;
                    }
                    .header > .headerTop > ul > li{
                        cursor: pointer;
                        margin-left: 15px;
                        font-size: 13px;
                        text-transform: uppercase;
                        color: #313131;
                    }
                    .header > .headerBottom{
                        display: flex;
                        align-items: center;
                        background-color: #f3f3f3;
                        padding: 8px 20px;
                        border-bottom: 1px solid #dcdcdc;
                        border-top: 1px solid #eaeaea;
                    }
                    .header > .headerBottom > .status{
                        flex: 1;
                        color: #4b5b63;
                        font-weight: 300;
                    }
                    .header > .headerBottom > .status::before{
                        content: '•';
                        color: #4CAF50;
                        font-size: 30px;
                        line-height: 30px;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    .header > .headerBottom > select{
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: #ffffff;
                        border-radius: 2px;
                        height: 30px;
                        width: 175px;
                        padding: 0 10px;
                        color: #464646;
                        border: 1px solid #eaeaea;
                        font-size: 12px;
                    }
                `}</style>
                <div className="header">
                    <div className="headerTop">
                        <div className="title">
                            <img src="logo.png"></img>
                            <div>Apponics</div>
                        </div>
                        <ul className="nav">
                            <Link href="/"><li>Dashboard</li></Link>
                            <Link href="/dispositivos"><li>Dispositivos</li></Link>
                        </ul>
                    </div>
                    <div className={`headerBottom ${(this.props.showDevices === false ? 'hide' : '')}`}>
                        <div className="status">Conectado</div>
                        <select>
                            <option>Dispositivo 1</option>
                            <option>Dispositivo 2</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}