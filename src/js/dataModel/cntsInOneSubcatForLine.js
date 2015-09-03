/**
 * get all countries in one subcat for subline
 * @param  {object} obj     a subcat, like data['Animals']['sheep']
 * @return {arr}            as below
 */
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
export function cntsInOneSubcatForLine(obj){

  let output = []

  for(let cnt in obj){
    output.push({
      name: cnt,
      data: obj[cnt]
    })
  }

  output.sort((a, b) =>{
    return b.data.reduce((b1, b2)=>{return b1 + b2}) 
    - a.data.reduce((a1, a2)=>{return a1 + a2}) 
  })
  //console.dir(output)
  return output
}