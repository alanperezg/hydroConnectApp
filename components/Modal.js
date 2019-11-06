import React from 'react';
import PropTypes from 'prop-types';

export class Modal extends React.Component{
    render(){
        return (
            <div className={"background "+((this.props.state == 1 || this.props.state == 2) ? '' : 'hide') }>
                <style jsx>{`
                    .background{
                        position: fixed;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        background-color: rgba(0,0,0,0.2);
                        z-index: 100000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .background::after, .background::before{
                        margin: 20px;
                        content: '';
                    }
                    .mainContainer{
                        background-color: #fff;
                        width: 600px;
                        box-shadow: 15px 15px 25px 0px rgba(0,0,0,.1);
                        border-radius: 5px;
                    }
                    .header{
                        padding: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                    }
                    .header > .title{
                        flex: 1;
                        font-size: 20px;
                        color: #4b5b63;
                    }
                    .header > .closeBtn{
                        display: flex;
                        cursor: pointer;
                    }

                    .content{
                        padding: 10px 20px;
                    }

                    .footer{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        padding: 15px;
                    }
                    .footer > .btn{
                        font-size: 14px;
                        background-color: #85982f;
                        color: #fff;
                        padding: 8px 15px;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                    .loading > i{
                        font-size: 35px;
                        color: #797979;
                    }
                `}</style>
                <div className={"mainContainer "+(this.props.state == 2 ? '' : 'hide')}>
                    <div className={"header "+(this.props.showHeader ? '' : 'hide')} >
                        <div className="title">{this.props.title}</div>
                        <div className="closeBtn">
                            <i className="material-icons">close</i>
                        </div>
                    </div>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <div className={"footer "+(this.props.showFooter ? '' : 'hide')} >
                        {(()=>{
                        })()}
                        <div className="btn">Siguiente</div>
                    </div>
                </div>
                <div className={"loading "+(this.props.state == 1 ? '' : 'hide')}>
                    <i className="fa fa-circle-notch fa-spin"></i>
                </div>
            </div>
        );
    }
}
Modal.defaultProps = {
    state: 0, showHeader: false, title: "", showFooter: false, buttons:[]
}
Modal.proptypes = {
    state: PropTypes.number.isRequired,
    showHeader: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    showFooter: PropTypes.bool.isRequired,
    buttons: PropTypes.array.isRequired
}