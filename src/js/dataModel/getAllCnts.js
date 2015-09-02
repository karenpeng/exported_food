/*
[
  {
    name: 'Canada',
    data: [12, 23, 23, ...]
  },
  {
    name: 'Canada',
    data: [12, 23, 23, ...]
  },
]
*/

export function getAllCnts(obj){
  let output = []

  let hash = {}
  for(let key in obj){
    for(let subkey in obj[key]){
      if(subkey !== "total"){
        obj[key][subkey].forEach((d, i)=>{
          if(i > 0){
            let cntName = Object.keys(d)[0]
            if(hash[cntName] === undefined)) hash[ctnName] = []
            hash[ctnName][i] += d[cntName][i]
          }
        })
      }
    }
  }

  for(let key in hash){
    output.push({
      name: key,
      data: hash[key]
    })
  }

  console.dir(output)
  return output
}