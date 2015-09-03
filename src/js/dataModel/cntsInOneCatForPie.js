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
/**
 * get all countries in one cat for pie
 * @param  {array} arr     the output from cntsInOneCatForLine function
 * @return {array}         array in above format 
 */
export function cntsInOneCatForPie(arr){
  
  let output = []
  
  output.push({
    name: "Country",
    //colorByPoint: true,
    data: []
  })

  arr.forEach((obj)=>{
    output[0].data.push({
      name: obj['name'],
      y: obj['data']
    })
  })

  return output
}