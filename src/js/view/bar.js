import {getCountryEachYear, getCountryEachYearJustY} from '../dataModel/getCountryEachYear.js'
import {getDrilldownEachYear, getDrilldownEachYearJustY} from '../dataModel/getDrilldownEachYear.js'

let chart

export function bar(arr1, arr2, index){
  // Create the chart
  chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'left',
      width: window.innerWidth * 0.6 - 20,
      height: window.innerHeight - 320,
      events:{
        drilldown:function(e){
          chart.setTitle({
            text: e.point.name
          })
        },
        drillup: function(e) {
          chart.setTitle({ text: 'countries' });
        }
      }
    },
    title: {
      text: 'countries'
    },
    subtitle: {
      text: 'Click the columns to view detail'
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
    series: getCountryEachYear(arr1, index),
    drilldown: {
      series: getDrilldownEachYear(arr2, index)
    }
  })
}

export function updateBar(arr1, arr2, index){
  //if()
  chart.series[0].setData(getCountryEachYearJustY(arr1, index))
  //else
}


