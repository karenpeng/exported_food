/*
['Canada', 'Mexico', ...]
 */

/**
 * [allCntsName description]
 * @param  {arry}   arr   the output of allCnts function
 * @return {array}        an array holding all the countries name
 */
export function allCntsName(arr){
  let output = []
  arr.forEach((d)=>{
    output.push(d.name)
  })
  return output
}