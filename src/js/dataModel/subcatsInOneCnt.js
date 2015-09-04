/**
 * for drilldown
 * @param  {object} obj  the whole data
 * @param  {array}  arr  output from catsInOneCntForLine function
 * @param  {string} name country name
 * @return {array}       as below
 */
/*
[
  {
    name: "Cocoa",
    id: "Cocoa",
    max: 100,
    data: [
      [
        "Cocoa beans",
        [123, 12, 12,...]
      ],
      [
        "Chocolates",
        [123, 12, 12,...]
      ],
    ]
  },
  {
    name: "Fish",
    id: "Fish",
    max: 34,
    data: [
      [
        "Catfish",
        [123, 12, 12,...]
      ],
      [
        "Dogfish",
        [123, 12, 12,...]
      ],
    ]
  }
]
*/
export function subcatsInOneCnt(obj, arr, name){
  let output = []

  arr.forEach((d)=>{
    
    let myObj = {
      name: d['name'],
      id: d['name'],
      max: 0,
      data: []
    }

    let max = 0
    for(let subCat in obj[d['name']]){
      if(subCat === 'total') continue
      let cnts = Object.keys(obj[d['name']][subCat])

      cnts.forEach((c)=>{
        if(c === name){
         
          obj[d['name']][subCat][c].forEach((dd)=>{
            max = Math.max(max, dd)
          })

          myObj['data'].push([
            subCat,
            obj[d['name']][subCat][c]
          ])

          myObj['data'].sort((a,b)=>{
            return b[1].reduce((b1, b2)=>{return b1 + b2}) 
              - a[1].reduce((a1, a2)=>{return a1 + a2}) 
          })
        }
      })
    }
    myObj.max = max
    output.push(myObj)
  })

  //console.dir(output)
  return output
}









