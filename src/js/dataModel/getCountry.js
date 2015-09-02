/*
{
  max: 120,
  data:
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
      y: [56.33, 65, 25, ...]
      presentage: [71.2, 36, 34...]
      drilldown: "Canada"
    }, {
      name: "Mexico",
      y: [24.03, 23, 3...]
      presentage: [10.1, 34, 22...]
      drilldown: "Mexico"
    }, 
    ...
    ]
  }]
}
 */
/**
 * [getCatForBar description]
 * @param  {array} obj     for instance, data["Animals"]
 * @return {array}         array in above format 
 */
export function getCountry(obj){
  let output = {
    max: 0,
    data: []
  }
  output.data.push({
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
    data: []
  })

  let hash = {}
  let total = obj[0]['total']
  let max = 0

  obj.forEach((d, i) =>{
    if(i > 0){
      let subCategory= d[Object.keys(d)[0]]
      subCategory.forEach((dd, ii) =>{
        if(ii > 0){
          let country = Object.keys(dd)[0]
          if(hash[country] === undefined) hash[country] = []
          dd[country].forEach((c, iii) =>{
            if(hash[country][iii] === undefined) hash[country][iii] = 0
            hash[country][iii] += dd[country][iii]
            hash[country][iii] = parseFloat(hash[country][iii].toFixed(1))
            max = Math.max(max, hash[country][iii])
          })
        }
      })
    }
  })

  function getPercentage(arr, total){
    var _arr = []
    arr.forEach((d, i)=>{
      _arr.push(parseFloat((d/total[i]*100).toFixed(1)))
    })
    return _arr
  }

  let arr = []
  for(let key in hash){
    arr.push({
      name: key,
      y: hash[key],
      percentage: getPercentage(hash[key], total),
      drilldown: key
    })
  }
  
  arr.sort((a, b) =>{
    return b.y[b.y.length-1] - a.y[a.y.length-1] 
  })
  
  output.data[0].data = arr
  output.max = max
  //console.dir(output)
  return output
}


