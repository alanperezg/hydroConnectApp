import React from 'react';

export class ContentBlock extends React.Component{
    render(){
        return(
            <div className="contentBlock">
                <style jsx>{`
                    .contentBlock:nth-last-child(n+2){
                        margin-bottom: 20px;
                    }
                    .contentBlock > .title{
                        font-size: 25px;
                        font-weight: 300;
                        margin-bottom: 10px;
                        color: #607D8B;
                    }
                    .contentBlock > .content{
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: rgba(0, 0, 0, 0.05) 5px 5px 10px 0px;
                        border-radius: 5px;
                        
                    }    
                `}</style>
                <div className="title">{this.props.title}</div>
                <div className="content">{this.props.children}</div>
            </div>
        );
    }
}