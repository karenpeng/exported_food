/**
 * subcatsInOneCat description
 * @param  {object} obj 
 * @return {array}     
 */
export function subcatsInOneCat(obj){

  let output = Object.keys(obj)
  output[0] = 'All'
  //console.dir(output)
  return output
}