import {catsInOneCntForBarEachYear, catsInOneCntForBarEachYearJustY} from '../dataModel/catsInOneCntForBarEachYear.js'
import {subcatsInOneCntEachYear, subcatsInOneCntEachYearJustY} from '../dataModel/subcatsInOneCntEachYear.js'

let chart, curCat, curCatYear, curSubCatYear
let arr1, arr2

export function makeBar(_arr1, _arr2, index){
  // Create the chart
  arr1 = _arr1
  arr2 = _arr2

  curCatYear = index
  let preCatYear = index
  
  curSubCatYear = index
  let preSubCatYear = index

  chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'left',
      width: window.innerWidth - 40,
      height: window.innerHeight - 420,
      events:{
        drilldown(e){
          curCat = e.point.name
          chart.setTitle({
            text: e.point.name
          })
          // chart.yAxis[0].update({
          //   max: undefined
          // })
          
          if(curCatYear !== preCatYear){
            setTimeout(function(){
                updateBar(curCatYear)
              },100)
            preCatYear = curCatYear
          }

        },
        drillup(e) {
          chart.setTitle({ text: 'Categories' })
          // chart.yAxis[0].update({
          //   max: arr1[0].max
          // })

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
      text: 'Categories'
    },
    subtitle: {
      text: 'Click the columns to view detail'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      max: arr1[0].max,
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
    plotOptions: {
      series: {
        borderWidth: 0,
        colorByPoint: true,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}'//,
          //inside: true
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="color:{point.color}">{point.key}</span><br/>',
      pointFormat: '<b>{point.y:.1f} Million$</b><br/>'
    },
    series: catsInOneCntForBarEachYear(arr1, index),
    drilldown: {
      series: subcatsInOneCntEachYear(arr2, index)
    }
  })
}

export function updateBar(index){
  if(chart.title.textStr === 'categories'){
    curCatYear = index
    chart.series[0].setData(catsInOneCntForBarEachYearJustY(arr1, index))
  }else{
    curSubCatYear = index
    chart.series[0].setData(subcatsInOneCntEachYearJustY(arr2, curCat, index))
  }
}

