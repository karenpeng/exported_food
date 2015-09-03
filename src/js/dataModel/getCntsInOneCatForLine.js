/*
[
  {
    name: "Canada",
    data: [56.33, 65, 25, ...]
  }, 
  {
    name: "Mexico",
    data: [24.03, 23, 3...]
  }, 
  ...
]

 */
/**
 * [getCatForBar description]
 * @param  {array} obj     for instance, data["Animals"]
 * @return {array}         array in above format 
 */
export function getCntsInOneCatForLine(obj){
  
  let output = []

  let hash = {}

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
          })
        }
      })
    }
  })


  for(let key in hash){
    output.push({
      name: key,
      data: hash[key]
    })
  }
  
  output.sort((a, b) =>{
    return b.data.reduce((b1, b2)=>{return b1 + b2}) 
    - a.data.reduce((a1, a2)=>{return a1 + a2}) 
  })

  output = output.slice(0, 10)
  //console.dir(output)
  return output
}


