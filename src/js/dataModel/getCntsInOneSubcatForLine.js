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

export function getCntsInOneSubcatForLine(arr, subCat){

  let output = []

  arr.forEach((d, i)=>{
    if(i > 0){
      let key = Object.keys(d)[0]
      if(key === subCat){
        d[key].forEach((dd, ii)=>{
          if(ii > 0){
            let country = Object.keys(dd)[0]
            output.push({
              name: country,
              data: dd[country]
            })
          }
        })
      }
    }
  })
  //console.dir(output)
  return output
}