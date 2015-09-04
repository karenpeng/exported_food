/**
 * [allCntsName description]
 * @param  {array}   arr   the output of allCnts function
 * @return {array}         an array holding all the countries name
 */
export function allCntsName(arr){
  let output = []
  arr.forEach((d)=>{
    if(d.name !== 'Rest of the world') output.push(d.name)
  })
  output.unshift('All')
  return output
}