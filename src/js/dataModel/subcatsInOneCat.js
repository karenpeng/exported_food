/**
 * subcatsInOneCat description
 * @param  {object} obj 
 * @return {array}     
 */
export function subcatsInOneCat(obj){

  let output = Object.keys(obj)
  output.unshift('All')
  //console.dir(output)
  return output
}