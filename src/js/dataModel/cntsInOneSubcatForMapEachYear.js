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

/**
 * get all the countris in one subcat for the map
 * @param  {array} arr     the output of the cntsInOneSubcatForPie
 * @param  {number} index  current index of year
 * @return {object}         as above
 */
export function cntsInOneSubcatForMapEachYear(arr, index){
  let output = {data:[]}

  arr[0].data.forEach((d, i)=>{
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