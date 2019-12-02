import React from 'react';
import { Api } from '../functions/Api';
import { LoggedUserMask } from '../components/LoggedUserMask';
import { ContentBlock } from '../components/ContentBlock'; 
import { Modal } from '../components/Modal';
import { TextInput } from '../components/TextInput';
import { Dropdown } from '../components/Dropdown';
import io from 'socket.io-client';

class Dispositivos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            vincularStep1ModalState: 0, 
            vincularStep2ModalState: 0, 
            vincularSuccessModal: 0,
            vincularErrorModal: 0,
            vincularErrorDuplicadoModal: 0,
            token: "",
            inputs: {
                idDispositivoInput: "",
                nombreDispositivoInput: ""
            },
            devices: [] 
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVincularButtonClick = this.handleVincularButtonClick.bind(this);
        this.handleVincularModalStep1NextButtonClick = this.handleVincularModalStep1NextButtonClick.bind(this);
        this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
        this.handleEliminarDispositivoClick = this.handleEliminarDispositivoClick.bind(this);
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        this.setState({token});
        Api.get('devices', (qRes) => {
            this.setState({devices: qRes.devices});
        });
    }

    handleInputChange(name, value){
        let inputs = JSON.parse(JSON.stringify(this.state.inputs));
        inputs[name] = value;
        this.setState({inputs});
    }

    handleVincularButtonClick(){
        let inputs = JSON.parse(JSON.stringify(this.state.inputs));
        inputs.idDispositivoInput = "";
        inputs.nombreDispositivoInput = "";
        this.setState({
            inputs,
            vincularStep1ModalState: 2,
        });
    }

    handleVincularModalStep1NextButtonClick(){
        let superThis = this;
        this.setState({
            vincularStep1ModalState: 0,
            vincularStep2ModalState: 2 

        });
        let socket = io('http://localhost:4200');
        let json = JSON.stringify({token: this.state.token, deviceId: this.state.inputs.idDispositivoInput, name: this.state.inputs.nombreDispositivoInput});
        socket.emit('syncrequest', json);
        socket.on('syncresponse', function(message){
            let json = JSON.parse(message);
            if(json.token == superThis.state.token && json.deviceId == superThis.state.inputs.idDispositivoInput){
                if(json.sync == 0){
                    superThis.setState({vincularStep2ModalState: 0, vincularErrorModal: 2});
                }else if(json.sync == 1){
                    superThis.setState({vincularStep2ModalState: 0, vincularSuccessModal: 2});
                    Api.get('devices', (qRes) => {
                        superThis.setState({devices: qRes.devices});
                    });
                }else if(json.sync == 2){
                    superThis.setState({vincularStep2ModalState: 0, vincularErrorDuplicadoModal: 2});
                }
            }
        });
    }

    handleCloseModalClick(modal){
        let json = JSON.parse(JSON.stringify(this.state));
        json[modal] = 0;
        this.setState(json);
    }

    handleEliminarDispositivoClick(deviceId){
        Api.delete('devices/'+deviceId, (qRes) => {
            Api.get('devices', (qRes) => {
                this.setState({devices: qRes.devices});
            });
        });
    }

    render(){
        return (
            <LoggedUserMask showHeaderDevices={false} pageTitle="Dispositivos - Hydroconnect">
                <style jsx>{`
                    .buttonsMenu{
                        margin-bottom: 5px;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .button{
                        padding: 10px 15px;
                        display: inline-block;
                        background-color: #4b5b63;
                        color: #ececec;
                        font-size: 14px;
                        font-weight: 300;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                    .buttonsMenu{
                        display: flex;
                        justify-content: flex-end;
                    }
                    .grayBtn{
                        font-size: 14px;
                        padding: 10px;
                        background-color: #607D8B;
                        color: #fff;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                    .grayBtn:hover{
                        background-color: #466371;
                    }
                    .button:hover{
                        background-color: #6e7f88;
                    }
                    .button > i{
                        margin-right: 5px;
                    }

                    .device:nth-last-child(n+2){
                        margin-bottom: 5px;
                    }
                    .device{
                        display: flex;
                        padding: 20px;
                        border: 1px solid #eaeaea;
                        border-radius: 5px;
                    }
                    .device > .name{
                        align-items: center;
                        display: flex;
                    }
                    .device > .name{
                        font-size: 16px;
                        width: 30%
                    }
                    .device > .name > .statusDot{

                        font-size: 12px;
                        margin-right: 10px;
                    }
                    .device > .name > .statusDot.online{
                        color: #4CAF50;
                    }
                    .device > .name > .statusDot.offline{
                        color: #F44336;
                    }
                    .device > .address{
                        flex: 1;
                    }
                    .device > .options{
                    }
                    .device > .options > i{
                        color: #4b5b63;
                        cursor: pointer;
                    }
                    
                    .modalContainer > .instructions{
                        margin-bottom: 10px;
                        font-size: 15px;
                    }
                    .modalContainer > .instructionsCentered{
                        margin-bottom: 10px;
                        font-size: 15px;
                        text-align: center;
                    }
                    .modalContainer{
                        padding: 0px 20px 20px 20px;
                    }
                    .modalContainer > .row:nth-last-child(n+2){
                        margin-bottom: 10px;
                    }
                    .modalContainer .icon{
                        text-align: center;
                    }
                    .modalContainer .icon i{
                        font-size: 40px;
                        margin: 20px 0;
                    }
                    .modalContainer .icon.green i{
                        color: #85982f;
                    }
                    .modalContainer .icon.red i{
                        color: #F44336;
                    }
                    .footer{
                        display: flex;
                        justify-content: flex-end;
                        padding: 10px 0 20px 0;
                        margin: 0 20px;
                        border-top: 1px solid #e8e8e8;
                    }
                `}</style>
                <Modal state={this.state.vincularStep1ModalState} title="Vincular dispositivo" showHeader={true} onCloseClick={() => {this.handleCloseModalClick('vincularStep1ModalState')}}>
                    <div className="modalContainer">
                        <div className="instructions">Para iniciar la vinculación es necesario que ingrese el número identificador del dispositivo que desea vincular.</div>
                        <div className="row">
                            <TextInput name="idDispositivoInput" placeholder="Id del dispositivo" width="250px" onChange={this.handleInputChange} value={this.state.inputs.idDispositivoInput}/>
                        </div>
                        <div className="row">
                            <TextInput name="nombreDispositivoInput" placeholder="Nombre del dispositivo" width="250px" onChange={this.handleInputChange} value={this.state.inputs.nombreDispositivoInput}/>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="grayBtn" onClick={this.handleVincularModalStep1NextButtonClick}>Siguiente</div>
                    </div>
                </Modal>
                <Modal state={this.state.vincularStep2ModalState} title="Vincular dispositivo" showHeader={true} showClose={false}>
                    <div className="modalContainer">
                        <div className="instructionsCentered">Presione el bóton de vincular en su dispositivo</div>
                        <div className="instructionsCentered">Buscando dispositivo</div>
                        <div className="icon green">
                            <i className="fa fa-circle-notch fa-spin"></i>
                        </div>
                    </div>
                </Modal>
                <Modal state={this.state.vincularSuccessModal} title="Vincular dispositivo" showHeader={true} showFooter={false} onCloseClick={() => {this.handleCloseModalClick('vincularSuccessModal')}}>
                    <div className="modalContainer">
                        <div className="instructionsCentered">El dispositivo se ha vinculado exitosamente!</div>
                        <div className="icon green">
                            <i className="fa fa-check-circle"></i>
                        </div>
                    </div>
                </Modal>
                <Modal state={this.state.vincularErrorModal} title="Vincular dispositivo" showHeader={true} showFooter={false} showHeader={true} showFooter={false} onCloseClick={() => {this.handleCloseModalClick('vincularErrorModal')}}>
                    <div className="modalContainer">
                        <div className="instructionsCentered">No se encontro el dispositivo.</div>
                        <div className="icon red">
                            <i className="fa fa-times-circle"></i>
                        </div>
                    </div>
                </Modal>
                <Modal state={this.state.vincularErrorDuplicadoModal} title="Vincular dispositivo" showHeader={true} showFooter={false} showHeader={true} showFooter={false} onCloseClick={() => {this.handleCloseModalClick('vincularErrorDuplicadoModal')}}>
                    <div className="modalContainer">
                        <div className="instructionsCentered">El dispositivo ya se encuentra vinculado en esta cuenta.</div>
                        <div className="icon red">
                            <i className="fa fa-times-circle"></i>
                        </div>
                    </div>
                </Modal>
                <div className="buttonsMenu">
                    <div className="grayBtn" onClick={this.handleVincularButtonClick}>Vincular dispositivo</div>
                </div>
                <ContentBlock title="Dispositivos">
                    {this.state.devices.map((e, i)=>{
                        return (<div key={i} className="device">
                            <div className="name">
                                <i className={"statusDot fa fa-circle "+(e.connected == 0 ? 'offline' : 'online')}></i>
                                <div className="title">{e.name}</div>
                            </div>
                            <div className="address">ID: {e.deviceId}</div>
                            <Dropdown options={[{name: "Eliminar", onClick: ()=>{this.handleEliminarDispositivoClick(e.id)}}]}></Dropdown>
                        </div>);
                    })}
                </ContentBlock>
            </LoggedUserMask>
        );
    }
}

export default Dispositivos;