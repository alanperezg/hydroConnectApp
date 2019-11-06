import React from 'react'
import { LoggedUserMask } from '../components/LoggedUserMask';
import { ContentBlock } from '../components/ContentBlock';
import { InformationBoxContainer } from '../components/InformationBoxContainer';
import { InformationBox } from '../components/InformationBox';
class Dashboard extends React.Component{
  componentDidMount(){
    var phChart = document.getElementById('phChart').getContext('2d');
    new Chart(phChart, {
        type: 'line',
        data: {
            labels: ["20:08:10", "20:08:15", "20:08:20", "20:08:25", "20:08:30"],
            datasets: [{
                label: 'Ph',
                backgroundColor: 'rgb(133,152,47)',
                borderColor: 'rgb(133,152,47)',
                data: [5.6, 5.5, 5.6, 5.4, 5.5],
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
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    gridLines: {
                      display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'PH'
                    }
                }]
            }
        }
    });
    var ceChart = document.getElementById('ceChart').getContext('2d');
    new Chart(ceChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ph',
                backgroundColor: 'rgb(0,150,136)',
                borderColor: 'rgb(0,150,136)',
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
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    gridLines: {
                      display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'PH'
                    }
                }]
            }
        }
    });
    var tempChart = document.getElementById('tempChart').getContext('2d');
    new Chart(tempChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ph',
                backgroundColor: 'rgb(0,150,136)',
                borderColor: 'rgb(0,150,136)',
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
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    gridLines: {
                      display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'PH'
                    }
                }]
            }
        }
    });
    var lightChart = document.getElementById('lightChart').getContext('2d');
    new Chart(lightChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ph',
                backgroundColor: 'rgb(0,150,136)',
                borderColor: 'rgb(0,150,136)',
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
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    gridLines: {
                      display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'PH'
                    }
                }]
            }
        }
    });
    var waterChart = document.getElementById('waterChart').getContext('2d');
    new Chart(waterChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ph',
                backgroundColor: 'rgb(0,150,136)',
                borderColor: 'rgb(0,150,136)',
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
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    gridLines: {
                      display:false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'PH'
                    }
                }]
            }
        }
    });
  }
  render(){
    return(
      <div>
          <style jsx>{`
              .chart{
                position: relative;
                height: 200px;
              }
          `}</style>
      <LoggedUserMask showHeaderDevices={true}>
         <ContentBlock title="PH">
            <InformationBoxContainer>
              <InformationBox title="Actual" value="6.8"/>
              <InformationBox title="Promedio diario" value="6.7"/>
              <InformationBox title="Requerido" value="6.7"/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="phChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="CE">
            <InformationBoxContainer>
              <InformationBox title="Actual" value="6.8"/>
              <InformationBox title="Promedio diario" value="6.7"/>
              <InformationBox title="Requerido" value="6.7"/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="ceChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="Temperatura">
            <InformationBoxContainer>
              <InformationBox title="Actual" value="6.8"/>
              <InformationBox title="Promedio diario" value="6.7"/>
              <InformationBox title="Requerido" value="6.7"/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="tempChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="Luz">
            <InformationBoxContainer>
              <InformationBox title="Actual" value="6.8"/>
              <InformationBox title="Promedio diario" value="6.7"/>
              <InformationBox title="Requerido" value="6.7"/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="lightChart"></canvas>
            </div>
          </ContentBlock>
          <ContentBlock title="Nivel de agua">
            <InformationBoxContainer>
              <InformationBox title="Actual" value="6.8"/>
              <InformationBox title="Promedio diario" value="6.7"/>
              <InformationBox title="Requerido" value="6.7"/>
            </InformationBoxContainer>
            <div className="chart">
              <canvas id="waterChart"></canvas>
            </div>
          </ContentBlock>
      </LoggedUserMask>
      </div>
    );
  }
}
export default Dashboard;
