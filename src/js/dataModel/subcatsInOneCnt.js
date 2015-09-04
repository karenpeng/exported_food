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
      data: []
    }

    for(let subCat in obj[d['name']]){
      if(subCat === 'total') continue
      let cnts = Object.keys(obj[d['name']][subCat])

      cnts.forEach((c)=>{
        if(c === name){
          myObj['data'].push([
            subCat,
            obj[d['name']][subCat][c]
          ])
        }
      })
    }
    output.push(myObj)
  })

  console.dir(output)
  return output
}









