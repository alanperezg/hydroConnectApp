import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class Dropdown extends React.Component{
    constructor(props){
        super(props);
        this.state = { show: false }
        this.toogleShow = this.toogleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount(){
        document.addEventListener('mousedown', this.handleClose, false);
    }
    
    componentWillUnmount(){
        document.addEventListener('mousedown', this.handleClose, false);
    }
    
    handleClose(e){
        console.log(this.state);
        /*if(this.node.contains(e.target)){
            return;
        }else{
            if(this.state.show){
                this.setState({show: false});
            }
        }*/
    }

    toogleShow(){
        this.setState({show: (!this.state.show)});
    }
    render(){
        return(
            <div className="container">
                <style jsx>{`
                    .button{
                        cursor: pointer;
                    }
                    .button-arrow svg{
                        color: #607D8B;
                    }
                    .button[attr-show='true'] .button-arrow svg{
                        transform: rotate(180deg);
                    }
                    .options-relative{
                        position:relative;
                    }
                    .options{
                        position:absolute;
                        right: 0;
                        box-shadow: 0px 1px 3px rgba(151, 151, 151, 0.25);
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 5px;
                        overflow: hidden;
                    }
                    .option{
                        min-width: 120px;
                        background-color: #fff;
                        padding: 8px;
                        cursor: pointer;
                        font-weight: normal;
                        font-size: 14px;
                        color: #858383;
                        font-weight: 300;
                    }
                    .option:hover{
                        background-color: #c3c3c3;
                        color: #fff;
                    }
                    .hide{
                        display: none;
                    }
                `}</style>
                <div className="button" attr-show={(this.state.show ? 'true' : 'false')} onClick={this.toogleShow}>
                    <div className="button-arrow">
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.143544 0.855934C0.0514841 0.760955 -2.77079e-08 0.633882 -2.19261e-08 0.50161C-1.61443e-08 0.369338 0.0514841 0.242245 0.143544 0.147266C0.188898 0.10066 0.243139 0.0636164 0.30305 0.0383214C0.362961 0.0130264 0.42735 -5.05857e-07 0.492382 -5.03014e-07C0.557414 -5.00171e-07 0.621763 0.0130264 0.681674 0.0383214C0.741585 0.0636164 0.795826 0.10066 0.841181 0.147266L6.09126 5.47944L11.1596 0.148891C11.2047 0.10246 11.2587 0.0655652 11.3183 0.0403617C11.378 0.0151583 11.442 0.00215868 11.5068 0.00215868C11.5715 0.00215868 11.6356 0.0151583 11.6952 0.0403618C11.7549 0.0655652 11.8089 0.10246 11.854 0.148891C11.9475 0.243103 12 0.370484 12 0.503235C12 0.635986 11.9475 0.763347 11.854 0.857559L6.09126 6.81563L0.143544 0.855934Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
                <div className={'options-relative '+(!this.state.show ? 'hide':'')}>
                    <div className="options" onClick={this.toogleShow}>
                        {this.props.options.map(function(val, key){
                            return (<div key={key} className="option" onClick={val.onClick}>{val.name}</div>);
                        })}
                    </div>
                </div>
            </div>
       );
    }
}
Dropdown.propTypes = {
    options: PropTypes.any.isRequired
}