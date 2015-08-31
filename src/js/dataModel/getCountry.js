/*
[{
  name: "Country",
  colorByPoint: true,
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
 */
/**
 * [getCatForBar description]
 * @param  {array} obj     for instance, data["Animals"]
 * @return {array}         array in above format 
 */
export function getCountryForBar(obj){
  let output = []
  output.push({
    name: "Country",
    colorByPoint: true,
    data: []
  })

  let hash = {}
  let total = obj[0]['total']

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
          })
        }
      })
    }
  })

  function getPercentage(arr, total){
    var _arr = []
    arr.forEach((d, i)=>{
      _arr.push(d/total[i]*100)
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
    return a.y[a.y.lenght-1] - b.y[b.y.length-1] < 0
  })

  output[0].data = arr
  //console.dir(output)
  return output
}


