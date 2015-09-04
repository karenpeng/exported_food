/**
 * for drilldown each year
 * @param  {array}   arr     output of subcatsInOneCnt function
 * @param  {number}  index   which year
 * @return {array}           as below
 */
/*
[
  {
    name: "Cocoa",
    id: "Cocoa",
    colorByPoint: true,
    data: [
      [
        "Cocoa beans",
        123
      ],
      [
        "Chocolates",
        123
      ],
    ]
  },
  {
    name: "Fish",
    id: "Fish",
    data: [
      [
        "Catfish",
        123
      ],
      [
        "Dogfish",
        123
      ],
    ]
  }
]
*/
export function subcatsInOneCntEachYear(arr, index){
  let output = []


  arr.forEach((d, i)=>{

    output[i] = {
      name: d['name'],
      id: d['id'],
      colorByPoint: d['colorByPoint'],
      data: []
    }

    let _arr = []

    d['data'].forEach((dd, ii)=>{
      output[i]['data'][ii] = [
        dd[0], dd[1][index]
      ]
    })

  })
  //console.dir(output)
  return output
}

/*
[["Coca beans", 12], ["Chocolates", 45],...]
 */
/**
 * [subCatsInOneCntEachYearJustY description]
 * @param  {array}   arr     output of subcatsInOneCnt function
 * @param  {string}  cat     current category
 * @param  {number}  index   which year
 * @return {array}           as below
 */
export function subcatsInOneCntEachYearJustY(arr, cat, index){
  let output = []
  arr.forEach((d)=>{
    if(d['name'] === cat){
      d['data'].forEach((dd, ii)=>{
        output[ii] = [
          dd[0], dd[1][index]
        ]
      })
    }
  })
  return output
}








