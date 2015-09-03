import {ctnCode} from '../../../data/countryCode.js'

/**
 * get all the countris in one cat for the map
 * @param  {array} arr     the output of the cntsInOneCatForLine
 * @param  {number} index  current index of year
 * @return {object}         as below
 */
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
export function cntsInOneCatForMapEachYear(arr, index){
  let output = {data:[]}

  arr.forEach((d, i)=>{
    if(ctnCode[d['name']]!== undefined && d['data'][index] > 0){
      output.data.push({
        name: d['name'],
        code: ctnCode[d['name']],
        value: d['data'][index]
      })
    }
  })

  //console.dir(output)
  return output
}