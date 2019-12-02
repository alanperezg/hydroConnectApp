import React from 'react';
import PropTypes from 'prop-types';

export class PasswordInput extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleChange(event){
        if(this.props.onChange != undefined){
            this.props.onChange(this.props.name, event.target.value);
        }
    }

    handleFocus(){
        if(this.props.onFocus != undefined){
            this.props.onFocus(this.props.name);
        }
    }

    render(){
        return (
            <div className="input" attr-disabled={(this.props.disabled ? "true" : "false")} attr-validated={(this.props.validated ? "true" : "false")}>
                <style jsx>{`
                    .input{
                        position: relative;
                        width: ${this.props.width};
                        min-width: ${this.props.width};
                        margin: ${this.props.margin};
                    }
                    .input input{
                        box-sizing: border-box;
                        width: 100%;
                        font-size: 14px;
                        padding-top: 18px;
                        padding-bottom: 4px;
                        padding-left: 10px;
                        color: #4b5b63;
                        background-color: #fff;
                        font-weight: 400;
                        border: 0.5px solid #DFE2E6;
                        border-radius: 5px;
                        transition: all .15s ease;
                    }
                    .input[attr-validated="false"] input{
                        border: 0.5px solid #F44336;
                    }
                    .input[attr-validated="false"] label{
                        color: #F44336;
                    }
                    .input[attr-validated="false"] .validatationMessage{
                        color: #F44336;
                        font-size: 12px;
                        font-weight:bold;
                        margin-top: 2px;
                    }
                    .input input:focus{
                        outline:0; 
                    }
                    .input input:focus + .label, .input input:not(:placeholder-shown) + .label{
                        font-size: 12px;
                        font-weight: bold;
                        position: absolute;
                        left: 12px;
                        top: 5px;
                        transition: all .15s ease
                    }
                    .label{
                        font-size: 12px;
                        color: #4b5b63;
                        position: absolute;
                        left: 12px;
                        top: 14px;
                        cursor: text;
                        text-transform: uppercase;
                    }
                    .input[attr-disabled="true"] .label{
                        color: #d0d0d0;
                    }
                    .input[attr-disabled="true"] input{
                        color: #d0d0d0;
                    }
                `}</style>
                <input type="password" id={'passwordInput-'+this.props.name} name={this.props.name} placeholder=" " value={this.props.value} onChange={this.handleChange} onFocus={this.handleFocus} disabled={(this.props.disabled ? true : null)}/>
                <label className="label" htmlFor={'passwordInput-'+this.props.name}>{this.props.placeholder}</label>
                <div className="validatationMessage">{this.props.validationMessage}</div>
            </div>
        );
    }
}
PasswordInput.defaultProps = {width: '200px', margin:"0 30px 0 0", disabled:false, validated: true, validationMessage:""}
PasswordInput.propTypes = {
    width: PropTypes.string.isRequired,
    margin: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    validated: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
}