import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from "react";
import { getVulnerabilities,getVulnerability,getDeviceWeightedAverage,getDeviceSustainability } from "../api/devices.api";
import BubbleChart from './react-bubble-chart-d3-vuln';
import ReactApexChart from 'react-apexcharts'

export function DeviceVulnerabilitiesDashboard() {
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [vulnerability, setVulnerability] = useState([]);
    const [device_weighted_average, setDeviceWeightedAverage] = useState([]);
    const [device_sustainability, setDeviceSustainability] = useState([]);

    useEffect(() => {
      async function loadDeviceSustainability() {
        const res = await getDeviceSustainability(params.id);
        setDeviceSustainability(res.data["DeviceSustainability"]);
      }
      loadDeviceSustainability();
    }, []);

    const params= useParams()

    useEffect(() => {
        async function loadVulnerabilities() {
          const res = await getVulnerabilities(params.id);
          setVulnerabilities(res.data);
        }
        loadVulnerabilities();
      }, []);

      useEffect(() => {
        async function loadDeviceWeightedAverage() {
          const res = await getDeviceWeightedAverage(params.id);
          setDeviceWeightedAverage(res.data);
        }
        loadDeviceWeightedAverage();
      }, []);

      useEffect(() => {
        async function loadVulnerability() {
          const res = await getVulnerability(params.vuln_id);
          setVulnerability(res.data);
        }
        loadVulnerability();
      }, []);

      const vulnerabilities_names = Object.keys(vulnerabilities)
      const vulnerabilities_descriptions={};
      const vulnerabilities_cvss_vuln={};
      const vulnerabilities_cvss=[]

      for (var i = 0; i < vulnerabilities_names.length; i++) {
        const vul_key = vulnerabilities_names[i];
        vulnerabilities_descriptions[vul_key]=vulnerabilities[vul_key].description
        vulnerabilities_cvss_vuln[vul_key]=vulnerabilities[vul_key].cvss
        vulnerabilities_cvss.push(vulnerabilities[vul_key].cvss)

      }


      var data_array = [];
      var vuln_array = [];
      for (var i = 0; i < vulnerabilities_names.length; i++) {
          var size = vulnerabilities_cvss[i]
          vuln_array.push(size)
      }
      for (var i = 0; i < vulnerabilities_names.length; i++) {
          var color="#fff";
          if(vuln_array[i]>=0.1 && vuln_array[i]<=3.9){
              color="#04e393"
          }
          if(vuln_array[i]>=4 && vuln_array[i]<=6.9){
              color="#edb747"
          }
          if(vuln_array[i]>=7 && vuln_array[i]<=8.9){
              color="#fa4363"
          }
          if(vuln_array[i]>=9 && vuln_array[i]<=10){
            color="#735cd3"
        }
          data_array.push({
          label: vulnerabilities_names[i],
          value: vuln_array[i], 
          color: color 
        });
        
      }


      var categories=[]
      if(vulnerability.vector_version==3){
        categories = ['AV', 'AC', 'PR', 'UI', 'C', 'I', 'A']
      }else{
        categories = ['AV', 'AC', 'AU', 'C', 'I', 'A']
      }


      
      const radar_data = {
          
        series: [{
          name: 'Series 1',
          data: vulnerability.numeric_vector,
        }],
        options: {
          chart: {
            height: 150,
            type: 'radar',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: true
          },
          plotOptions: {
            radar: {
              size: 120,
              polygons: {
                strokeColors: '#ccc',
                fill: {
                  colors: ["#fff", '#ccc']
                }
              }
            }
          },
          title: {
            text: ''
          },
          colors: ['#255aee'],
          markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#255aee',
            strokeWidth: 2,
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val
              }
            }
          },
          xaxis: {
            categories: categories
          },
          yaxis: {
            tickAmount: 5,
            labels: {
              formatter: function(val, i) {
                return val.toFixed(1);
              }
            }
          }
        },
      };
    

      return (
        <>
        <div className='rounded-lg font-semibold bg-zinc-800 shadow h-12 w-96 device_title'>
              <a>{params.id}</a>
        </div>
        <div className="chart-row">
          <div className="chart-container-wrapper">
            <div className="chart-container-1-device">
              <div className="chart-info-wrapper">
                <h2>Average</h2>
                <span>{Math.round(device_weighted_average.DeviceWeightedAverage  * 100) / 100}</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-2-device">
              <div className="chart-info-wrapper">
                <h2>Risk</h2>
                <span>X</span>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container-3-device">
              <div className="chart-info-wrapper">
                <h2>Sustainability</h2>
                <span>{device_sustainability}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="radar_chart">
            <ReactApexChart options={radar_data.options} series={radar_data.series} type="radar" height={350} />
        </div>
          <div className="vulnerabilityBubble">
            <BubbleChart
              graph={{
                zoom: 1,
                offsetX: 0.0,
                offsetY: 0.0
              }}
              width={570}
              height={570}
              padding={0}
              showLegend={false}
              valueFont={{
                family: 'Arial',
                size: 12,
                color: '#fff',
                weight: 'bold'
              }}
              labelFont={{
                family: 'Arial',
                size: 16,
                color: '#fff',
                weight: 'bold'
              }}
              data={data_array}
            /></div>
              <div class="rounded-lg  bg-zinc-800 shadow  vuln_info overflow-y-scroll overflow-x-hidden h-96 scrollbar">
              <br></br>
              <div className='content'>
              <div >
                    <p class="text-white-900 font-semibold"> ID: {vulnerability.id} </p>
              </div>
              <div>
                    <p class="text-white-600 font-semibold"> CVSS Version:</p> 
                    <p> {vulnerability.version} </p>
              </div>
              <div>
                    <p class="text-white-600 font-semibold"> Vector:</p> 
                    <p> {vulnerability.vector} </p>
              </div>
              <div>
                    <p class="text-white-600 font-semibold"> Description:</p> 
                    <p> {vulnerability.description} </p>
              </div>
              <div>
                    <p class="text-white-600 font-semibold"> Severity:</p> 
                    <p> {vulnerability.baseSeverity} </p>
              </div>              
              <div>
                    <p class="text-white-600 font-semibold"> Base Score:</p> 
                    <p> {vulnerability.cvss} </p>
              </div>              
              <div>
                    <p class="text-white-600 font-semibold"> Explotability Score:</p> 
                    <p> {vulnerability.explotability} </p>
              </div>
              <div>
                    <p class="text-white-600 font-semibold"> Impact Score:</p> 
                    <p> {vulnerability.impact} </p>
              </div>
              <div>
                    <p class="text-white-600 font-semibold"> CWE:</p> 
                    <p> {vulnerability.cwe} </p>
              </div>
              </div>
            </div>

           <div class="vuln_table overflow-y-scroll overflow-x-hidden h-96 scrollbar>">
            {vulnerabilities_names.map(name =>  
              <div>
                <div class="flex flex-col gap-4">
                  
                  <a class="rounded-lg  grid grid-cols-12 bg-zinc-800 shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform" href={"/dashboard/"+params.id+"/"+name}>
                    
          

                    <div class="col-span-11">
                      <p class="text-white-600 font-semibold">  {name} </p>
                    </div>

                    <div class="col-span-2 md:col-span-1">
                      <div class="w-20 h-7 rounded-lg items-center bg-gray-300 text_cvss"> CVSS:  {vulnerabilities_cvss_vuln[name]}</div>
                    </div>

                    <div class="md:col-start-2 col-span-11 xl:-ml-5">
                      <p class="text-sm text-white-800 font-light"> {vulnerabilities_descriptions[name]} </p>
                    </div>
                  </a>
                      
                </div> 
                <br></br>
              </div>
              )}
              
            </div>

            </>
            )
      }