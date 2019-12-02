import React from 'react'
import { LoggedUserMask } from '../components/LoggedUserMask';
import { ContentBlock } from '../components/ContentBlock';
import { InformationBoxContainer } from '../components/InformationBoxContainer';
import { InformationBox } from '../components/InformationBox';
import { TextInput } from '../components/TextInput';
import { Modal } from '../components/Modal';
import { Api } from '../functions/Api';
import Chart from 'chart.js';

class Dashboard extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      parametersModalState: 0,
      devices: [],
      selectedDevice: 0,
      deviceConnected: 0,
      phAc: 0,
      phProm: 0,
      phReq: 0,
      ceAc: 0,
      ceProm: 0,
      ceReq: 0,
      tempAc: 0,
      tempReq: 0,
      luxAc: 0,
      luxProm: 0,
      waterLevelAc: 0,
      waterLevelProm: 0,
      waterLevelReq: 0,
      charts: {}
    }
    this.handleParametersModalCloseBtnClick = this.handleParametersModalCloseBtnClick.bind(this);
    this.handleParametersModalOpenBtnClick = this.handleParametersModalOpenBtnClick.bind(this);
    this.handleDevicesSelectChange = this.handleDevicesSelectChange.bind(this);
    this.initCharts = this.initCharts.bind(this);
    this.updateCharts = this.updateCharts.bind(this);
    this.dashboardUpdate = this.dashboardUpdate.bind(this);
  }

  handleParametersModalCloseBtnClick(){
    this.setState({parametersModalState: 0});
  }

  handleParametersModalOpenBtnClick(){
    this.setState({parametersModalState: 2});
  }

  handleDevicesSelectChange(){
    console.log("jeje");
  }


  componentDidMount(){
    Api.get('devices', (qRes) => {
      let selectedDevice = null;
      if(qRes.devices.length > 0){
        selectedDevice = qRes.devices[0].id;
        this.setState({selectedDevice, devices: qRes.devices});

        Api.get('dashboard/devices/'+selectedDevice, (qRes) => {
          this.setState(
            {deviceConnected: qRes.dashboard.deviceConnected, 
            phAc:qRes.dashboard.ph.actual, phProm: qRes.dashboard.ph.prom, phReq:qRes.dashboard.ph.required,
            ceAc:qRes.dashboard.ce.actual, ceProm: qRes.dashboard.ce.prom, ceReq:qRes.dashboard.ph.required,
            tempAc:qRes.dashboard.temp.actual, tempProm: qRes.dashboard.temp.prom,
            luxAc:qRes.dashboard.lux.actual, luxProm: qRes.dashboard.lux.prom,
            waterLevelAc:qRes.dashboard.waterLevel.actual, waterLevelProm: qRes.dashboard.waterLevel.prom, waterLevelReq:qRes.dashboard.waterLevel.required
            });
            this.initCharts();
            this.updateCharts(qRes.dashboard.ph.history, qRes.dashboard.ce.history, qRes.dashboard.temp.history, qRes.dashboard.lux.history, qRes.dashboard.waterLevel.history);
            this.dashboardUpdate();
        });
      }
    });
  }
  dashboardUpdate(){
    let timer = (() => {setTimeout(()=>{
      Api.get('dashboard/devices/'+this.state.selectedDevice, (qRes) => {
        this.setState(
          {deviceConnected: qRes.dashboard.deviceConnected, 
          phAc:qRes.dashboard.ph.actual, phProm: qRes.dashboard.ph.prom, phReq:qRes.dashboard.ph.required,
          ceAc:qRes.dashboard.ce.actual, ceProm: qRes.dashboard.ce.prom, ceReq:qRes.dashboard.ph.required,
          tempAc:qRes.dashboard.temp.actual, tempProm: qRes.dashboard.temp.prom,
          luxAc:qRes.dashboard.lux.actual, luxProm: qRes.dashboard.lux.prom,
          waterLevelAc:qRes.dashboard.waterLevel.actual, waterLevelProm: qRes.dashboard.waterLevel.prom, waterLevelReq:qRes.dashboard.waterLevel.required
          });
          this.updateCharts(qRes.dashboard.ph.history, qRes.dashboard.ce.history, qRes.dashboard.temp.history, qRes.dashboard.lux.history, qRes.dashboard.waterLevel.history);
          timer();
      });
    }, 1000);});
    timer();
  }

  initCharts(){
    let chartsData = [
      {stateName: 'phChart', graphId: "phChart", xAxisName: "Time", yAxisName: "Ph"},
      {stateName: 'ceChart', graphId: "ceChart", xAxisName: "Time", yAxisName: "Ce"},
      {stateName: 'tempChart', graphId: "tempChart", xAxisName: "Time", yAxisName: "Temperature"},
      {stateName: 'luxChart', graphId: "luxChart", xAxisName: "Time", yAxisName: "Lux"},
      {stateName: 'waterLevelChart', graphId: "waterLevelChart", xAxisName: "Time", yAxisName: "Water Level"}
    ];
    let chartsState = {};
    for(let chartData of chartsData){
      let chartElement = document.getElementById(chartData['graphId']).getContext('2d');
      let chart = new Chart(chartElement, {
          type: 'line',
          data: {
              labels: [],
              datasets: [{
                  label: chartData['yAxisName'],
                  backgroundColor: 'rgb(133,152,47)',
                  borderColor: 'rgb(133,152,47)',
                  data: [],
                  fill: false,
              }]
          },
          options: {
              legend: {
                display: false
              },
              responsive: true,
              maintainAspectRatio: false,
              title: {
                  display: false
              },
              tooltips: {
                  mode: 'index',
                  intersect: false,
              },
              hover: {
                  mode: 'nearest',
                  intersect: true
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                        display:false
                      },
                      scaleLabel: {
                          display: true,
                          labelString: chartData['xAxisName']
                      }
                  }],
                  yAxes: [{
                      gridLines: {
                        display:false
                      },
                      scaleLabel: {
                          display: true,
                          labelString: chartData['yAxisName']
                      }
                  }]
              }
          }
      });
      chartsState[chartData['stateName']] = chart;
    }
    this.setState({charts: chartsState});
  }

  updateCharts(ph, ce, temp, lux, waterLevel){
    let labels = [];
    let phData = [];
    let ceData = [];
    let tempData = [];
    let luxData = [];
    let waterLevelData = [];
    for(let i = 0; i < ph.length; i++){
      labels.push(ph[i].time.substring(11, 16));
      phData.push(ph[i].value);
      ceData.push(ce[i].value);
      tempData.push(temp[i].value);
      luxData.push(lux[i].value);
      waterLevelData.push(waterLevel[i].value);
    }
    this.state.charts.phChart.data.labels = labels;
    this.state.charts.phChart.data.datasets[0].data = phData;
    this.state.charts.phChart.update();
    this.state.charts.ceChart.data.labels = labels;
    this.state.charts.ceChart.data.datasets[0].data = ceData;
    this.state.charts.ceChart.update();
    this.state.charts.tempChart.data.labels = labels;
    this.state.charts.tempChart.data.datasets[0].data = tempData;
    this.state.charts.tempChart.update();
    this.state.charts.luxChart.data.labels = labels;
    this.state.charts.luxChart.data.datasets[0].data = luxData;
    this.state.charts.luxChart.update();
    this.state.charts.waterLevelChart.data.labels = labels;
    this.state.charts.waterLevelChart.data.datasets[0].data = waterLevelData;
    this.state.charts.waterLevelChart.update();
  }

  render(){
    return(
      <div>
          <style jsx>{`
              .chart{
                position: relative;
                height: 200px;
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
              .modalContainer{
                padding: 0px 20px 20px 20px;
              }
              .modalContainer > .row:nth-last-child(n+2){
                margin-bottom: 10px;
              }
              .footer{
                display: flex;
                justify-content: flex-end;
                padding: 10px 0 20px 0;
                margin: 0 20px;
                border-top: 1px solid #e8e8e8;
              }
          `}</style>
      <LoggedUserMask showHeaderDevices={true} devices={this.state.devices} selectedDevice={this.state.selectedDevice} onDevicesSelectChange={this.handleDevicesSelectChange} deviceConnected={this.state.deviceConnected} pageTitle="Dashboard - Hydroconnect">
        <Modal title="Parametros de configuración" state={this.state.parametersModalState} showHeader={true} showFooter={true} onCloseClick={this.handleParametersModalCloseBtnClick}>
          <div className="modalContainer">
              <div className="row">
                <TextInput name="phRequeridoInput" placeholder="PH Requerido"/>
              </div>
              <div className="row">
                <TextInput name="ceRequeridoInput" placeholder="CE Requerido"/>
              </div>
              <div className="row">
                <TextInput name="waterLevelRequeridoInput" placeholder="Nivel de Agua Requerido"/>
              </div>
          </div>
          <div className="footer">
            <div className="grayBtn">Guardar configuración</div>
          </div>
        </Modal>
        <div className="buttonsMenu">
          <div className="grayBtn" onClick={this.handleParametersModalOpenBtnClick}>Configurar parametros</div>
        </div>
         <ContentBlock title="PH">
            <InformationBoxContainer>
              <InformationBox title="Actual" value={this.state.phAc}/>
              <InformationBox title="Promedio diario" value={this.state.phProm}/>
              <InformationBox title="Requerido" value={this.state.phReq}/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="phChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="CE">
            <InformationBoxContainer>
              <InformationBox title="Actual" value={this.state.ceAc}/>
              <InformationBox title="Promedio diario" value={this.state.ceProm}/>
              <InformationBox title="Requerido" value={this.state.ceReq}/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="ceChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="Nivel de agua">
            <InformationBoxContainer>
              <InformationBox title="Actual" value={this.state.waterLevelAc}/>
              <InformationBox title="Promedio diario" value={this.state.waterLevelProm}/>
              <InformationBox title="Requerido" value={this.state.waterLevelReq}/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="waterLevelChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="Temperatura">
            <InformationBoxContainer>
              <InformationBox title="Actual" value={this.state.tempAc}/>
              <InformationBox title="Promedio diario" value={this.state.tempProm}/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="tempChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="Luz">
            <InformationBoxContainer>
              <InformationBox title="Actual" value={this.state.luxAc}/>
              <InformationBox title="Promedio diario" value={this.state.luxProm}/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="luxChart"></canvas>
            </div>
          </ContentBlock>
      </LoggedUserMask>
      </div>
    );
  }
}
export default Dashboard;
