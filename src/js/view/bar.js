import {getEachYear, getEachYearJustY} from '../dataModel/getEachYear.js'

export function registerBar(){
}

export function bar(arr1, arr2){
  let index = $("#yearBar").val() - 1999
  // Create the chart
  let chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'main',
      height: window.innerHeight - 320
    },
    title: {
      text: null
    },
    subtitle: {
      text: 'Click the columns to view versions'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      max: arr1[0].data[0].y[arr1[0].data[0].y.length-1],
      title: {
        text: 'Million $'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    legend: {
      //enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%'//,
          //inside: true
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
      pointFormat: '<b>{point.percentage:.1f}%</b> of total<br/>'
    },
    series: getEachYear(arr1, index),
    drilldown: {
          series: [{
              name: "Microsoft Internet Explorer",
              id: "Microsoft Internet Explorer",
              data: [
                  [
                      "v11.0",
                      24.13
                  ],
                  [
                      "v8.0",
                      17.2
                  ],
                  [
                      "v9.0",
                      8.11
                  ],
                  [
                      "v10.0",
                      5.33
                  ],
                  [
                      "v6.0",
                      1.06
                  ],
                  [
                      "v7.0",
                      0.5
                  ]
              ]
          }, {
              name: "Chrome",
              id: "Chrome",
              data: [
                  [
                      "v40.0",
                      5
                  ],
                  [
                      "v41.0",
                      4.32
                  ],
                  [
                      "v42.0",
                      3.68
                  ],
                  [
                      "v39.0",
                      2.96
                  ],
                  [
                      "v36.0",
                      2.53
                  ],
                  [
                      "v43.0",
                      1.45
                  ],
                  [
                      "v31.0",
                      1.24
                  ],
                  [
                      "v35.0",
                      0.85
                  ],
                  [
                      "v38.0",
                      0.6
                  ],
                  [
                      "v32.0",
                      0.55
                  ],
                  [
                      "v37.0",
                      0.38
                  ],
                  [
                      "v33.0",
                      0.19
                  ],
                  [
                      "v34.0",
                      0.14
                  ],
                  [
                      "v30.0",
                      0.14
                  ]
              ]
          }, {
              name: "Firefox",
              id: "Firefox",
              data: [
                  [
                      "v35",
                      2.76
                  ],
                  [
                      "v36",
                      2.32
                  ],
                  [
                      "v37",
                      2.31
                  ],
                  [
                      "v34",
                      1.27
                  ],
                  [
                      "v38",
                      1.02
                  ],
                  [
                      "v31",
                      0.33
                  ],
                  [
                      "v33",
                      0.22
                  ],
                  [
                      "v32",
                      0.15
                  ]
              ]
          }, {
              name: "Safari",
              id: "Safari",
              data: [
                  [
                      "v8.0",
                      2.56
                  ],
                  [
                      "v7.1",
                      0.77
                  ],
                  [
                      "v5.1",
                      0.42
                  ],
                  [
                      "v5.0",
                      0.3
                  ],
                  [
                      "v6.1",
                      0.29
                  ],
                  [
                      "v7.0",
                      0.26
                  ],
                  [
                      "v6.2",
                      0.17
                  ]
              ]
          }, {
              name: "Opera",
              id: "Opera",
              data: [
                  [
                      "v12.x",
                      0.34
                  ],
                  [
                      "v28",
                      0.24
                  ],
                  [
                      "v27",
                      0.17
                  ],
                  [
                      "v29",
                      0.16
                  ]
              ]
          }]
      }
  })

  $("#yearBar").change((e)=>{
    index = e.target.value - 1999
    chart.series[0].setData(getEachYearJustY(arr1, index))
  })

}


