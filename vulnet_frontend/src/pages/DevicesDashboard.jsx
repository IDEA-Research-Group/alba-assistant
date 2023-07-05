import { useEffect, useState } from "react";
import { getNdevNvuln,getAllDevices, getNSeveritySummaryList, getNSeveritySummary, getWeightedAverage } from "../api/devices.api";
import BubbleChart from './react-bubble-chart-d3';
import ReactApexChart from 'react-apexcharts'

export function DevicesDashboard() {
    const [devices, setDevices] = useState([]);
    const [devices_list, setDeviceModel] = useState([]);
    const [vuln_list, setVuln] = useState([]);
    const [ndevnvuln, setNdevNvuln] = useState([]);
    const [nvuln, setNvulns] = useState([]);
    const [ndev, setNdev] = useState([]);
    const [severity_summary_list, setNSeveritySummaryList] = useState([]);
    const [severity_summary, setNSeveritySummary] = useState([]);
    const [weighted_average, setWeightedAverage] = useState([]);
    const low_per = Math.round(severity_summary["low"]/severity_summary["total"]*100);

    useEffect(() => {
      async function loadDevices() {
        const res = await getAllDevices();
        setDevices(res.data);
        const values = res.data.map(device => device.model);
        setDeviceModel(values);
        const vulns = res.data.map(device => device.vulnerabilities);
        setVuln(vulns);
        
      }
      loadDevices();
    }, []);


    useEffect(() => {
      async function loadWeightedAverage() {
        const res = await getWeightedAverage();
        setWeightedAverage(res.data);
      }
      loadWeightedAverage();
    }, []);

    useEffect(() => {
        async function loadNDevicesNvuln() {
          const res = await getNdevNvuln();
          setNdevNvuln(res.data);
          setNvulns(res.data["nvuln"]);
          setNdev(res.data["ndev"]);
        }
        loadNDevicesNvuln();
      }, []);

    useEffect(() => {
      async function loadNSeveritySummaryList() {
        const res = await getNSeveritySummaryList();
        setNSeveritySummaryList(res.data);
      }
      loadNSeveritySummaryList();
    }, []);

    useEffect(() => {
      async function loadNSeveritySummary() {
        const res = await getNSeveritySummary();
        setNSeveritySummary(res.data);
      }
      loadNSeveritySummary();
    }, []); 

    const bubbleClick = (label) => {
        console.log("Custom bubble click func")
    }

    const legendClick = (label) => {
        console.log("Customer legend click func")
    }

    var data_array = [];
    var vuln_array = [];
    for (var i = 0; i < vuln_list.length; i++) {
        var size = vuln_list[i].length
        vuln_array.push(size)
    }
    for (var i = 0; i < devices_list.length; i++) {
        var color="#04e393";
        console.log(vuln_array[i])
        if(vuln_array[i]>=10){
            color="#edb747"
        }
        if(vuln_array[i]>=20){
            color="#fa4363"
        }
        if(vuln_array[i]>=50){
            color="#735cd3"
        }
        data_array.push({
        label: devices_list[i],
        value: vuln_array[i], 
        color: color 
      });
    }

      const data = {
            
        series: [{
          name: 'NONE',
          data: severity_summary_list["none"]
        }, {
          name: 'LOW',
          data: severity_summary_list["low"]
        }, {
          name: 'MEDIUM',
          data: severity_summary_list["medium"]
        }, {
          name: 'HIGH',
          data: severity_summary_list["high"]
        }, {
          name: 'CRITICAL',
          data: severity_summary_list["critical"]
        }],
        options: {
          chart: {
            background: '#202020',
            foreColor: '#fff',
            type: 'bar',
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                total: {
                  enabled: true,
                  offsetX: 0,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900,
                    color: "#fff"
                  }
                }
              }
            },
          },
          stroke: {
            width: 1,
            colors: ['#000']
          },
          title: {
            text: 'Vulnerabilities Severity'
          },
          xaxis: {
            categories: devices_list,
            labels: {
              formatter: function (val) {
                return val
              }
            }
          },
          yaxis: {
            title: {
              text: undefined
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          },
          theme: {
            mode: 'dark', 
            palette: 'palette1', 
            
          }
        },
        
      };
      const data_radial_low = {
          
        series: [Math.round(severity_summary["low"]/severity_summary["total"]*100)],
        options: {
          chart: {
            foreColor: '#fff',
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
            
          },
          title:{
            text:severity_summary["low"]+ " LOW",
            align: 'center',
            floating:true,
            
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#706f70",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#212121',
                  opacity: 0.5,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            colors:"#04e393",
            type: 'solid',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Average Results'],
        },
      
      
      };
      const data_radial_medium = {

        series: [Math.round(severity_summary["medium"]/severity_summary["total"]*100)],
        options: {
          chart: {
            foreColor: '#fff',
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
          },
          title:{
            text:severity_summary["medium"] + " MEDIUM",
            align: 'center',
            floating:true,
            
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#706f70",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#212121',
                  opacity: 0.5,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            colors:"#edb747",
            type: 'solid',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Average Results'],
        },
      
      
      };
      const data_radial_high = {
          
        series: [Math.round(severity_summary["high"]/severity_summary["total"]*100)],
        options: {
          chart: {
            type: 'radialBar',
            foreColor: '#fff',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
          },
          title:{
            text:severity_summary["high"]+" HIGH",
            align: 'center',
            floating:true,
            
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#706f70",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#212121',
                  opacity: 0.5,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            colors:"#fa4363",
            type: 'solid',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Average Results'],
        },
      
      
      };
      const data_radial_critical = {
          
        series: [Math.round(severity_summary["critical"]/severity_summary["total"]*100)],
        options: {
          chart: {
            foreColor: '#fff',
            type: 'radialBar',
            offsetY: -20,
            sparkline: {
              enabled: true
            }
            
          },
          title:{
            text:severity_summary["critical"]+ " CRITICAL",
            align: 'center',
            floating:true,
            
          },
          plotOptions: {
            radialBar: {
              startAngle: -90,
              endAngle: 90,
              track: {
                background: "#706f70",
                strokeWidth: '97%',
                margin: 5, // margin is in pixels
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#212121',
                  opacity: 0.5,
                  blur: 2
                }
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: -2,
                  fontSize: '22px'
                }
              }
            }
          },
          grid: {
            padding: {
              top: -10
            }
          },
          fill: {
            colors:"#735cd3",
            type: 'solid',
            gradient: {
              shade: 'light',
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 53, 91]
            },
          },
          labels: ['Average Results'],
        },
      
      };
      
    
    
    
    return(
        <>
        <div className="chart-row">
          <div className="chart-container-wrapper">
            <div className="chart-container">
              <div className="chart-info-wrapper">
                <h2> Nº Devices</h2>
                <span>{ndev}</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-2">
              <div className="chart-info-wrapper">
                <h2>nº Vulnerable</h2>
                <span>{nvuln}</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-3">
              <div className="chart-info-wrapper">
                <h2>nº Vulnerabilities</h2>
                <span>{severity_summary["total"]}</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-4">
              <div className="chart-info-wrapper">
                <h2>Average</h2>
                <span>{Math.round(weighted_average.WeightedAverage  * 100) / 100}</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-5">
              <div className="chart-info-wrapper">
                <h2>Risk</h2>
                <span>X</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-6">
              <div className="chart-info-wrapper">
                <h2>Sustainability</h2>
                <span>X</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart">
         <ReactApexChart options={data.options} series={data.series} type="bar" height={500} width={1000} />
        </div>

          <div className="chart_radial_low">
          <ReactApexChart options={data_radial_low.options} series={data_radial_low.series} type="radialBar" height={250} width={250}/>
          </div>
          <div className="chart_radial_medium">
          <ReactApexChart options={data_radial_medium.options} series={data_radial_medium.series} type="radialBar" height={250} width={250}/>
          </div>
          <div className="chart_radial_high">
          <ReactApexChart options={data_radial_high.options} series={data_radial_high.series} type="radialBar" height={250} width={250}/>
          </div>
          <div className="chart_radial_critical">
          <ReactApexChart options={data_radial_critical.options} series={data_radial_critical.series} type="radialBar" height={250} width={250}/>
          </div>
            <BubbleChart
                graph={{
                    zoom: 1,
                    offsetX: 0.00,
                    offsetY: 0.00
                }}
                width={570}
                height={570}
                padding={0}
                showLegend={false}
                valueFont={{
                    family: 'Arial',
                    size: 12,
                    color: '#fff',
                    weight: 'bold',
                }}
                labelFont={{
                    family: 'Arial',
                    size: 16,
                    color: '#fff',
                    weight: 'bold',
                }}
                bubbleClickFunc={bubbleClick}
                legendClickFun={legendClick}
                data={data_array} /></>
        
        )
    }