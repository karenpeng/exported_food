/**
 * get all the countries in all cats, for the init page
 * @param  {obj}    obj  the whole data
 * @return {array}       as below 
 */
/*
[
  {
    name: 'Canada',
    data: [12, 23, 23, ...]
  },
  {
    name: 'Mexico',
    data: [12, 23, 23, ...]
  },
]
*/
export function allCnts(obj){
  let output = []

  let hash = {}
  for(let cat in obj){
    for(let subCat in obj[cat]){
      if(subCat !== 'total'){
        let ctns = Object.keys(obj[cat][subCat])
        ctns.forEach((c) => {
          if(hash[c] === undefined) hash[c] = []
          obj[cat][subCat][c].forEach((val, index) => {
            if(hash[c][index] === undefined) hash[c][index] = 0
            hash[c][index] += val
          })
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

  output.sort((a, b)=>{
    return b.data.reduce((b1, b2)=>{return b1 + b2}) 
    - a.data.reduce((a1, a2)=>{return a1 + a2}) 
  })

  output = output.slice(0, 30)

  //console.dir(output)
  return output
}