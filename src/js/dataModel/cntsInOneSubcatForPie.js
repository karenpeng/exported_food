/*
[{
  name: "Country",
  //colorByPoint: true,
  data: [{
    name: "Canada",
    y: [56.33, 65, 25, ...]
  }, {
    name: "Mexico",
    y: [24.03, 23, 3...]
  }, 
  ...
  ]
}]
 */
export function cntsInOneSubcatForPie(obj, subCat){
  let output = []
    output.push({
    name: "Country",
    //colorByPoint: true,
    data: []
  })

  obj.forEach((d, i)=>{
    if(i > 0){
      let key = Object.keys(d)[0]
      if(key === subCat){
        d[key].forEach((dd, ii)=>{
          if(ii > 0){
            let country = Object.keys(dd)[0]
            output[0].data.push({
              name: country,
              y: dd[country]
            })
          }
        })
      }
    }
  })

  output[0].data.sort((a, b) =>{
    return b.y.reduce((b1, b2)=>{return b1 + b2}) 
    - a.y.reduce((a1, a2)=>{return a1 + a2}) 
  })

  //console.dir(output)
  return output
}