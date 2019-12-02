import React from 'react';

export class InformationBox extends React.Component{
    render(){
        return (
            <div className="informationBox">
                <style jsx>{`
                    .informationBox > .title{
                        text-align: center;
                        font-size: 18px;
                        font-weight: 500;
                        margin-bottom: 5px;
                        color: #4b5b63;
                    }
                    .informationBox > .value{
                        font-size: 30px;
                        font-weight: 100;
                        color: #85982f;
                        text-align: center;
                    }
                    @media (max-width: 700px) {
                        .informationBox{
                            width: 100%;
                            margin-bottom: 5px;
                        }
                    }
                `}</style>
                <div className="title">{this.props.title}</div>
                <div className="value">{this.props.value}</div>
            </div>
        );
    }
}