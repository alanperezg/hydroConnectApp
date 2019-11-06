import React from 'react';
import { LoggedUserMask } from '../components/LoggedUserMask';
import { ContentBlock } from '../components/ContentBlock'; 
import { Modal } from '../components/Modal';
import { TextInput } from '../components/TextInput';
import { Dropdown } from '../components/Dropdown';

class Dispositivos extends React.Component{
    render(){
        return (
            <LoggedUserMask showHeaderDevices={false}>
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
                    .modal > .instructions{
                        margin-bottom: 10px;
                        font-size: 15px;
                    }
                    .modal3, .modal4{
                        text-align:center;
                        padding-bottom: 30px;
                    }
                    .modal3 i{
                        font-size: 30px;
                        color: #85982f;
                    }
                `}</style>
                <Modal state={0} title="Vincular dispositivo" showHeader={true} showFooter={true}>
                    <div className="modal modal1">
                        <div className="instructions">Para iniciar la vinculación es necesario que ingrese el número identificador del dispositivo que desea vincular.</div>
                        <TextInput name="deviceId" placeholder="Id del dispositivo" width="250px"></TextInput>
                    </div>
                </Modal>
                <Modal state={0} title="Vincular dispositivo" showHeader={true} showFooter={true}>
                    <div className="modal modal2">
                        <div className="instructions">Presione el boton de vinculación ubicado en su dispositivo. Espere a que un indicador verde encida en el dispositivo y de click en continuar.</div>
                    </div>
                </Modal>
                <Modal state={0} title="Vincular dispositivo" showHeader={true} showFooter={false}>
                    <div className="modal modal3">
                        <div className="instructions">Buscando dispositivo</div>
                        <i className="fa fa-circle-notch fa-spin"></i>
                    </div>
                </Modal>
                <Modal state={0} title="Vincular dispositivo" showHeader={true} showFooter={false}>
                    <div className="modal modal4">
                        <div className="instructions">El dispositivo se ha vinculado exitosamente!</div>
                    </div>
                </Modal>
                <ContentBlock title="Dispositivos">
                    <div className="device">
                        <div className="name">
                            <i className="statusDot online fa fa-circle"></i>
                            <div className="title">Dispositivo 1</div>
                        </div>
                        <div className="address">ID: 14675612312312</div>
                        <Dropdown options={[{name: "Cambiar nombre", onClick: ()=>{}}, {name: "Eliminar", onClick: ()=>{}}]}></Dropdown>
                    </div>
                    <div className="device">
                        <div className="name">
                            <i className="statusDot offline fa fa-circle"></i>
                            <div className="title">Dispositivo 2</div>
                        </div>
                        <div className="address">ID: 14675612312312</div>
                        <Dropdown options={[{name: "Cambiar nombre", onClick: ()=>{}}, {name: "Eliminar", onClick: ()=>{}}]}></Dropdown>
                    </div>
                </ContentBlock>
            </LoggedUserMask>
        );
    }
}

export default Dispositivos;