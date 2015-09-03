import {ctnCode} from '../../../data/countryCode.js'

/*

 {data:
  [
    {
      "code": "AF",
      "y": 53,
      "name": "Afghanistan"
    },
    {
      "code": "AL",
      "y": 117,
      "name": "Albania"
    },
    ...
  ]
}
*/

export function cntsInOneCatForMap(arr, index){
  let output = {data:[]}

  arr[0].data.forEach((d, i)=>{
    if(ctnCode[d['name']]!== undefined && d.y[index] > 0){
      output.data.push({
        name: d['name'],
        code: ctnCode[d['name']],
        value: d.y[index]
      })
    }
  })

  //console.dir(output)
  return output
}