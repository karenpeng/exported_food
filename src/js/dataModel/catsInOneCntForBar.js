/**
 * get all cats in one country for pie
 * @param  {array} arr     the output from cntsInOneCatForLine function
 * @return {array}         array in above format 
 */
/*
[{
  name: "Category",
  //colorByPoint: true,
  data: [{
    name: "Animals",
    y: [56.33, 65, 25, ...]
  }, {
    name: "Coffee",
    y: [24.03, 23, 3...]
  }, 
  ...
  ]
}]
 */
export function catsInOneCntForBar(arr){
  
  let output = []
  
  output.push({
    name: "Category",
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