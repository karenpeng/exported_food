/*
[
 {
  name: 'Animals',
  data:[1, 2, 3...]
 }
 ]
 */
export function getCatForLine(totals, cat){
  let output = []
  totals.forEach( (obj) =>{
    if(obj['name'] === cat) {
      output.push(obj)
      return
    }
  })
  return output
}

/*
[{
  name: "Country",
  colorByPoint: true,
  data: [{
    name: "Canada",
    y: 56.33,
    presentage: 71.2,
    drilldown: "Canada"
  }, {
    name: "Mexico",
    y: 24.03,
    presentage: 10.1,
    drilldown: "Mexico"
  }, 
  ...
  ]
}]
 */
/**
 * [getCatForBar description]
 * @param  {array} obj     for instance, data["Animals"]
 * @param  {number} index  represent which year
 * @return {array}         array in above format 
 */
export function getCatForBar(obj, index){
  let output = []
  output.push({
    name: "Country",
    colorByPoint: true,
    data: []
  })

  let hash = {}
  let total = obj[0]['total'][index]
  console.log('tttotal', total)

  obj.forEach((d, i) =>{
    if(i > 0){
      let subCategory= d[Object.keys(d)[0]]
      subCategory.forEach((dd, ii) =>{
        if(ii > 0){
          let country = Object.keys(dd)[0]
          if(hash[country] === undefined) hash[country] = 0
          hash[country] += dd[country][index]
        }
      })
    }
  })

  let arr = []
  for(let key in hash){
    arr.push({
      name: key,
      y: hash[key],
      percentage: hash[key] / total * 100,
      drilldown: key
    })
  }
  arr.sort((a, b) =>{
    return a.y - b.y < 0
  })

  output[0].data = arr
  console.dir(output)
  return output
}


