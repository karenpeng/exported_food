import {getCountryEachYear, getCountryEachYearJustY} from '../dataModel/getCountryEachYear.js'
import {getDrilldownEachYear, getDrilldownEachYearJustY} from '../dataModel/getDrilldownEachYear.js'

let chart, curCountry, curCountryYear, curSubCatYear
let arr1, arr2

export function bar(_arr1, _arr2, index){
  // Create the chart
  arr1 = _arr1
  arr2 = _arr2

  curCountryYear = index
  let preCountryYear = index
  
  curSubCatYear = index
  let preSubCatYear = index

  chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'left',
      width: window.innerWidth * 0.6 - 20,
      height: window.innerHeight - 320,
      events:{
        drilldown: function(e){
          curCountry = e.point.name
          chart.setTitle({
            text: e.point.name
          })
          chart.yAxis[0].update({
            max: arr2[0].data[0][1][arr2[0].data[0][1].length-1]
          })
          
          if(curCountryYear !== preCountryYear){
            setTimeout(function(){
                updateBar(curCountryYear)
              },100)
            preCountryYear = curCountryYear
          }

        },
        drillup: function(e) {
          chart.setTitle({ text: 'Countries' })
          chart.yAxis[0].update({
            max: arr1[0].data[0].y[arr1[0].data[0].y.length-1]
          })

          if(curSubCatYear !== preSubCatYear){
            setTimeout(function(){
              updateBar(curSubCatYear)
            },100)
            preSubCatYear = curSubCatYear
          }

        }
      }
    },
    title: {
      text: 'Countries'
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
      enabled: false
    },
    series: getCountryEachYear(arr1, index),
    drilldown: {
      series: getDrilldownEachYear(arr2, index)
    }
  })
}

export function updateBar(index){
  if(chart.title.textStr === 'Countries'){
    curCountryYear = index
    chart.series[0].setData(getCountryEachYearJustY(arr1, index))
  }else{
    curSubCatYear = index
    chart.series[0].setData(getDrilldownEachYearJustY(arr2, curCountry, index))
  }
}


