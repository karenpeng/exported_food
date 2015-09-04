/**
 * get all cats in one country for pie
 * @param  {array} arr     the output from cntsInOneCatForLine function
 * @return {array}         array in above format 
 */
/*
[{
  name: "Category",
  max; 122,
  colorByPoint: true,
  data: [
    {
      name: "Animals",
      y: [56.33, 65, 25, ...],
      drilldown: "Animals"
    }, 
    {
      name: "Coffee",
      y: [24.03, 23, 3...],
      drilldown: "Coffee"
    }, 
  ...
  ]
}]
 */
export function catsInOneCntForBar(arr){
  
  let output = []
  
  output.push({
    name: "Category",
    max : 0,
    colorByPoint: true,
    data: []
  })

  let max = 0
  arr.forEach((obj)=>{

    obj['data'].forEach((d)=>{
      max = Math.max(max, d)
    })

    output[0].data.push({
      name: obj['name'],
      y: obj['data'],
      drilldown: obj['name']
    })
  })

  output[0].max = max

  return output
}