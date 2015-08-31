/*
[{
  name: "Country",
  colorByPoint: true,
  tooltip:{
    headerFormat: '<span style="color:{point.color}">{point.y:.1f} Million$</span><br/>',
    pointFormat: '<b>{point.percentage:.1f}%</b> of total<br/>'
  },
  dataLabels:{
    enabled: true,
    format: '{point.percentage:.1f}%'
  },
  data: [{
    name: "Canada",
    y: 56.33
    presentage: 71.2
    drilldown: "Canada"
  }, {
    name: "Mexico",
    y: 24.03
    presentage: 10.1
    drilldown: "Mexico"
  }, 
  ...
  ]
}]
 */

/**
 * @param  {array} arr     result from getCountry.js
 * @param  {number} index  which year
 * @return {array}          filter out all the other years
 */
export function getCountryEachYear(arr, index){

  let output = []
  output.push({
    name: arr[0].name,
    colorByPoint: arr[0].colorByPoint,
    tooltip: arr[0].tooltip,
    dataLabels: arr[0].dataLabels,
    data:[]
  })

  arr[0].data.forEach((d, i)=>{
    output[0].data[i] = {
      name: d.name,
      y: d.y[index],
      percentage: d.percentage[index],
      drilldown: d.drilldown
    }
  })
  //console.dir(output)
  return output
}

/*
[
  {y: 71.2, percetage: 34},
  {y: 11.2, percetage: 23}
  ...
]
 */
export function getCountryEachYearJustY(arr, index){
  var output = []
  arr[0].data.forEach((d)=>{
    output.push({
      y: d.y[index],
      percentage: d.percentage[index]
    })
  })
  return output
}

