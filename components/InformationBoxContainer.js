import React from 'react';

export class InformationBoxContainer extends React.Component{
    render(){
        return (
            <div className="informationBoxContainer">
                <style jsx>{`
                     .informationBoxContainer{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        width: 80%;
                        margin: auto;
                        margin-bottom: 10px;
                      }
                `}</style>
                {this.props.children}
            </div>
        );
    }
}