/**
 * [catsInOneCntForLine description]
 * @param  {object} obj   the whole data
 * @param  {string} names country name
 * @return {[type]}       [description]
 */
/*
[
  {
    name: "Animals",
    data: [56.33, 65, 25, ...]
  }, 
  {
    name: "Dairy",
    data: [56.33, 65, 25, ...]
  },
]
*/
export function catsInOneCntForLine(obj, name){
  let output = []

  let hash = {}

  for(let cat in obj){
    for(let subCat in obj[cat]){
      
      if(obj[cat][subCat][name] !== undefined){
 
        if(hash[cat] === undefined) hash[cat] = []
        obj[cat][subCat][cnt].forEach((d, i)=>{
          if(hash[cat][i] === undefined) hash[cat][i] = 0
          hash[cat][i] += d
        }) 

      }
      
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

  return output

}