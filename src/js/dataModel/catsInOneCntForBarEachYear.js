/**
 * @param  {array} arr     result from catsInOneCntForBar.js
 * @param  {number} index  which year
 * @return {array}         as below
 */
/*
[{
  name: "Category",
  //colorByPoint: true,
  data: [{
    name: "Animals",
    y: 56.33,
    drilldown: "Animals"

  }, {
    name: "Coffee",
    y: 24.03,
    drilldown: "Coffee"
  }, 
  ...
  ]
}]
 */
export function catsInOneCntForBarEachYear(arr, index){

  let output = []
  output.push({
    name: arr[0].name,
    max: arr[0].max,
    data:[]
  })

  arr[0].data.forEach((d, i)=>{
    output[0].data[i] = {
      name: d.name,
      y: d.y[index],
      drilldown: d.name
    }
  })
  //console.dir(output)
  return output
}

/**
 * cntsInOneCatForPieEachYearJustY 
 * @param  {array} arr     result from catsInOneCntForBar.js
 * @param  {number} index  which year
 * @return {array}         as below
 */
/*
[12, 23, 21,...]
 */
export function catsInOneCntForBarEachYearJustY(arr, index){

  let output = []
  arr[0].data.forEach((d)=>{
    output.push(d.y[index])
  })
  return output
}

