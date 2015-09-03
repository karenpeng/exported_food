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
 * get all countries in one cat for subline
 * @param  {object} obj       for instance, data["Animals"]
 * @return {array}            array in above format 
 */
export function cntsInOneCatForLine(obj){
  
  let output = []

  let hash = {}

  for(let subCat in obj){
    if(subCat !== 'total'){
      let ctns = Object.keys(obj[subCat])
      ctns.forEach((c) => {
        if(hash[c] === undefined) hash[c] = []
        obj[subCat][c].forEach((val, index) => {
          if(hash[c][index] === undefined) hash[c][index] = 0
          hash[c][index] += val
        })
      })
    }
  }

  for(let key in hash){

    let arr = []
    hash[key].forEach((d)=>{
      arr.push(parseFloat(d.toFixed(1)))
    })

    output.push({
      name: key,
      data: arr
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