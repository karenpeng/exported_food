import React from 'react'
import {getCountryEachYear, getCountryEachYearJustY} from '../dataModel/getCountryEachYear.js'
import {getDrilldownEachYear, getDrilldownEachYearJustY} from '../dataModel/getDrilldownEachYear.js'

let chart, curCountry, curCountryYear, curSubCatYear
let arr1, arr2

export let Bar = React.createClass({
  PropTypes:{
    arr1: React.PropTypes.array.isRequired,
    arr2: React.PropTypes.array.isRequired,
    max1: React.PropTypes.number.isRequired,
    max2: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    handleDrilldown: React.PropTypes.func.isRequired,
    handleDrillup: React.PropTypes.func.isRequired
  },
  render(){

    let that = this

    arr1 = this.props.arr1
    arr2 = this.props.arr2

    curCountryYear = this.props.index
    let preCountryYear = this.props.index
    
    curSubCatYear = this.props.index
    let preSubCatYear = this.props.index

    chart = new Highcharts.Chart({
      chart: {
        type: 'column',
        renderTo: 'left2',
        width: window.innerWidth * 0.6 - 20,
        height: window.innerHeight - 320,
        events:{
          drilldown(e){
            curCountry = e.point.name
            chart.setTitle({
              text: e.point.name
            })
            chart.yAxis[0].update({
              max: that.props.max2
            })
            
            if(curCountryYear !== preCountryYear){
              setTimeout(function(){
                updateBar(curCountryYear)
              },100)
              preCountryYear = curCountryYear
            }

            that.props.handleDrilldown(e.point.name)

          },
          drillup(e) {
            chart.setTitle({ text: 'Countries' })
            chart.yAxis[0].update({
              max: that.props.max1
            })

            if(curSubCatYear !== preSubCatYear){
              setTimeout(function(){
                updateBar(curSubCatYear)
              },100)
              preSubCatYear = curSubCatYear
            }

            that.props.handleDrillup()
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
        max: this.props.arr1[0].data[0].y[this.props.arr1[0].data[0].y.length-1],
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
      series: getCountryEachYear(this.props.arr1, this.props.index),
      drilldown: {
        series: getDrilldownEachYear(this.props.arr2, this.props.index)
      }
    })

    return null
  }
})

export function updateBar(index){
  if(chart.title.textStr === 'Countries'){
    curCountryYear = index
    chart.series[0].setData(getCountryEachYearJustY(arr1, index))
  }else{
    curSubCatYear = index
    chart.series[0].setData(getDrilldownEachYearJustY(arr2, curCountry, index))
  }
}


