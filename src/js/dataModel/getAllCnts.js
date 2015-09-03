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

export function getAllCnts(obj){
  let output = []

  let hash = {}
  for(let key in obj){
    obj[key].forEach((d, i)=>{
      if(i > 0){
        let subCat = Object.keys(d)[0]
        d[subCat].forEach((dd, ii)=>{
          if(ii > 0){
            //console.dir(dd)
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

  }

  for(let key in hash){
    output.push({
      name: key,
      data: hash[key]
    })
  }

  output.sort((a, b)=>{
    return b.data.reduce((b1, b2)=>{return b1 + b2}) 
    - a.data.reduce((a1, a2)=>{return a1 + a2}) 
  })

  output = output.slice(0, 20)

  //console.dir(output)
  return output
}